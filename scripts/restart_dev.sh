#!/bin/bash

# Applied Economics Development Server Restart Script
# This script stops any running development servers and restarts them

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to kill process on a specific port
kill_port() {
    local port=$1
    local service_name=$2
    
    print_status "Checking for processes on port $port ($service_name)..."
    
    # Find process using the port
    local pid=$(lsof -ti:$port)
    
    if [ ! -z "$pid" ]; then
        print_warning "Found process $pid on port $port. Killing it..."
        kill -9 $pid 2>/dev/null
        sleep 1
        print_success "$service_name stopped on port $port"
    else
        print_status "No process found on port $port"
    fi
}

# Function to check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install Node.js and npm first."
        exit 1
    fi
}

# Function to check if dependencies are installed
check_dependencies() {
    if [ ! -d "node_modules" ]; then
        print_warning "Node modules not found in root. Running npm install..."
        npm install
    fi
    
    if [ ! -d "backend/node_modules" ]; then
        print_warning "Backend node modules not found. They will be installed when starting..."
    fi
    
    if [ ! -d "frontend/node_modules" ]; then
        print_warning "Frontend node modules not found. They will be installed when starting..."
    fi
}

# Function to start backend
start_backend() {
    print_status "Starting Strapi backend on port 1337..."
    npm run dev:backend &
    BACKEND_PID=$!
    echo $BACKEND_PID > .backend.pid
}

# Function to start frontend
start_frontend() {
    print_status "Starting Next.js frontend on port 3000..."
    npm run dev:frontend &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > .frontend.pid
}

# Function to cleanup on exit
cleanup() {
    print_warning "\nShutting down development servers..."
    
    # Kill backend
    if [ -f .backend.pid ]; then
        kill $(cat .backend.pid) 2>/dev/null
        rm .backend.pid
    fi
    
    # Kill frontend  
    if [ -f .frontend.pid ]; then
        kill $(cat .frontend.pid) 2>/dev/null
        rm .frontend.pid
    fi
    
    # Double-check ports are free
    kill_port 1337 "Backend"
    kill_port 3000 "Frontend"
    
    print_success "All services stopped. Goodbye!"
    exit 0
}

# Main execution
main() {
    clear
    echo "============================================"
    echo "   Applied Economics Dev Server Manager    "
    echo "============================================"
    echo ""
    
    # Check we're in the right directory
    if [ ! -f "package.json" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
        print_error "This script must be run from the project root directory"
        print_error "Current directory: $(pwd)"
        exit 1
    fi
    
    print_status "Starting development environment setup..."
    echo ""
    
    # Check prerequisites
    check_npm
    check_dependencies
    
    # Kill any existing processes
    print_status "Cleaning up any existing processes..."
    kill_port 1337 "Backend (Strapi)"
    kill_port 3000 "Frontend (Next.js)"
    
    # Clean up any leftover pid files
    rm -f .backend.pid .frontend.pid
    
    echo ""
    print_status "Starting development servers..."
    echo ""
    
    # Set up trap to cleanup on exit
    trap cleanup EXIT INT TERM
    
    # Start services
    start_backend
    sleep 3  # Give backend a moment to start
    
    start_frontend
    
    echo ""
    print_success "Development servers are starting up!"
    echo ""
    echo "============================================"
    echo "  📦 Backend (Strapi):  http://localhost:1337"
    echo "  🎨 Frontend (Next.js): http://localhost:3000"
    echo "============================================"
    echo ""
    echo "  Admin Panel: http://localhost:1337/admin"
    echo ""
    print_status "Press Ctrl+C to stop all servers"
    echo ""
    
    # Keep script running and show logs
    wait
}

# Run the main function
main