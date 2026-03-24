export function IconButton({
  children,
  className = "",
  ariaLabel,
  ...buttonProps
}) {
  const composedClassName = [
    "inline-flex h-10 w-10 items-center justify-center rounded-full text-black/80 transition-colors duration-200 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/40",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={composedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
