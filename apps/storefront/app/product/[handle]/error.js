"use client";

export default function ProductError({ reset }) {
  return (
    <section className="mx-auto w-full max-w-[1680px] px-5 pb-20 pt-10 md:px-10">
      <h2 className="text-xl uppercase tracking-[0.18em]">Unable to load product</h2>
      <button
        onClick={reset}
        className="mt-6 border border-black px-6 py-3 text-xs uppercase tracking-[0.18em]"
      >
        Retry
      </button>
    </section>
  );
}
