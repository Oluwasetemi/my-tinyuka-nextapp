# Todo Application

A modern, full-stack todo application built with Next.js 15, TypeScript, and Tailwind CSS. This application demonstrates best practices for building scalable web applications with the Next.js App Router.

## Features

### Core Functionality

- **Create, Read, Update, Delete (CRUD)** operations for todos
- **Real-time data** with server-side rendering
- **Responsive design** with mobile-first approach
- **Type-safe** with TypeScript throughout
- **Modern UI** with Tailwind CSS and custom components

### Technical Features

- **Next.js 15 App Router** with modern file-based routing
- **Server Actions** for form handling and data mutations
- **Tailwind CSS** for styling with custom design system
- **Responsive design** that works on all devices
- **Type safety** with TypeScript interfaces
- **Performance optimized** with proper caching strategies
- **Production ready** with Vercel deployment

## Architecture

### File Structure

```
src/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts              # Main todos API
│   │       └── [id]/
│   │           └── route.ts          # Individual todo API
│   ├── components/
│   │   └── delete-confirmation.tsx   # Delete confirmation component
│   ├── lib/
│   │   └── actions.ts                # Server actions
│   ├── todos/
│   │   ├── layout.tsx                # Shared todos layout
│   │   ├── loading.tsx               # Loading UI
│   │   ├── page.tsx                  # Todos list page
│   │   ├── new/
│   │   │   └── page.tsx              # Create new todo
│   │   └── [id]/
│   │       ├── page.tsx              # View individual todo
│   │       ├── edit/
│   │       │   └── page.tsx          # Edit todo
│   │       └── delete/
│   │           └── page.tsx          # Delete confirmation
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── types/                            # TypeScript type definitions
└── utils/                            # Utility functions
```

### Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Server Actions** - Form handling and data mutations
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install

   # Using bun
   bun install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local file
   cp .env.example .env.local
   ```

4. **Run the development server**

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev

   # Using bun
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## API Documentation

### Endpoints

#### GET `/api/todos`

Returns all todos

```json
{
  "todos": [
    {
      "id": "1",
      "title": "Learn Next.js",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### POST `/api/todos`

Creates a new todo

```json
{
  "title": "New Todo",
  "completed": false
}
```

#### PUT `/api/todos`

Updates an existing todo

```json
{
  "id": "1",
  "title": "Updated Todo",
  "completed": true
}
```

#### DELETE `/api/todos`

Deletes a todo

```json
{
  "id": "1"
}
```

#### GET `/api/todos/[id]`

Returns a specific todo by ID

#### PUT `/api/todos/[id]`

Updates a specific todo by ID

#### DELETE `/api/todos/[id]`

Deletes a specific todo by ID

## UI Components

### Todo List

- Displays all todos with status indicators
- Quick actions for view, edit, and delete
- Empty state with call-to-action

### Todo Detail

- Shows complete todo information
- Edit and delete buttons
- Responsive layout

### Forms

- Create new todo form
- Edit existing todo form
- Form validation and error handling

### Delete Confirmation

- Confirmation dialog for destructive actions
- Clear warning about permanent deletion

## Development

### Code Style

- **TypeScript** with strict type checking
- **ESLint** for code quality
- **Prettier** for code formatting
- **Tailwind CSS** for styling

### Best Practices

- **Server Components** by default
- **Client Components** only when necessary
- **Server Actions** for form handling
- **Proper error handling** throughout
- **Type safety** with TypeScript
- **Responsive design** with Tailwind

### File Naming Conventions

- **kebab-case** for file names
- **camelCase** for functions and variables
- **UPPER_CASE** for constants

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Environment Variables

Set these in your Vercel dashboard:

- `NEXT_PUBLIC_API_URL` (optional) - Custom API URL
- `VERCEL_URL` (automatic) - Provided by Vercel

### Build Command

```bash
bun run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

Built with Next.js and TypeScript
