import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Book, Genre, BookCreateRequest, BookUpdateRequest } from '../../types';
import { booksAPI, genresAPI } from '../../services/api';

const BookForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    totalCopies: 1,
    publishedYear: new Date().getFullYear(),
    description: '',
  });
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGenres();
    if (isEdit) {
      fetchBook();
    }
  }, [id]);

  const fetchGenres = async () => {
    try {
      const response = await genresAPI.getAll();
      setGenres(response.data);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const fetchBook = async () => {
    if (!id) return;
    
    try {
      const response = await booksAPI.getById(parseInt(id));
      const book = response.data;
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        genre: book.genre,
        totalCopies: book.totalCopies,
        publishedYear: book.publishedYear,
        description: book.description || '',
      });
    } catch (error) {
      console.error('Failed to fetch book:', error);
      setError('Failed to load book details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await booksAPI.update(parseInt(id!), formData);
      } else {
        await booksAPI.create(formData);
      }
      navigate('/books');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalCopies' || name === 'publishedYear' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/books')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Book' : 'Add New Book'}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                ISBN *
              </label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                required
                value={formData.isbn}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                required
                value={formData.genre}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="totalCopies" className="block text-sm font-medium text-gray-700">
                Total Copies *
              </label>
              <input
                type="number"
                id="totalCopies"
                name="totalCopies"
                required
                min="1"
                value={formData.totalCopies}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">
                Published Year *
              </label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                required
                min="1000"
                max={new Date().getFullYear()}
                value={formData.publishedYear}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter book description..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEdit ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;