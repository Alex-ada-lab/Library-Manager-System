import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, RotateCcw, AlertTriangle } from 'lucide-react';
import { Borrow } from '../../types';
import { borrowsAPI } from '../../services/api';

const BorrowList: React.FC = () => {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      const response = await borrowsAPI.getAll();
      setBorrows(response.data);
    } catch (error) {
      console.error('Failed to fetch borrows:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (id: number) => {
    if (window.confirm('Are you sure you want to mark this book as returned?')) {
      try {
        await borrowsAPI.return(id);
        fetchBorrows(); // Refresh the list
      } catch (error) {
        console.error('Failed to return book:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return status !== 'returned' && new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Book Borrowing</h1>
        <Link
          to="/borrows/new"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Borrow</span>
        </Link>
      </div>

      {/* Borrows Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrow Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {borrows.map((borrow) => (
                <tr key={borrow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {borrow.book?.title || 'Unknown Book'}
                      </div>
                      <div className="text-sm text-gray-500">
                        by {borrow.book?.author || 'Unknown Author'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {borrow.member?.name || 'Unknown Member'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {borrow.member?.email || ''}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">
                        {new Date(borrow.dueDate).toLocaleDateString()}
                      </span>
                      {isOverdue(borrow.dueDate, borrow.status) && (
                        <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(borrow.status)}`}>
                      {borrow.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {borrow.status === 'active' && (
                      <button
                        onClick={() => handleReturn(borrow.id)}
                        className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                      >
                        <RotateCcw size={16} />
                        <span>Return</span>
                      </button>
                    )}
                    {borrow.status === 'returned' && borrow.returnDate && (
                      <span className="text-gray-500 text-xs">
                        Returned: {new Date(borrow.returnDate).toLocaleDateString()}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {borrows.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No borrowing records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowList;