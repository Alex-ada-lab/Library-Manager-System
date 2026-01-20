import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Book, 
  Users, 
  BookOpen, 
  Tag, 
  UserCheck, 
  BarChart3,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/books', icon: Book, label: 'Books' },
    { to: '/members', icon: Users, label: 'Members' },
    { to: '/borrows', icon: BookOpen, label: 'Borrowing' },
    { to: '/genres', icon: Tag, label: 'Genres' },
    ...(user?.role === 'admin' ? [
      { to: '/staff', icon: UserCheck, label: 'Staff' },
      { to: '/reports', icon: BarChart3, label: 'Reports' }
    ] : [])
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Library Manager</h1>
        <p className="text-gray-400 text-sm">Welcome, {user?.name}</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;