import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-20">
      <p className="text-eyebrow mb-4">Page Not Found</p>
      <h1 className="font-display font-extrabold text-5xl md:text-7xl text-ink tracking-tight">
        Wrong <span className="text-clay">Turn</span>
      </h1>
      <p className="mt-6 text-graphite max-w-sm">
        The page you’re looking for has been moved or doesn’t exist. Let’s get you
        back to the collection.
      </p>
      <Link
        href="/"
        className="btn-primary mt-10 text-eyebrow !text-white px-8 py-4"
      >
        Back To Home
      </Link>
    </div>
  );
}
