import Image from "next/image";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

/**
 * Constructs a valid base URL for API calls
 */
const getBaseUrl = (): string => {
  // Check for explicit API URL first
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Handle Vercel deployment URLs
  if (process.env.VERCEL_URL) {
    // VERCEL_URL doesn't include protocol, so we need to add it
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    // This might already include protocol, so we need to check
    const url = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  }

  // Default to localhost for development
  return "http://localhost:3000";
};

export default async function Home() {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`SELECT * FROM users`;
  console.log(data);

  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/hello`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "John", age: 30 }),
  });
  const data2 = await response.json();
  console.log(data2);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Hello World</h1>
        {/* TODO: setup the todo page and also display a single todo page */}
        <div className="text-2xl font-bold">
          Assignment 1: Setup the todo page and also display a single todo page
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
