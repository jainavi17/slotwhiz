import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <p className="text-sm font-bold tracking-wide text-slate-900">SLOTWHIZ</p>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#how-it-works" className="hover:text-slate-900">
              How it works
            </a>
            <a href="#pricing" className="hover:text-slate-900">
              Pricing
            </a>
            <a href="#faq" className="hover:text-slate-900">
              FAQ
            </a>
            <Link href="/signin" className="hover:text-slate-900">
              Sign in
            </Link>
          </nav>
          <Link
            href="/signup"
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 md:text-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:px-10 md:py-24">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              DVSA Practical Test Slot Alerts
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Book an earlier test date without the stress.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              SlotWhiz checks for earlier slots every 10 minutes and notifies
              you instantly when a match appears for your centre, date, and time
              preferences.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Create Alert
              </Link>
              <a
                href="#how-it-works"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-wide text-slate-500">
              LIVE EXAMPLE
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold text-emerald-700">MATCH FOUND</p>
                <p className="mt-1 text-sm text-slate-800">
                  Birmingham (Kings Heath) - Tue, 16 Jul at 10:42
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  Alert sent via WhatsApp, SMS, and Email.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">Next check in 09m 23s</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-12 text-center md:grid-cols-3 md:px-10">
          <div>
            <p className="text-3xl font-bold text-slate-900">10m</p>
            <p className="mt-1 text-sm text-slate-600">monitoring interval</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">4</p>
            <p className="mt-1 text-sm text-slate-600">notification channels</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">24/7</p>
            <p className="mt-1 text-sm text-slate-600">automated checks</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-sky-700">Step 1</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                Add your preferences
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Enter your licence details, booking reference, preferred centre,
                and ideal date/time range.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-sky-700">Step 2</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                We keep checking
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                SlotWhiz monitors availability every 10 minutes against your
                chosen criteria.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-sky-700">Step 3</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                You get alerted quickly
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                When an earlier slot appears, you get notified instantly and can
                update your booking.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="text-3xl font-bold text-slate-900">Pricing</h2>
          <p className="mt-3 text-slate-600">
            Choose a plan based on how many alerts and channels you need.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Free</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">£0</p>
              <p className="text-sm text-slate-500">per month</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>1 active alert</li>
                <li>Email notifications</li>
                <li>Standard monitoring</li>
              </ul>
            </article>
            <article className="rounded-xl border-2 border-sky-300 bg-sky-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                Most Popular
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">Pro</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">£9.99</p>
              <p className="text-sm text-slate-500">per month</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Up to 5 alerts</li>
                <li>WhatsApp, SMS, Email, Call</li>
                <li>Priority notifications</li>
              </ul>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Plus</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">£14.99</p>
              <p className="text-sm text-slate-500">per month</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Unlimited alerts</li>
                <li>All channels included</li>
                <li>Premium support</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="text-3xl font-bold text-slate-900">Testimonials</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <blockquote className="rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
              “I moved my test forward by 6 weeks in two days. Alerts arrived at
              the perfect time.”
              <p className="mt-3 text-sm font-semibold text-slate-900">
                Aisha, Manchester
              </p>
            </blockquote>
            <blockquote className="rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
              “The setup was simple and I stopped refreshing pages manually all
              day.”
              <p className="mt-3 text-sm font-semibold text-slate-900">
                Daniel, Birmingham
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="text-3xl font-bold text-slate-900">Frequently asked questions</h2>
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Does SlotWhiz book automatically?
              </h3>
              <p className="mt-2 text-slate-600">
                SlotWhiz monitors and alerts. Final booking updates are completed
                by you on the official booking service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                How often do checks run?
              </h3>
              <p className="mt-2 text-slate-600">Every 10 minutes by default.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Which alert channels are available?
              </h3>
              <p className="mt-2 text-slate-600">
                WhatsApp, SMS, email, and optional call alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center md:px-10 md:py-20">
          <h2 className="text-3xl font-bold text-white">
            Start finding earlier slots today
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Create your first alert in under two minutes and get instant updates.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
