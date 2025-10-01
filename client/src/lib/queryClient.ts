
import { QueryClient } from "@tanstack/react-query";

// Create query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        return apiRequest(url);
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

// API request helper function
export async function apiRequest(
  url: string,
  options: RequestInit & { method?: string; body?: string } = {}
): Promise<any> {
  const { method = 'GET', body, ...restOptions } = options;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...restOptions.headers,
    },
    credentials: 'include', // Include cookies for session management
    ...restOptions,
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    config.body = body;
  }

  try {
    const response = await fetch(url, config);
    
    // Handle different response types
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } else {
          errorMessage = await response.text() || errorMessage;
        }
      } catch (e) {
        // Use default error message if parsing fails
      }
      
      throw new Error(errorMessage);
    }

    // Return appropriate data based on content type
    if (contentType?.includes('application/json')) {
      return await response.json();
    } else if (method === 'DELETE' && response.status === 204) {
      return null; // No content for successful DELETE
    } else {
      return await response.text();
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

// Helper function for mutations
export const createMutation = (url: string, method: 'POST' | 'PUT' | 'DELETE') => {
  return async (data?: any) => {
    return apiRequest(url, {
      method,
      body: data ? JSON.stringify(data) : undefined,
    });
  };
};

// Helper function for query keys
export const createQueryKey = (path: string, params?: Record<string, any>) => {
  if (!params) return [path];
  
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? [`${path}?${queryString}`] : [path];
};

// Specific API functions
export const api = {
  // Auth
  login: (credentials: { username: string; password: string }) =>
    apiRequest('/api/login', { method: 'POST', body: JSON.stringify(credentials) }),
  
  register: (userData: { username: string; password: string; name: string; email: string }) =>
    apiRequest('/api/register', { method: 'POST', body: JSON.stringify(userData) }),
  
  logout: () => apiRequest('/api/logout', { method: 'POST' }),
  
  getCurrentUser: () => apiRequest('/api/auth/user'),

  // Users
  getUsers: () => apiRequest('/api/users'),
  getUser: (id: number) => apiRequest(`/api/users/${id}`),
  createUser: (data: any) => apiRequest('/api/users', { method: 'POST', body: JSON.stringify(data) }),

  // Courses
  getCourses: () => apiRequest('/api/courses'),
  getCourse: (id: number) => apiRequest(`/api/courses/${id}`),
  createCourse: (data: any) => apiRequest('/api/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id: number, data: any) => apiRequest(`/api/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id: number) => apiRequest(`/api/courses/${id}`, { method: 'DELETE' }),

  // Projects
  getProjects: () => apiRequest('/api/projects'),
  getProject: (id: number) => apiRequest(`/api/projects/${id}`),
  createProject: (data: any) => apiRequest('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: number, data: any) => apiRequest(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id: number) => apiRequest(`/api/projects/${id}`, { method: 'DELETE' }),

  // Documents
  getDocuments: () => apiRequest('/api/documents'),
  getDocument: (id: number) => apiRequest(`/api/documents/${id}`),
  createDocument: (data: any) => apiRequest('/api/documents', { method: 'POST', body: JSON.stringify(data) }),
  updateDocument: (id: number, data: any) => apiRequest(`/api/documents/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteDocument: (id: number) => apiRequest(`/api/documents/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => apiRequest('/api/categories'),

  // Workshops
  getWorkshops: () => apiRequest('/api/workshops'),
  getWorkshop: (id: number) => apiRequest(`/api/workshops/${id}`),
  createWorkshop: (data: any) => apiRequest('/api/workshops', { method: 'POST', body: JSON.stringify(data) }),
  updateWorkshop: (id: number, data: any) => apiRequest(`/api/workshops/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteWorkshop: (id: number) => apiRequest(`/api/workshops/${id}`, { method: 'DELETE' }),

  // Webinars
  getWebinars: () => apiRequest('/api/webinars'),
  getWebinar: (id: number) => apiRequest(`/api/webinars/${id}`),
  createWebinar: (data: any) => apiRequest('/api/webinars', { method: 'POST', body: JSON.stringify(data) }),
  updateWebinar: (id: number, data: any) => apiRequest(`/api/webinars/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteWebinar: (id: number) => apiRequest(`/api/webinars/${id}`, { method: 'DELETE' }),

  // Webinar Sections
  getWebinarSections: (webinarId: number) => apiRequest(`/api/webinars/${webinarId}/sections`),
  createWebinarSection: (webinarId: number, data: any) => 
    apiRequest(`/api/webinars/${webinarId}/sections`, { method: 'POST', body: JSON.stringify(data) }),
  updateWebinarSection: (webinarId: number, sectionId: number, data: any) => 
    apiRequest(`/api/webinars/${webinarId}/sections/${sectionId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteWebinarSection: (webinarId: number, sectionId: number) => 
    apiRequest(`/api/webinars/${webinarId}/sections/${sectionId}`, { method: 'DELETE' }),

  // Slides
  getSlides: () => apiRequest('/api/slides'),
  getActiveSlides: () => apiRequest('/api/slides/active'),
  getSlide: (id: number) => apiRequest(`/api/slides/${id}`),
  createSlide: (data: any) => apiRequest('/api/slides', { method: 'POST', body: JSON.stringify(data) }),
  updateSlide: (id: number, data: any) => apiRequest(`/api/slides/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSlide: (id: number) => apiRequest(`/api/slides/${id}`, { method: 'DELETE' }),

  // Quick Access
  getQuickAccess: () => apiRequest('/api/quick-access'),
  getActiveQuickAccess: () => apiRequest('/api/quick-access/active'),
  createQuickAccess: (data: any) => apiRequest('/api/quick-access', { method: 'POST', body: JSON.stringify(data) }),
  updateQuickAccess: (id: number, data: any) => apiRequest(`/api/quick-access/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteQuickAccess: (id: number) => apiRequest(`/api/quick-access/${id}`, { method: 'DELETE' }),

  // Magazines
  getMagazines: () => apiRequest('/api/magazines'),
  getMagazine: (id: number) => apiRequest(`/api/magazines/${id}`),
  createMagazine: (data: any) => apiRequest('/api/magazines', { method: 'POST', body: JSON.stringify(data) }),
  updateMagazine: (id: number, data: any) => apiRequest(`/api/magazines/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMagazine: (id: number) => apiRequest(`/api/magazines/${id}`, { method: 'DELETE' }),

  // Articles
  getArticles: () => apiRequest('/api/articles'),
  getArticle: (id: number) => apiRequest(`/api/articles/${id}`),
  getArticlesByMagazine: (magazineId: number) => apiRequest(`/api/articles/magazine/${magazineId}`),
  createArticle: (data: any) => apiRequest('/api/articles', { method: 'POST', body: JSON.stringify(data) }),
  updateArticle: (id: number, data: any) => apiRequest(`/api/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteArticle: (id: number) => apiRequest(`/api/articles/${id}`, { method: 'DELETE' }),

  // Educational Videos
  getEducationalVideos: () => apiRequest('/api/educational-videos'),
  getActiveEducationalVideos: () => apiRequest('/api/educational-videos/active'),
  getEducationalVideo: (id: number) => apiRequest(`/api/educational-videos/${id}`),
  createEducationalVideo: (data: any) => apiRequest('/api/educational-videos', { method: 'POST', body: JSON.stringify(data) }),
  updateEducationalVideo: (id: number, data: any) => apiRequest(`/api/educational-videos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEducationalVideo: (id: number) => apiRequest(`/api/educational-videos/${id}`, { method: 'DELETE' }),

  // About Us
  getAboutUs: () => apiRequest('/api/about-us'),
  getActiveAboutUs: () => apiRequest('/api/about-us/active'),
  getAboutUsById: (id: number) => apiRequest(`/api/about-us/${id}`),
  createAboutUs: (data: any) => apiRequest('/api/about-us', { method: 'POST', body: JSON.stringify(data) }),
  updateAboutUs: (id: number, data: any) => apiRequest(`/api/about-us/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAboutUs: (id: number) => apiRequest(`/api/about-us/${id}`, { method: 'DELETE' }),

  // Contact Us
  getContactUs: () => apiRequest('/api/contact-us'),
  getActiveContactUs: () => apiRequest('/api/contact-us/active'),
  getContactUsById: (id: number) => apiRequest(`/api/contact-us/${id}`),
  createContactUs: (data: any) => apiRequest('/api/contact-us', { method: 'POST', body: JSON.stringify(data) }),
  updateContactUs: (id: number, data: any) => apiRequest(`/api/contact-us/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteContactUs: (id: number) => apiRequest(`/api/contact-us/${id}`, { method: 'DELETE' }),

  // File uploads
  uploadFiles: (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
    
    return fetch('/api/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then(response => {
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      return response.json();
    });
  },

  // User course access
  getUserCourseAccess: (userId: number) => apiRequest(`/api/users/${userId}/course-access`),
  grantCourseAccess: (userId: number, data: any) => 
    apiRequest(`/api/users/${userId}/grant-course-access`, { method: 'POST', body: JSON.stringify(data) }),
  revokeCourseAccess: (userId: number, courseId: number) => 
    apiRequest(`/api/users/${userId}/revoke-course-access/${courseId}`, { method: 'DELETE' }),
};
