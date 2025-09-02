# AI Formula Nexus

An advanced AI-powered business automation platform with support for both English and Traditional Chinese languages.

## Project Description

AI Formula Nexus is a comprehensive business automation platform that leverages artificial intelligence to streamline workflows and enhance productivity. The platform features a modern, responsive design with multi-language support and user authentication.

## Features

- 🤖 AI-powered business automation
- 🌐 Multi-language support (English & Traditional Chinese)
- 🔐 User authentication with Supabase (Email/Password & Google OAuth)
- 🎨 Modern UI with yellow theme
- 📱 Responsive design
- ⚡ Built with React, TypeScript, and Vite
- 🛡️ Protected routes and user sessions
- 🚀 Deployed on Vercel with custom domain

## Technologies Used

This project is built with:

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Deployment**: Vercel
- **Language Support**: React Context for i18n

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Supabase account for authentication

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd ai-formula-nexus

# Step 3: Install dependencies
npm install

# Step 4: Set up environment variables
# Create a .env file in the root directory with:
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Step 5: Start the development server
npm run dev
```

### Environment Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Project Settings > API
3. Add them to your `.env` file
4. Configure authentication providers in Supabase dashboard

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication

The platform supports:
- Email/Password authentication
- Google OAuth integration
- Protected routes
- Persistent user sessions

## Deployment

The project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
