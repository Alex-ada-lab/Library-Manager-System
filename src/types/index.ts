export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'librarian';
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  totalCopies: number;
  availableCopies: number;
  publishedYear: number;
  description?: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipDate: string;
  status: 'active' | 'inactive';
}

export interface Borrow {
  id: number;
  bookId: number;
  memberId: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  book?: Book;
  member?: Member;
}

export interface Genre {
  id: number;
  name: string;
  description?: string;
}

export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  activeBorrows: number;
  overdueBooks: number;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}