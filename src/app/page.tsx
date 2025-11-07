import Image from "next/image";
import Link from "next/link";
// import { getBaseUrl } from "./lib/data-service";
// import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

export default async function Home() {
//   const sql = neon(process.env.DATABASE_URL!);
//   const data = await sql`SELECT * FROM users`;
//   console.log(data);

//   const baseUrl = getBaseUrl();
//   console.log(baseUrl);
//   const response = await fetch(`${baseUrl}/api/hello`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: "John", age: 30 }),
//   });
//   const data2 = await response.json();
//   console.log(data2);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 text-black">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-white">Hello World</h1>

        {/* Todo App Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-4">Todo Application</h2>
          <p className="text-gray-600 mb-6">
            Assignment 1: Setup the todo page and also display a single todo page
          </p>

          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/todos"
              className="w-lg block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center transition-colors hover:scale-105"
            >
              View All Todos
            </Link>

            <Link
              href="/todos/new"
              className="w-lg block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-center transition-colors"
            >
              Create New Todo
            </Link>
          </div>
        </div>

        {/* API Data Display */}
       
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



{/* <div className="bg-gray-50 text-black rounded-lg p-6 max-w-4xl w-full">
<h3 className="text-lg font-semibold mb-4">API Response Data</h3>
<div className="space-y-4">
  <div>
    <h4 className="font-medium text-gray-700">Database Users:</h4>
    <pre className="bg-white p-3 rounded text-sm overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
  <div>
    <h4 className="font-medium text-gray-700">Hello API Response:</h4>
    <pre className="bg-white p-3 rounded text-sm overflow-auto">
      {JSON.stringify(data2, null, 2)}
    </pre>
  </div>
</div>
</div> */}