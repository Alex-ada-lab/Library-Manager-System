# Deploying Library Manager Frontend to Vercel

## Quick Deployment Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Create a GitHub repository:**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `library-manager-frontend`
   - Don't initialize with README (we already have files)

2. **Upload your code to GitHub:**
   - Download all the project files from this workspace
   - Create a new folder on your computer called `library-manager-frontend`
   - Copy all the files into this folder
   - Open terminal/command prompt in that folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/library-manager-frontend.git
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your `library-manager-frontend` repository
   - Configure environment variables (see below)
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

## Environment Variables

In your Vercel project settings, add these environment variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `REACT_APP_API_BASE_URL` | `https://your-backend-api.herokuapp.com` | Your backend API URL |

**Important:** Replace `https://your-backend-api.herokuapp.com` with your actual backend API URL.

## Backend API Requirements

Your backend API must be deployed and accessible. Common options:

1. **Heroku** (Free tier available)
2. **Railway** (Free tier available)
3. **Render** (Free tier available)
4. **DigitalOcean App Platform**

Make sure your backend API:
- Is deployed and running
- Has CORS configured to allow your Vercel domain
- Is accessible via HTTPS

## CORS Configuration

Your NestJS backend needs to allow requests from your Vercel domain. Update your backend's CORS configuration:

```typescript
// In your NestJS main.ts file
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app', // Add your Vercel URL
  ],
  credentials: true,
});
```

## Post-Deployment Steps

1. **Test the deployment:**
   - Visit your Vercel URL
   - Try logging in
   - Test all major features

2. **Update API URL:**
   - Make sure `REACT_APP_API_BASE_URL` points to your deployed backend
   - Redeploy if needed

3. **Custom Domain (Optional):**
   - In Vercel dashboard, go to your project settings
   - Add a custom domain if you have one

## Troubleshooting

### Common Issues:

1. **API Connection Errors:**
   - Check if `REACT_APP_API_BASE_URL` is set correctly
   - Verify your backend is deployed and accessible
   - Check CORS configuration on backend

2. **Build Errors:**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`

3. **Routing Issues:**
   - The `vercel.json` file handles client-side routing
   - Make sure it's included in your deployment

### Getting Help:

- Check Vercel deployment logs
- Verify environment variables are set
- Test API endpoints directly in browser
- Check browser console for errors

## Files Needed for Deployment

Make sure you have all these files in your project:

```
library-manager-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── contexts/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── .gitignore
└── README.md
```

## Success!

Once deployed, your Library Manager Frontend will be available at:
`https://your-project-name.vercel.app`

The application will automatically build and deploy whenever you push changes to your GitHub repository.