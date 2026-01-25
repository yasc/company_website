/**
 * Strapi API Client
 * Centralized functions for fetching data from Strapi CMS
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  populate?: string | string[] | Record<string, unknown>;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

/**
 * Base fetch function for Strapi API
 */
async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {},
  requireAuth = true
): Promise<T> {
  const { populate, filters, sort, pagination } = options;

  const queryParams = new URLSearchParams();

  // Handle populate
  if (populate) {
    if (typeof populate === 'string') {
      queryParams.append('populate', populate);
    } else if (Array.isArray(populate)) {
      populate.forEach((p) => queryParams.append('populate', p));
    } else {
      queryParams.append('populate', JSON.stringify(populate));
    }
  }

  // Handle filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value as Record<string, unknown>).forEach(([op, val]) => {
          queryParams.append(`filters[${key}][${op}]`, String(val));
        });
      } else {
        queryParams.append(`filters[${key}]`, String(value));
      }
    });
  }

  // Handle sort
  if (sort) {
    if (Array.isArray(sort)) {
      sort.forEach((s) => queryParams.append('sort', s));
    } else {
      queryParams.append('sort', sort);
    }
  }

  // Handle pagination
  if (pagination) {
    if (pagination.page) queryParams.append('pagination[page]', String(pagination.page));
    if (pagination.pageSize) queryParams.append('pagination[pageSize]', String(pagination.pageSize));
  }

  const url = `${STRAPI_URL}/api${endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requireAuth && API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    console.error(`Strapi API Error: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }

  return response.json();
}

// ============================================
// Single Types
// ============================================

export async function getHomePage() {
  return fetchAPI('/home-page', { populate: '*' });
}

export async function getAboutPage() {
  return fetchAPI('/about-page', { populate: '*' });
}

export async function getLabPage() {
  return fetchAPI('/lab-page', { populate: '*' });
}

export async function getCareersPage() {
  return fetchAPI('/careers-page', { populate: '*' });
}

export async function getContactPage() {
  return fetchAPI('/contact-page', { populate: '*' });
}

export async function getNavigation() {
  return fetchAPI('/navigation', { populate: '*' });
}

// ============================================
// Collection Types
// ============================================

// Services
export async function getServices(options?: FetchOptions) {
  return fetchAPI('/services', { populate: '*', ...options });
}

export async function getServiceBySlug(slug: string) {
  return fetchAPI('/services', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
}

// Papers (Research)
export async function getPapers(options?: FetchOptions) {
  return fetchAPI('/papers', { populate: '*', ...options });
}

export async function getPaperBySlug(slug: string) {
  return fetchAPI('/papers', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
}

// Datasets
export async function getDatasets(options?: FetchOptions) {
  return fetchAPI('/datasets', { populate: '*', ...options });
}

export async function getDatasetBySlug(slug: string) {
  return fetchAPI('/datasets', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
}

// Insights
export async function getInsights(options?: FetchOptions) {
  return fetchAPI('/insights', { populate: '*', ...options });
}

export async function getInsightBySlug(slug: string) {
  return fetchAPI('/insights', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
}

// People
export async function getPeople(options?: FetchOptions) {
  return fetchAPI('/people', { populate: '*', ...options });
}

export async function getPersonBySlug(slug: string) {
  return fetchAPI('/people', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
}

// Jobs
export async function getJobs(options?: FetchOptions) {
  return fetchAPI('/jobs', { populate: '*', ...options });
}

export async function getJobBySlug(slug: string) {
  return fetchAPI('/jobs', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
}

// Guides
export async function getGuides(options?: FetchOptions) {
  return fetchAPI('/guides', { populate: '*', ...options });
}

export async function getGuideBySlug(slug: string) {
  return fetchAPI('/guides', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
}

// Case Studies
export async function getCaseStudies(options?: FetchOptions) {
  return fetchAPI('/case-studies', { populate: '*', ...options });
}

export async function getCaseStudyBySlug(slug: string) {
  return fetchAPI('/case-studies', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
}

// Client Types
export async function getClientTypes(options?: FetchOptions) {
  return fetchAPI('/client-types', { populate: '*', ...options });
}

// Tags
export async function getTags(options?: FetchOptions) {
  return fetchAPI('/tags', { populate: '*', ...options });
}

// ============================================
// Utility Functions
// ============================================

/**
 * Get full URL for Strapi media assets
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
