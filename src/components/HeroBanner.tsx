'use client'

export default function HeroBanner() {
  return (
    <section className="relative bg-gray-950 text-white overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-brand-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-3xl" />
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#e8a535 1px, transparent 1px), linear-gradient(90deg, #e8a535 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative container mx-auto px-4 py-20 md:py-32 lg:py-40 flex flex-col lg:flex-row items-center gap-16">
        {/* Left — Text */}
        <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-semibold tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6 animate-fade-in-down">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            New Season Collection
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
            <span
              className="block animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Fresh
            </span>
            <span
              className="block gradient-text animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              Fashion.
            </span>
            <span
              className="block animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              Fair Swaps.
            </span>
          </h1>

          <p
            className="mt-6 text-gray-400 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            Handpicked styles that love your wallet as much as they love your wardrobe. New arrivals drop every week.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up"
            style={{ animationDelay: '500ms' }}
          >
            <a
              href="#products"
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3.5 rounded-full text-sm tracking-wider transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 active:scale-95"
            >
              Shop Now →
            </a>
            <a
              href="/?category=Women"
              className="border border-gray-700 hover:border-white text-gray-400 hover:text-white font-medium px-8 py-3.5 rounded-full text-sm transition-colors"
            >
              Women&apos;s Edit
            </a>
          </div>
        </div>

        {/* Right — Floating stat cards */}
        <div
          className="flex-shrink-0 flex gap-4 animate-fade-in"
          style={{ animationDelay: '600ms' }}
        >
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
              <p className="text-4xl font-black gradient-text">500+</p>
              <p className="text-xs text-gray-500 mt-1.5 tracking-wider uppercase">Styles</p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors animate-float" style={{ animationDelay: '1s' }}>
              <p className="text-4xl font-black text-white">50%</p>
              <p className="text-xs text-gray-500 mt-1.5 tracking-wider uppercase">Max Off</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors animate-float" style={{ animationDelay: '0.5s' }}>
              <p className="text-4xl font-black text-white">4</p>
              <p className="text-xs text-gray-500 mt-1.5 tracking-wider uppercase">Categories</p>
            </div>
            <div className="bg-brand-600/20 backdrop-blur border border-brand-500/30 rounded-2xl p-6 text-center hover:bg-brand-600/30 transition-colors">
              <p className="text-4xl font-black text-brand-400">Free</p>
              <p className="text-xs text-gray-500 mt-1.5 tracking-wider uppercase">Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full fill-gray-50">
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  )
}
