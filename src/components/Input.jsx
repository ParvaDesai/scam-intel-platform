export default function Input({ label, error, className="", ...props }) {
  return (
    <label className="grid gap-1">
      {label && <span className="text-sm font-medium">{label}</span>}
      <input
        className={`border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </label>
  );
}
