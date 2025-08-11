import { Outlet, NavLink } from "react-router-dom";

export default function App() {
  const link = "px-3 py-2 rounded hover:bg-zinc-200/60 transition";
  const active = ({ isActive }) =>
    `${link} ${isActive ? "font-semibold underline" : ""}`;

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto] bg-zinc-50">
      <header className="flex">
        <div className="mr-auto">
          <span className="mr-4 font-bold ">ScamIntel</span>
        </div>
        <div>
          <nav className="mx-auto max-w-5xl p-3 flex gap-2">
            <NavLink to="/" className={`${active} p-3 text-white`}>
              Home
            </NavLink>
            <NavLink to="/auth" className={active}>
              Sign In
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl w-full p-4">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl p-3 text-xs text-zinc-500">
          © {new Date().getFullYear()} ScamIntel
        </div>
      </footer>
    </div>
  );
}
