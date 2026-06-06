"use client";

import { FormEvent, useMemo, useState } from "react";

type AlertResponse = {
  alertId: string;
  status: "monitoring";
  cadenceMinutes: number;
  nextCheckAt: string;
};

const channelOptions = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "sms", label: "Text (SMS)" },
  { id: "email", label: "Email" },
  { id: "call", label: "Phone call" },
] as const;

export function CreateAlertForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState<AlertResponse | null>(null);

  const [channels, setChannels] = useState<string[]>([
    "whatsapp",
    "email",
  ]);

  const canSubmit = useMemo(() => channels.length > 0, [channels]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      provisionalLicense: String(formData.get("provisionalLicense") ?? ""),
      existingBookingReference: String(
        formData.get("existingBookingReference") ?? "",
      ),
      theoryPassReference: String(formData.get("theoryPassReference") ?? ""),
      preferredLocation: String(formData.get("preferredLocation") ?? ""),
      preferredDateFrom: String(formData.get("preferredDateFrom") ?? ""),
      preferredDateTo: String(formData.get("preferredDateTo") ?? ""),
      preferredTimeFrom: String(formData.get("preferredTimeFrom") ?? ""),
      preferredTimeTo: String(formData.get("preferredTimeTo") ?? ""),
      phoneNumber: String(formData.get("phoneNumber") ?? ""),
      email: String(formData.get("email") ?? ""),
      channels,
    };

    if (!canSubmit) {
      setErrorMessage("Select at least one notification channel.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        if (response.status === 401) {
          throw new Error("Your session expired. Please sign in again.");
        }
        throw new Error(body.error ?? "Could not create your alert.");
      }

      const data = (await response.json()) as AlertResponse;
      setSuccess(data);
      event.currentTarget.reset();
      setChannels(["whatsapp", "email"]);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleChannel(channel: string) {
    setChannels((current) =>
      current.includes(channel)
        ? current.filter((item) => item !== channel)
        : [...current, channel],
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold text-slate-900">
        Create your slot alert
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Enter your details once. SlotWhiz monitors every 10 minutes and sends
        instant alerts when an earlier matching slot appears.
      </p>

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Full name
            <input
              required
              name="fullName"
              placeholder="Ariana Ahmed"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Provisional license number
            <input
              required
              name="provisionalLicense"
              placeholder="MORGA657054SM9IJ"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm uppercase outline-none ring-sky-300 transition focus:ring"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Existing practical booking reference
            <input
              name="existingBookingReference"
              placeholder="PRAC-12345678"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Theory pass reference
            <input
              name="theoryPassReference"
              placeholder="TH-123456"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-1">
            Preferred test location
            <input
              required
              name="preferredLocation"
              placeholder="Birmingham (Kings Heath)"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Date from
            <input
              required
              type="date"
              name="preferredDateFrom"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Date to
            <input
              required
              type="date"
              name="preferredDateTo"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Time from
            <input
              required
              type="time"
              name="preferredTimeFrom"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Time to
            <input
              required
              type="time"
              name="preferredTimeTo"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Phone number
            <input
              required
              type="tel"
              name="phoneNumber"
              placeholder="+44 7123 456789"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email address
            <input
              required
              type="email"
              name="email"
              placeholder="you@example.com"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring"
            />
          </label>
        </div>

        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-slate-700">
            Notification channels
          </legend>
          <div className="flex flex-wrap gap-3">
            {channelOptions.map((option) => {
              const isActive = channels.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleChannel(option.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isActive
                      ? "border-sky-400 bg-sky-50 text-sky-900"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
          This service is monitoring and alerting only. Booking confirmation is
          completed by you on the official booking site.
        </p>

        {errorMessage ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
            {errorMessage}
          </p>
        ) : null}

        {success ? (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            Alert {success.alertId} is active. Next check at{" "}
            {new Date(success.nextCheckAt).toLocaleString()}.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Starting monitoring..." : "Start monitoring"}
        </button>
      </form>
    </section>
  );
}
