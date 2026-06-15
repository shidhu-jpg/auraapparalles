export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-500 mt-20">
      {/* Top strip */}
      <div className="border-b border-white/5 py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <p className="text-xl font-black tracking-[0.2em] text-white uppercase">Aura</p>
              <p className="text-[9px] font-semibold tracking-[0.35em] text-brand-500 uppercase">Apparels</p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Fresh fashion, fair swaps. Wear it, love it, swap it. New arrivals every week.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-white font-semibold mb-4 text-xs tracking-widest uppercase">Shop</p>
            <ul className="space-y-2.5">
              {['Women', 'Men', 'Kids', 'Accessories', 'Ethnic', 'Sale'].map(cat => (
                <li key={cat}>
                  <a href={`/?category=${cat}`} className="hover:text-white transition-colors text-sm">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-white font-semibold mb-4 text-xs tracking-widest uppercase">Help</p>
            <ul className="space-y-2.5">
              {['Size Guide', 'Shipping Info', 'Returns & Exchanges', 'Track Order', 'Contact Us', 'FAQs'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <p className="text-white font-semibold mb-4 text-xs tracking-widest uppercase">Connect</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-green-400">●</span> WhatsApp Us
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            </ul>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Free Returns', 'Secure Pay', 'Quality Assured'].map(badge => (
                <span key={badge} className="text-[10px] border border-white/10 text-gray-500 px-2.5 py-1 rounded-full">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
        <p>© {year} Aura Apparels. All rights reserved.</p>
        <p>Made with ♥ in India</p>
        <a
          href="/admin"
          className="text-gray-700 hover:text-gray-400 transition-colors text-[11px] underline underline-offset-2"
        >
          Admin
        </a>
      </div>
    </footer>
  )
}
