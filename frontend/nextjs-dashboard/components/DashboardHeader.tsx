type DashboardHeaderProps = {
  userName: string;
  onLogout: () => void;
};

// The parent dashboard supplies the user name and logout function as props.
export default function DashboardHeader({
  userName,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-blue-600">Dashboard overview</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
          Welcome back, {userName}
        </h1>
        <p className="mt-2 text-slate-600">
          Here is a simple summary of your learning progress.
        </p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="self-start rounded-lg bg-white px-5 py-2.5 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 sm:self-auto"
      >
        Log out
      </button>
    </header>
  );
}
