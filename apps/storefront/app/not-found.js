import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[980px] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-black/55">404</p>
      <h1 className="mb-4 text-3xl uppercase tracking-[0.14em] md:text-5xl">Page not found</h1>
      <p className="mb-10 max-w-xl text-sm leading-7 text-black/65">
        We looked everywhere, but this page does not exist.
      </p>

      <img
        src="/assets/images/travolta.gif"
        alt="Confused Travolta looking around"
        className="mb-10 h-auto w-[220px] max-w-full"
      />

      <Link
        href="/"
        className="inline-flex items-center justify-center bg-black px-8 py-3 text-xs uppercase tracking-[0.18em] text-white transition-opacity duration-200 hover:opacity-85"
      >
        Back to home
      </Link>
    </section>
  );
}
