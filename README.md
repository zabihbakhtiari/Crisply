# Crisply - Business Analytics Dashboard

## Overview
Crisply is a comprehensive business analytics dashboard designed to help teams track essential KPIs, monitor user activity, and manage subscriptions in one centralized platform. The dashboard provides real-time data visualization with intuitive navigation and a clean, modern interface.

## Features
- **Real-time Analytics Dashboard**: Track revenue, subscriptions, active users, and conversion rates
- **Performance Metrics**: View month-over-month growth with percentage indicators
- **User Activity Monitoring**: Real-time notifications of new user registrations
- **Database Management**: Access contacts, companies, and integration settings
- **Team Collaboration**: Supports team-based workflows with shared access

## Tech Stack
- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React Context API / Redux (optional)
- **Charts**: D3.js or Recharts for interactive data visualization
- **Backend**: Node.js API architecture (if applicable)
- **Database**: MongoDB for flexible data storage (if applicable)

## Project Structure
```
CRISPLY/
├── node_modules/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and services
│   ├── pages/            # Page components
│   ├── App.css           # Global styles
│   ├── App.tsx           # Main application component
│   ├── index.css         # Entry point styles
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # TypeScript environment declarations
├── .gitignore            # Git ignore file
├── bun.lockb             # Bun lock file (package manager)
├── components.json       # Component configurations
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point
├── package-lock.json     # NPM lock file
├── package.json          # Project dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── README.md             # Project documentation
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.app.json     # TypeScript configuration for app
├── tsconfig.json         # Main TypeScript configuration
├── tsconfig.node.json    # TypeScript configuration for Node
└── vite.config.ts        # Vite configuration
```

## Installation

```bash
# Clone the repository
git clone git@github.com:zabihbakhtiari/sidebar-profile-flow.git

# Navigate to project directory
cd crisply

# Install dependencies using npm
npm install
# Or using bun
bun install

# Run development server
npm run dev
# Or using bun
bun run dev
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Environment Setup

Create a `.env` file in the root directory:

```
VITE_API_URL=your_api_url
VITE_APP_ENV=development
```

## Dashboard Components

The Crisply dashboard includes:

1. **Sidebar Navigation**
   - Dashboard
   - Notifications
   - Notes
   - Tasks
   - Emails
   - Calendars
   - Database section (Analytics, Contacts, Companies, Integrations, Settings)
   - Marketing Team's section

2. **KPI Cards**
   - Total Revenue ($45,231.89)
   - Subscriptions (+2350)
   - Active Users (12,234)
   - Conversion Rate (2.4%)

3. **Overview Section**
   - Monthly analytics and stats visualization
   - Data charts for key metrics

4. **Recent Activity Feed**
   - Real-time notifications
   - User registration tracking

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment
The project can be deployed to various platforms:

### Vercel/Netlify
```bash
# Install the CLI
npm install -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build Docker image
docker build -t crisply:latest .

# Run container
docker run -p 3000:80 crisply:latest
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- All contributors who have helped shape Crisply
- The open-source community for their valuable tools and libraries