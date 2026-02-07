import { marked } from "marked";
import fs from "fs";
import path from "path";
import Link from "next/link";

export default async function PrivacyPage() {
  const filePath = path.join(process.cwd(), "public", "privacy.md");
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const htmlContent = await marked(fileContent);

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 mb-8 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 12l-4-4 4-4" />
          </svg>
          戻る
        </Link>
        <style>{`
          .privacy-content h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            margin-top: 2rem;
            color: rgb(24, 24, 27);
            line-height: 1.2;
          }
          
          .privacy-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            margin-top: 1.5rem;
            color: rgb(24, 24, 27);
            line-height: 1.3;
          }
          
          .privacy-content p {
            font-size: 1rem;
            line-height: 1.75;
            margin-bottom: 1rem;
            color: rgb(39, 39, 42);
          }
          
          .privacy-content ul {
            list-style-type: disc;
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }
          
          .privacy-content li {
            font-size: 1rem;
            line-height: 1.75;
            margin-bottom: 0.75rem;
            color: rgb(39, 39, 42);
          }
          
          .privacy-content strong {
            font-weight: 700;
            color: rgb(24, 24, 27);
          }
          
          .privacy-content em {
            font-style: italic;
            color: rgb(87, 87, 87);
          }
          
          @media (prefers-color-scheme: dark) {
            .privacy-content h1 {
              color: rgb(255, 255, 255);
            }
            
            .privacy-content h2 {
              color: rgb(255, 255, 255);
            }
            
            .privacy-content p {
              color: rgb(255, 255, 255);
            }
            
            .privacy-content li {
              color: rgb(255, 255, 255);
            }
            
            .privacy-content strong {
              color: rgb(255, 255, 255);
            }
            
            .privacy-content em {
              color: rgb(243, 244, 246);
            }
          }
        `}</style>
        <div
          className="privacy-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      <footer>
        <p className="mt-12 text-xs text-zinc-400 text-center">
          &copy; 2026 Magnezoo 製作委員会 All rights reserved. Server provided
          by by{" "}
          <Link
            href="https://uniproject.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
          >
            デジタル創作サークルUniProject
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
