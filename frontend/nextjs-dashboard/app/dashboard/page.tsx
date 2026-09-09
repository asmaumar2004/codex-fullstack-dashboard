"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CurrentUser, getCurrentUser } from "@/lib/api";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";

const dashboardCards = [
  { title: "Total Tasks", value: "24", note: "All assigned tasks" },
  { title: "Completed", value: "16", note: "Finished this month" },
  { title: "In Progress", value: "6", note: "Currently being worked on" },
  { title: "Due Soon", value: "3", note: "Due in the next 5 days" },
];

const recentActivity = [
  { action: "Completed the homepage", time: "Today at 10:30 AM" },
  { action: "Tested the login API in Postman", time: "Yesterday at 4:15 PM" },
  { action: "Created the FastAPI health route", time: "Monday at 11:00 AM" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    // localStorage is available after this page opens in the browser.
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    // Ask FastAPI to confirm that the saved token is valid.
    async function checkAuthentication(savedToken: string) {
      try {
        const currentUser = await getCurrentUser(savedToken);
        setUser(currentUser);
      } catch {
        // Remove an invalid token so it cannot be used again.
        localStorage.removeItem("access_token");
        router.replace("/login");
      }
    }

    checkAuthentication(token);
  }, [router]);

  // Logging out removes the token and returns the user to the login page.
  function handleLogout() {
    localStorage.removeItem("access_token");
    router.replace("/login");
  }

  // Do not show protected content until FastAPI confirms the user.
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-medium text-slate-600">
          Checking authentication...
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar userName={user.name} userEmail={user.email} />

      <main className="flex-1 p-5 sm:p-8 lg:p-10">
        <DashboardHeader userName={user.name} onLogout={handleLogout} />

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">Your statistics</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardCards.map((card) => (
              <StatCard
                key={card.title}
                title={card.title}
                value={card.value}
                note={card.note}
              />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recent activity</h2>
            <p className="mt-1 text-sm text-slate-500">
              Dummy activity showing your latest project work.
            </p>
          </div>

          <ul className="mt-6 divide-y divide-slate-100">
            {recentActivity.map((activity) => (
              <li
                key={activity.action}
                className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="font-medium text-slate-700">{activity.action}</p>
                <p className="text-sm text-slate-500">{activity.time}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
