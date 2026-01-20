# Library Manager Frontend

A React-based frontend application for the Library Manager System that connects to a NestJS backend API.

## Features

### Authentication
- JWT-based login/logout functionality
- Role-based access control (Admin/Librarian)

### Dashboard
- Key statistics display (total books, members, active borrows, overdue books)
- Quick action buttons for common operations
- Clean, intuitive interface

### Book Management
- List all books with search and filtering by genre
- Create, view, edit, and delete books
- Track available copies and update when books are borrowed/returned
- ISBN and publication year tracking

### Member Management
- List all members with search functionality
- Register new members and edit existing records
- View complete borrowing history for each member
- Member status management (active/inactive)

### Borrowing System
- Process book borrowing with due date selection
- Handle book returns
- Validate available copies before borrowing
- Track overdue books with visual indicators

### Genre Management
- List all book genres
- Add new genres
- Edit or delete existing genres

### Staff Management (Admin Only)
- View all staff accounts
- Register new staff (set as admin or librarian)
- Delete staff accounts

### Reports & Analytics (Admin Only)
- Generate overdue books list
- Display popular genres statistics
- Export functionality for reports

## Technology Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 16 or higher)
2. **npm** or **yarn** package manager
3. **Backend API** running on `http://localhost:3000`

## Installation

1. **Install Node.js** if you haven't already:
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use a package manager like Chocolatey on Windows: `choco install nodejs`

2. **Clone and setup the backend** (if not done already):
   ```bash
   git clone https://github.com/dgebr1/library-manager-api
   cd library-manager-api
   npm install
   npm run start:dev
   ```

3. **Install frontend dependencies**:
   ```bash
   npm install
   ```

## Running the Application

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Open your browser** and navigate to `http://localhost:3000`

3. **Login** with your credentials (contact your administrator for login details)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Integration

The frontend connects to the NestJS backend API running on `http://localhost:3000`. The API endpoints include:

- `/auth/login` - Authentication
- `/books` - Book management
- `/members` - Member management
- `/borrows` - Borrowing operations
- `/genres` - Genre management
- `/staff` - Staff management (admin only)
- `/dashboard/stats` - Dashboard statistics

## Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Books/          # Book management
│   ├── Members/        # Member management
│   ├── Borrows/        # Borrowing system
│   ├── Genres/         # Genre management
│   ├── Staff/          # Staff management
│   ├── Reports/        # Reports and analytics
│   ├── Dashboard/      # Dashboard
│   └── Layout/         # Layout components
├── contexts/           # React contexts
├── services/           # API services
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## User Roles

### Librarian
- Manage books (add, edit, delete)
- Manage members (register, edit, delete)
- Process borrowing and returns
- Manage genres
- View dashboard statistics

### Admin
- All librarian permissions
- Manage staff accounts
- Access reports and analytics
- System administration

## Design Reference

The UI design is based on the reference at: https://v0-library-manager-system.vercel.app/

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure the backend server is running on `http://localhost:3000`
   - Check if the API endpoints are accessible

2. **Authentication Issues**
   - Clear browser localStorage and try logging in again
   - Verify credentials with your administrator

3. **Build Errors**
   - Delete `node_modules` and run `npm install` again
   - Ensure you have the correct Node.js version

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify the backend API is running and accessible
3. Ensure all dependencies are properly installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.