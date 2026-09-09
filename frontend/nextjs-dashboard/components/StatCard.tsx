type StatCardProps = {
  title: string;
  value: string;
  note: string;
};

// One StatCard is displayed for each item in the dashboardCards array.
export default function StatCard({ title, value, note }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-4xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{note}</p>
    </article>
  );
}
