'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const HeroGraphic = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing svg
    d3.select(containerRef.current).selectAll('*').remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('overflow', 'hidden');

    // Generate random nodes
    const nodeCount = 60;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1, // Tiny nodes
    }));

    // Create links between nearby nodes (mesh effect)
    const links: { source: number; target: number }[] = [];
    
    // Simulation
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('charge', d3.forceManyBody().strength(-20))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(10));

    // Mouse interaction
    const mouseNode = { x: width / 2, y: height / 2, r: 0 };
    
    // Draw links (will be updated in tick)
    const linkGroup = svg.append('g').attr('class', 'links');
    
    // Draw nodes
    const nodeGroup = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => d.r)
      .attr('fill', '#4361EE') // Electric Indigo
      .attr('opacity', 0.6);

    // Dynamic link generation based on distance
    simulation.on('tick', () => {
      // Update node positions
      nodeGroup
        .attr('cx', d => (d as any).x)
        .attr('cy', d => (d as any).y);

      // Simple mesh: Connect nodes if they are close
      // This is computationally expensive O(n^2) but fine for n=60
      const currentLinks = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i] as any).x - (nodes[j] as any).x;
          const dy = (nodes[i] as any).y - (nodes[j] as any).y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            currentLinks.push({ 
              source: nodes[i], 
              target: nodes[j], 
              opacity: 1 - distance / 150 
            });
          }
        }
      }

      const linkSelection = linkGroup
        .selectAll('line')
        .data(currentLinks);

      linkSelection.enter()
        .append('line')
        .merge(linkSelection as any)
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y)
        .attr('stroke', '#4361EE')
        .attr('stroke-width', 0.5)
        .attr('opacity', d => d.opacity * 0.3);

      linkSelection.exit().remove();
    });

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const [x, y] = d3.pointer(event, svg.node());
      mouseNode.x = x;
      mouseNode.y = y;
      
      // Repel nodes from mouse
      simulation.alpha(0.3).restart();
      nodes.forEach(node => {
        const dx = (node as any).x - x;
        const dy = (node as any).y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const force = (100 - distance) / 100;
          (node as any).vx += dx * force * 0.05;
          (node as any).vy += dy * force * 0.05;
        }
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      simulation.stop();
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[400px] md:min-h-[600px] bg-transparent cursor-crosshair opacity-80"
      aria-hidden="true"
    />
  );
};
