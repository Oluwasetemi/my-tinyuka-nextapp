import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { CreateTodoRequest, UpdateTodoRequest, DeleteTodoRequest, NewTodo, PartialTodo } from "@/types/database";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const sampleTodos: PartialTodo[] = [
  {
    title: "Set up Next.js 15 project with App Router",
    description: "Initialize a new Next.js project with TypeScript, Tailwind CSS, and configure the App Router structure",
    status: "completed",
    priority: "high",
    completed: true,
    completed_at: new Date("2024-01-15T10:30:00Z"),
    due_date: new Date("2024-01-15"),
    category: "Setup",
    tags: JSON.stringify(["nextjs", "typescript", "tailwind", "app-router"]),
    sort_order: 1
  },
  {
    title: "Implement authentication with NextAuth.js",
    description: "Set up user authentication using NextAuth.js with Google and GitHub providers, create protected routes",
    status: "in_progress",
    priority: "high",
    completed: false,
    due_date: new Date("2024-01-20"),
    category: "Authentication",
    tags: JSON.stringify(["nextauth", "authentication", "oauth", "protected-routes"]),
    sort_order: 2
  },
  {
    title: "Create reusable UI components with Shadcn/ui",
    description: "Build a component library using Shadcn/ui components like Button, Card, Dialog, and Form components",
    status: "pending",
    priority: "medium",
    completed: false,
    due_date: new Date("2024-01-25"),
    category: "UI/UX",
    tags: JSON.stringify(["shadcn", "components", "ui-library", "reusable"]),
    sort_order: 3
  },
  {
    title: "Implement server actions for form handling",
    description: "Replace client-side form handling with Next.js server actions for better performance and SEO",
    status: "pending",
    priority: "medium",
    completed: false,
    due_date: new Date("2024-01-28"),
    category: "Forms",
    tags: JSON.stringify(["server-actions", "forms", "performance", "seo"]),
    sort_order: 4
  },
  {
    title: "Set up database with Drizzle ORM and Neon",
    description: "Configure PostgreSQL database with Neon, set up Drizzle ORM for type-safe database operations",
    status: "pending",
    priority: "high",
    completed: false,
    due_date: new Date("2024-01-30"),
    category: "Database",
    tags: JSON.stringify(["drizzle", "neon", "postgresql", "orm", "type-safe"]),
    sort_order: 5
  },
  {
    title: "Implement real-time features with Socket.io",
    description: "Add real-time notifications and live updates using Socket.io for collaborative features",
    status: "pending",
    priority: "low",
    completed: false,
    due_date: new Date("2024-02-05"),
    category: "Real-time",
    tags: JSON.stringify(["socket.io", "real-time", "notifications", "collaboration"]),
    sort_order: 6
  },
  {
    title: "Optimize images with Next.js Image component",
    description: "Replace all img tags with Next.js Image component for automatic optimization and lazy loading",
    status: "pending",
    priority: "medium",
    completed: false,
    due_date: new Date("2024-02-10"),
    category: "Performance",
    tags: JSON.stringify(["next-image", "optimization", "lazy-loading", "performance"]),
    sort_order: 7
  },
  {
    title: "Set up API routes for external integrations",
    description: "Create API routes for integrating with third-party services like Stripe, SendGrid, and AWS S3",
    status: "pending",
    priority: "medium",
    completed: false,
    due_date: new Date("2024-02-15"),
    category: "API",
    tags: JSON.stringify(["api-routes", "stripe", "sendgrid", "aws-s3", "integrations"]),
    sort_order: 8
  },
  {
    title: "Implement error boundaries and error handling",
    description: "Add comprehensive error handling with error boundaries, try-catch blocks, and user-friendly error messages",
    status: "pending",
    priority: "high",
    completed: false,
    due_date: new Date("2024-02-20"),
    category: "Error Handling",
    tags: JSON.stringify(["error-boundaries", "error-handling", "user-experience", "debugging"]),
    sort_order: 9
  },
  {
    title: "Add unit tests with Jest and React Testing Library",
    description: "Write comprehensive unit tests for components, utilities, and API routes using Jest and RTL",
    status: "pending",
    priority: "medium",
    completed: false,
    due_date: new Date("2024-02-25"),
    category: "Testing",
    tags: JSON.stringify(["jest", "react-testing-library", "unit-tests", "coverage"]),
    sort_order: 10
  },
  {
    title: "Implement dark mode with next-themes",
    description: "Add dark/light mode toggle using next-themes with system preference detection and persistent storage",
    status: "pending",
    priority: "low",
    completed: false,
    due_date: new Date("2024-03-01"),
    category: "UI/UX",
    tags: JSON.stringify(["dark-mode", "next-themes", "user-preferences", "accessibility"]),
    sort_order: 11
  },
  {
    title: "Set up CI/CD pipeline with GitHub Actions",
    description: "Configure automated testing, building, and deployment pipeline for production releases",
    status: "pending",
    priority: "medium",
    completed: false,
    due_date: new Date("2024-03-05"),
    category: "DevOps",
    tags: JSON.stringify(["github-actions", "ci-cd", "deployment", "automation"]),
    sort_order: 12
  },
  {
    title: "Optimize bundle size and performance",
    description: "Analyze and optimize bundle size using Next.js bundle analyzer, implement code splitting and lazy loading",
    status: "pending",
    priority: "high",
    completed: false,
    due_date: new Date("2024-03-10"),
    category: "Performance",
    tags: JSON.stringify(["bundle-optimization", "code-splitting", "lazy-loading", "performance"]),
    sort_order: 13
  },
  {
    title: "Add internationalization (i18n) support",
    description: "Implement multi-language support using next-intl or similar library for global user base",
    status: "pending",
    priority: "low",
    completed: false,
    due_date: new Date("2024-03-15"),
    category: "Internationalization",
    tags: JSON.stringify(["i18n", "internationalization", "multi-language", "global"]),
    sort_order: 14
  },
  {
    title: "Implement PWA features with next-pwa",
    description: "Add Progressive Web App features including service worker, offline support, and app-like experience",
    status: "pending",
    priority: "low",
    completed: false,
    due_date: new Date("2024-03-20"),
    category: "PWA",
    tags: JSON.stringify(["pwa", "service-worker", "offline", "app-like"]),
    sort_order: 15
  }
];

