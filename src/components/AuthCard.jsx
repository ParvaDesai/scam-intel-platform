export default function AuthCard({ children, title, subtitle }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border rounded-2xl p-6 shadow-sm bg-white">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-zinc-600 mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
      <p className="text-xs text-zinc-500 text-center mt-3">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}
