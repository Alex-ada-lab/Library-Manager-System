import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, FileText } from 'lucide-react';
import { Borrow } from '../../types';
import { borrowsAPI, genresAPI } from '../../services/api';

const Reports: React.FC = () => {
  const [overdueBooks, setOverdueBooks] = useState<Borrow[]>([]);
  const [popularGenres, setPopularGenres] = useState<{ genre: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [overdueResponse, popularGenresResponse] = await Promise.all([
        borrowsAPI.getOverdue(),
        genresAPI.getPopular(),
      ]);
      
      setOverdueBooks(overdueResponse.data);
      setPopularGenres(popularGenresResponse.data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Library performance and statistics</p>
      </div>

      {/* Overdue Books Report */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Overdue Books</h2>
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {overdueBooks.length}
            </span>
          </div>
        </div>
        <div className="p-6">
          {overdueBooks.length > 0 ? (
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
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Overdue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {overdueBooks.map((borrow) => {
                    const daysOverdue = Math.floor(
                      (new Date().getTime() - new Date(borrow.dueDate).getTime()) / (1000 * 3600 * 24)
                    );
                    return (
                      <tr key={borrow.id}>
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
                          {new Date(borrow.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-red-600">
                            {daysOverdue} days
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No overdue books found</p>
            </div>
          )}
        </div>
      </div>

      {/* Popular Genres Report */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Popular Genres</h2>
          </div>
        </div>
        <div className="p-6">
          {popularGenres.length > 0 ? (
            <div className="space-y-4">
              {popularGenres.map((genre, index) => (
                <div key={genre.genre} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 w-8">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-gray-900 ml-4">{genre.genre}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{
                          width: `${(genre.count / Math.max(...popularGenres.map(g => g.count))) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                      {genre.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No genre statistics available</p>
            </div>
          )}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FileText className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Export Reports</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Export Overdue Books
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Export Popular Genres
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Export All Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;