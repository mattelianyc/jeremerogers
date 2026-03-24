export function Button({ children, className = "", ...buttonProps }) {
  const composedClassName = [
    "inline-flex w-full items-center justify-center border border-black px-8 py-4 text-xs uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-black hover:text-white",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={composedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
