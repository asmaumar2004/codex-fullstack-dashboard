type SidebarProps = {
  userName: string;
  userEmail: string;
};

// The sidebar contains dashboard navigation and basic user information.
export default function Sidebar({ userName, userEmail }: SidebarProps) {
  return (
    <aside className="bg-slate-900 p-6 text-white md:flex md:min-h-screen md:w-64 md:flex-col">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          Learning Project
        </p>
        <h2 className="mt-2 text-xl font-bold">Codex Dashboard</h2>
      </div>

      <nav className="mt-8" aria-label="Dashboard navigation">
        <ul className="space-y-2">
          <li className="rounded-lg bg-blue-600 px-4 py-3 font-medium">
            Overview
          </li>
          <li className="rounded-lg px-4 py-3 text-slate-300">My tasks</li>
          <li className="rounded-lg px-4 py-3 text-slate-300">Activity</li>
        </ul>
      </nav>

      <div className="mt-8 border-t border-slate-700 pt-5 md:mt-auto">
        <p className="text-sm font-medium">{userName}</p>
        <p className="mt-1 break-all text-xs text-slate-400">{userEmail}</p>
      </div>
    </aside>
  );
}
