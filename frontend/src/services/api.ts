import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (email: string, role: string) => api.post<{ access_token: string, user_id: string, role: string, name?: string }>('/api/auth/google', { email, role }),
    devLogin: (credentials: any) => api.post<{ access_token: string, user_id: string, role: string, name?: string }>('/api/auth/login', credentials),
    signup: (data: any) => api.post<{ access_token: string, user_id: string, role: string, name?: string }>('/api/auth/signup', data),
};

export const postService = {
    getAll: (skip = 0, limit = 20) => api.get<any[]>(`/api/posts/?skip=${skip}&limit=${limit}`),
    create: (data: any) => api.post<any>('/api/posts/', data),
};

export const profileService = {
    get: (userId: string) => api.get<any>(`/api/profiles/${userId}`),
    getProfile: (userId: string) => api.get<any>(`/api/profiles/${userId}`),
    update: (userId: string, data: any) => api.put<any>(`/api/profiles/${userId}`, data),
    uploadAvatar: (userId: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post<{ avatar_url: string }>(`/api/profiles/${userId}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export const chatService = {
    sendMessage: (message: string) => api.post<{ response: string }>('/api/chat/', { message }),
};

export default api;
