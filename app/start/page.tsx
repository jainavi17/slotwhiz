import Link from "next/link";
import { CreateAlertForm } from "@/components/create-alert-form";
import { getCurrentUser } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";

export default async function StartPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin?next=/start");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-sky-700">
              SLOTWHIZ
            </p>
            <h1 className="text-2xl font-bold md:text-3xl">Create your alert</h1>
            <p className="mt-1 text-sm text-slate-600">
              Signed in as {user.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to home
            </Link>
            <SignOutButton />
          </div>
        </header>

        <p className="mb-6 text-sm text-slate-600">
          Fill in your learner details and slot preferences to begin monitoring.
        </p>

        <CreateAlertForm />
      </main>
    </div>
  );
}
