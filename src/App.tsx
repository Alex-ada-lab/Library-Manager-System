import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import BookList from './components/Books/BookList';
import BookForm from './components/Books/BookForm';
import MemberList from './components/Members/MemberList';
import MemberForm from './components/Members/MemberForm';
import BorrowList from './components/Borrows/BorrowList';
import BorrowForm from './components/Borrows/BorrowForm';
import GenreList from './components/Genres/GenreList';
import StaffList from './components/Staff/StaffList';
import Reports from './components/Reports/Reports';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
      />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        
        {/* Books Routes */}
        <Route path="books" element={<BookList />} />
        <Route path="books/new" element={<BookForm />} />
        <Route path="books/:id/edit" element={<BookForm />} />
        
        {/* Members Routes */}
        <Route path="members" element={<MemberList />} />
        <Route path="members/new" element={<MemberForm />} />
        <Route path="members/:id/edit" element={<MemberForm />} />
        
        {/* Borrowing Routes */}
        <Route path="borrows" element={<BorrowList />} />
        <Route path="borrows/new" element={<BorrowForm />} />
        
        {/* Genres Routes */}
        <Route path="genres" element={<GenreList />} />
        
        {/* Admin Only Routes */}
        <Route path="staff" element={
          <AdminRoute>
            <StaffList />
          </AdminRoute>
        } />
        <Route path="reports" element={
          <AdminRoute>
            <Reports />
          </AdminRoute>
        } />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;