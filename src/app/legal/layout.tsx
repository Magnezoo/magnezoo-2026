const proseBaseClassName = [
  "prose prose-neutral w-full max-w-none",
  "text-zinc-700 prose-p:leading-8 prose-li:leading-8 prose-strong:text-zinc-950",
  "prose-headings:font-semibold prose-headings:text-zinc-950",
  "prose-a:font-medium prose-a:text-sky-700 prose-a:underline prose-a:decoration-sky-300 prose-a:underline-offset-4",
  "hover:prose-a:text-sky-500 hover:prose-a:decoration-sky-500",
].join(" ");

const responsiveClassName = [
  "prose-sm sm:prose-base lg:prose-base",
  "prose-h1:text-3xl sm:prose-h1:text-4xl lg:prose-h1:text-4xl",
  "prose-h2:text-2xl sm:prose-h2:text-3xl lg:prose-h2:text-3xl",
  "prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-2xl",
  "prose-h4:text-lg sm:prose-h4:text-xl lg:prose-h4:text-xl",
  "prose-h5:text-base sm:prose-h5:text-lg lg:prose-h5:text-lg",
  "prose-h6:text-sm sm:prose-h6:text-base lg:prose-h6:text-lg",
].join(" ");

const layoutClassName = [
  "max-w-3xl lg:max-w-4xl xl:max-w-5xl",
  "px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20",
].join(" ");

const headingClassName = [
  "prose-headings:scroll-mt-24",
  "prose-h1:mb-6 prose-h1:tracking-tight",
  "prose-h2:mt-14 prose-h2:mb-5 prose-h2:border-b prose-h2:border-zinc-200 prose-h2:pb-3",
  "prose-h3:mt-10 prose-h3:mb-4 prose-h3:border-l-4 prose-h3:border-sky-500 prose-h3:pl-4",
  "prose-h4:mt-8 prose-h4:mb-3",
].join(" ");

const richElementClassName = [
  "prose-blockquote:my-8 prose-blockquote:rounded-r-2xl prose-blockquote:border-l-4 prose-blockquote:border-sky-500",
  "prose-blockquote:bg-sky-50 prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-zinc-700",
  "prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:border prose-pre:border-zinc-800",
  "prose-pre:bg-zinc-950 prose-pre:px-5 prose-pre:py-4 prose-pre:text-zinc-100 prose-pre:shadow-lg",
  "prose-code:rounded-md prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-medium prose-code:text-sky-800",
  "prose-code:before:content-none prose-code:after:content-none",
  "prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-[0.95em] prose-pre:code:text-inherit",
].join(" ");

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full justify-center px-4 sm:px-6 lg:px-8">
      <article
        className={`${proseBaseClassName} ${responsiveClassName} ${layoutClassName} ${headingClassName} ${richElementClassName}`}
      >
        {children}
      </article>
    </main>
  );
}
