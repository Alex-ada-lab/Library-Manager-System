import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Book, Member } from '../../types';
import { borrowsAPI, booksAPI, membersAPI } from '../../services/api';

const BorrowForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: '',
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [bookSearch, setBookSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
    fetchMembers();
    
    // Set default due date to 14 days from now
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 14);
    setFormData(prev => ({
      ...prev,
      dueDate: defaultDueDate.toISOString().split('T')[0],
    }));
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [bookSearch]);

  useEffect(() => {
    fetchMembers();
  }, [memberSearch]);

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getAll(bookSearch);
      // Filter books that have available copies
      setBooks(response.data.filter(book => book.availableCopies > 0));
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll(memberSearch);
      // Filter active members only
      setMembers(response.data.filter(member => member.status === 'active'));
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.bookId || !formData.memberId || !formData.dueDate) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await borrowsAPI.create({
        bookId: parseInt(formData.bookId),
        memberId: parseInt(formData.memberId),
        dueDate: formData.dueDate,
      });
      navigate('/borrows');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to process borrowing');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectedBook = books.find(book => book.id === parseInt(formData.bookId));
  const selectedMember = members.find(member => member.id === parseInt(formData.memberId));

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/borrows')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Process Book Borrowing</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Book *
            </label>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search books by title, author, or ISBN..."
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <select
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Choose a book...</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author} (Available: {book.availableCopies})
                  </option>
                ))}
              </select>
              {selectedBook && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900">{selectedBook.title}</h4>
                  <p className="text-sm text-blue-700">
                    by {selectedBook.author} • Genre: {selectedBook.genre} • 
                    Available Copies: {selectedBook.availableCopies}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Member Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Member *
            </label>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search members by name or email..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Choose a member...</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.email})
                  </option>
                ))}
              </select>
              {selectedMember && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-900">{selectedMember.name}</h4>
                  <p className="text-sm text-green-700">
                    {selectedMember.email} • {selectedMember.phone}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/borrows')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Process Borrowing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowForm;