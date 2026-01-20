import React, { useState, useEffect } from 'react';
import { Book, Users, BookOpen, AlertTriangle, Plus, Search } from 'lucide-react';
import { DashboardStats } from '../../types';
import { dashboardAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Books',
      value: stats?.totalBooks || 0,
      icon: Book,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Members',
      value: stats?.totalMembers || 0,
      icon: Users,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Borrows',
      value: stats?.activeBorrows || 0,
      icon: BookOpen,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Overdue Books',
      value: stats?.overdueBooks || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Book',
      description: 'Add a new book to the library',
      icon: Plus,
      action: () => navigate('/books/new'),
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Register Member',
      description: 'Register a new library member',
      icon: Plus,
      action: () => navigate('/members/new'),
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Process Borrow',
      description: 'Process a new book borrowing',
      icon: BookOpen,
      action: () => navigate('/borrows/new'),
      color: 'bg-yellow-600 hover:bg-yellow-700',
    },
    {
      title: 'Search Books',
      description: 'Search and manage books',
      icon: Search,
      action: () => navigate('/books'),
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Library Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-6`}>
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-6 rounded-lg text-left transition-colors`}
            >
              <action.icon className="h-8 w-8 mb-3" />
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-gray-500 text-center py-8">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Recent activity will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;