export async function GET(): Promise<NextResponse> {
  const data = await db.query.todos.findMany();
  return NextResponse.json({
    todos: data,
    count: data.length,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateTodoRequest = await request.json();

    // Validate input TODO: use zod next time
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const newTodo: NewTodo = {
      title: body.title.trim(),
      description: body.description?.trim() ?? "",
      priority: body.priority,
      completed: body.completed,
      due_date: body.due_date,
      category: body.category,
      tags: body.tags,
      user_id: body.user_id,
      status: body.status,
      sort_order: body.sort_order,
    };

    await db.insert(todos).values(newTodo);

    return NextResponse.json(
      { message: "Todo created successfully", todo: newTodo },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body: UpdateTodoRequest = await request.json();

    // Validate input
    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    const todo = await db.query.todos.findFirst({
      where: eq(todos.id, parseInt(body.id)),
    });

    if (!todo) {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }

    const updatedTodo: PartialTodo = {
      title: body.title?.trim() ?? todo?.title,
      completed: body.completed ?? todo?.completed,
    };


    await db.update(todos).set(updatedTodo).where(eq(todos.id, parseInt(body.id)));

    return NextResponse.json(
      { message: "Todo updated successfully", todo: updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const body: DeleteTodoRequest = await request.json();
    console.log(body);

    // Validate input
    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    const todo = await db.query.todos.findFirst({
      where: eq(todos.id, parseInt(body.id)),
    });

    console.log(todo);

    if (!todo) {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }

    try {
      await db.delete(todos).where(eq(todos.id, parseInt(body.id)));

      return NextResponse.json(
        { message: "Todo deleted successfully" },
        { status: 200 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to delete todo" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request parsing error:", error);
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}
