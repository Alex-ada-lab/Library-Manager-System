import axios from 'axios';
import { AuthResponse, Book, Member, Borrow, Genre, DashboardStats, User, BookCreateRequest, BookUpdateRequest } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
  
  register: (userData: { name: string; email: string; password: string; role: string }) =>
    api.post<AuthResponse>('/auth/register', userData),
};

// Books API
export const booksAPI = {
  getAll: (search?: string, genre?: string) =>
    api.get<Book[]>('/books', { params: { search, genre } }),
  
  getById: (id: number) =>
    api.get<Book>(`/books/${id}`),
  
  create: (bookData: BookCreateRequest) =>
    api.post<Book>('/books', bookData),
  
  update: (id: number, bookData: BookUpdateRequest) =>
    api.put<Book>(`/books/${id}`, bookData),
  
  delete: (id: number) =>
    api.delete(`/books/${id}`),
};

// Members API
export const membersAPI = {
  getAll: (search?: string) =>
    api.get<Member[]>('/members', { params: { search } }),
  
  getById: (id: number) =>
    api.get<Member>(`/members/${id}`),
  
  create: (memberData: Omit<Member, 'id' | 'membershipDate'>) =>
    api.post<Member>('/members', memberData),
  
  update: (id: number, memberData: Partial<Member>) =>
    api.put<Member>(`/members/${id}`, memberData),
  
  delete: (id: number) =>
    api.delete(`/members/${id}`),
  
  getBorrowHistory: (id: number) =>
    api.get<Borrow[]>(`/members/${id}/borrows`),
};

// Borrows API
export const borrowsAPI = {
  getAll: () =>
    api.get<Borrow[]>('/borrows'),
  
  create: (borrowData: { bookId: number; memberId: number; dueDate: string }) =>
    api.post<Borrow>('/borrows', borrowData),
  
  return: (id: number) =>
    api.patch<Borrow>(`/borrows/${id}/return`),
  
  getOverdue: () =>
    api.get<Borrow[]>('/borrows/overdue'),
};

// Genres API
export const genresAPI = {
  getAll: () =>
    api.get<Genre[]>('/genres'),
  
  create: (genreData: Omit<Genre, 'id'>) =>
    api.post<Genre>('/genres', genreData),
  
  update: (id: number, genreData: Partial<Genre>) =>
    api.put<Genre>(`/genres/${id}`, genreData),
  
  delete: (id: number) =>
    api.delete(`/genres/${id}`),
  
  getPopular: () =>
    api.get<{ genre: string; count: number }[]>('/genres/popular'),
};

// Staff API
export const staffAPI = {
  getAll: () =>
    api.get<User[]>('/staff'),
  
  create: (staffData: { name: string; email: string; password: string; role: string }) =>
    api.post<User>('/staff', staffData),
  
  delete: (id: number) =>
    api.delete(`/staff/${id}`),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () =>
    api.get<DashboardStats>('/dashboard/stats'),
};

export default api;