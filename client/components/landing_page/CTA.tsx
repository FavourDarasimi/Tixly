const CTA = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[#FF5722]" />
      <div className="absolute inset-0 bg-linear-to-br from-[#FF5722] via-[#FF6A3D] to-[#FF8A65] opacity-90" />

      <div className="relative max-w-7xl xl:max-w-[1500px] mx-auto px-6 text-center">
        {/* Content */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Experience Events the Better Way?
        </h2>

        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
          Discover events, buy tickets in seconds, or host your own event with
          powerful tools and real-time insights.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/events"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[#FF5722] shadow-lg hover:bg-slate-100 transition"
          >
            Find Events
          </a>

          <a
            href="/create-event"
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition"
          >
            Create an Event
          </a>
        </div>

        {/* Trust Line */}
        <p className="mt-8 text-sm text-white/80">
          Free to use · Secure payments · QR code check-ins
        </p>
      </div>
    </section>
  );
};

export default CTA;
