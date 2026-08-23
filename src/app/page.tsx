export default function Home() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Sticky Fundraiser Banner */}
      <div className="sticky top-0 z-50 bg-red-800 text-white text-center py-3 px-4 shadow-lg">
        <p className="font-bold text-sm sm:text-base">
          🚨 20th Annual Shriners Fundraiser — THIS Saturday Aug 29 • Limited to 450 tickets •{" "}
          <a href="#fundraiser" className="underline font-extrabold hover:text-amber-200">
            Get Tickets Now
          </a>
        </p>
      </div>

      {/* Header / Nav */}
      <header className="border-b border-stone-800 bg-stone-900/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌈</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-amber-400">
                Rainbow Saloon
              </h1>
              <p className="text-xs text-stone-400">Roy, Utah • Est. decades ago</p>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium">
            <a href="#wings" className="hover:text-amber-400 transition">
              Wings
            </a>
            <a href="#menu" className="hover:text-amber-400 transition">
              Menu
            </a>
            <a href="#fundraiser" className="hover:text-amber-400 transition">
              Fundraiser
            </a>
            <a href="#about" className="hover:text-amber-400 transition">
              Our Story
            </a>
            <a href="#visit" className="hover:text-amber-400 transition">
              Visit
            </a>
            <a
              href="tel:8017769678"
              className="bg-amber-500 text-stone-950 px-4 py-1.5 rounded-full font-semibold hover:bg-amber-400 transition"
            >
              Call (801) 776-9678
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/60 via-stone-950/80 to-stone-950" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-3">
            Roy’s Hometown Bar
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Famous Extra-Saucy
            <br />
            <span className="text-red-500">Hot Wings</span>
          </h2>
          <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto mb-8">
            House-made sauce. Perfect sweet heat. The wings locals drive for.
            Plus legendary Steak Nights every Thursday & Saturday.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#fundraiser"
              className="inline-flex items-center justify-center bg-red-700 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg transition"
            >
              Shriners Fundraiser Tickets →
            </a>
            <a
              href="#wings"
              className="inline-flex items-center justify-center border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-stone-950 font-bold px-8 py-4 rounded-lg text-lg transition"
            >
              See the Wings
            </a>
          </div>
          <p className="mt-8 text-stone-400 text-sm italic">
            “If you want hot wings, this is the place!” — Local reviews
          </p>
        </div>
      </section>

      {/* Wings Hero Section */}
      <section id="wings" className="bg-stone-900 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-4">
                The Wings That Put Us on the Map
              </h3>
              <p className="text-stone-300 text-lg leading-relaxed mb-4">
                Extra saucy. Tossed in our own house-made sauce — a perfect blend of
                BBQ and tomatoey sweetness with a kick that starts mild and builds
                just right. Mild still has flavor. Locals call them the best in the
                state.
              </p>
              <p className="text-stone-400 mb-6">
                Available for dine-in or to-go. Coming soon: take our signature sauce
                home in convenient flex pouches or bottles so you can recreate the
                magic.
              </p>
              <a
                href="tel:8017769678"
                className="inline-block bg-red-700 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Call for To-Go Orders
              </a>
            </div>
            <div className="bg-stone-800 rounded-2xl p-8 border border-stone-700 text-center">
              <div className="text-6xl mb-4">🍗🔥</div>
              <p className="text-amber-400 font-bold text-xl mb-2">Signature House Sauce</p>
              <p className="text-stone-400 text-sm">
                Extra saucy by design. We recommend flex-pack pouches for single
                orders or retail bottles so the wings stay crispy and the sauce stays
                perfect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fundraiser Section */}
      <section id="fundraiser" className="py-16 sm:py-20 bg-red-950/40 border-y border-red-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-2">
            20th Annual • August 29, 2026
          </p>
          <h3 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Shriners Children’s Hospital Fundraiser
          </h3>
          <p className="text-xl text-stone-300 mb-6">
            We’ve raised over <span className="text-amber-400 font-bold">$250,000</span>{" "}
            thanks to our community. Let’s keep it going.
          </p>

          <div className="bg-stone-900/80 rounded-2xl p-6 sm:p-8 text-left mb-8 border border-stone-700">
            <h4 className="text-xl font-bold text-amber-400 mb-4">Ticket Details</h4>
            <ul className="space-y-2 text-stone-300 mb-6">
              <li>• Limited to only <strong>450 tickets</strong></li>
              <li>• <strong>$185</strong> per ticket</li>
              <li>• Includes 2 entries into the party, 2 dinners, and 2 bands</li>
              <li>• Chance at 100+ prizes: grill, Blackstone, kayak, paddle board, swimming pool, bicycle, gift certificates, $1,000 wakeboard, surfboard, snowboard, and more</li>
              <li>• You do <strong>not</strong> have to be present to win — we call all winners</li>
            </ul>

            <h4 className="text-xl font-bold text-amber-400 mb-3">How to Get Tickets</h4>
            <ol className="list-decimal list-inside space-y-2 text-stone-300 mb-6">
              <li>
                <strong>Venmo</strong> the donation (include “donation”, your full name,
                address, and phone number)
              </li>
              <li>Stop by Rainbow Saloon in person</li>
              <li>
                Call{" "}
                <a href="tel:8017769678" className="text-amber-400 underline">
                  (801) 776-9678
                </a>{" "}
                with questions
              </li>
            </ol>
            <p className="text-stone-400 text-sm">
              All proceeds go directly to Shriners Children’s Hospital. Thank you for
              supporting this incredible cause.
            </p>
          </div>

          <a
            href="tel:8017769678"
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-10 py-4 rounded-lg text-lg shadow-lg transition"
          >
            Call Now for Tickets
          </a>
        </div>
      </section>

      {/* Menu Teaser */}
      <section id="menu" className="py-16 sm:py-20 bg-stone-900">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-amber-400 mb-10">
            More Than Just Wings
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
              <div className="text-3xl mb-3">🥩</div>
              <h4 className="font-bold text-lg mb-2">Steak Night</h4>
              <p className="text-stone-400 text-sm">
                Thursdays & Saturdays. Perfectly cooked steak topped with sautéed
                mushrooms and onions. A local legend.
              </p>
            </div>
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
              <div className="text-3xl mb-3">🍔</div>
              <h4 className="font-bold text-lg mb-2">Burgers & More</h4>
              <p className="text-stone-400 text-sm">
                Cheeseburgers, pastrami burger, nachos, zucchini fries, combo
                appetizer samplers — cooked to order.
              </p>
            </div>
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
              <div className="text-3xl mb-3">🎱</div>
              <h4 className="font-bold text-lg mb-2">Games & Vibes</h4>
              <p className="text-stone-400 text-sm">
                Pool, darts, TVs, outdoor patio, full bar. Good for groups. ID
                checked at the door. Everyone welcome.
              </p>
            </div>
          </div>
          <p className="text-center text-stone-500 mt-8 text-sm">
            Full menu available at the bar. Call ahead for large parties or to-go.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 sm:py-20 bg-stone-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6">
            Our Story
          </h3>
          <p className="text-lg text-stone-300 leading-relaxed mb-6">
            Rainbow Saloon is more than just a bar. It’s a family.
          </p>
          <p className="text-stone-400 leading-relaxed mb-6">
            Owned and operated by Terry and Julie Strickland with their daughter
            Brittni, the Rainbow has been a Roy institution for decades. Terry and
            Julie met while working here, took over the business, and built a place
            where everyone — from 21 to 91 — is welcome.
          </p>
          <p className="text-xl font-semibold text-amber-400 italic mb-6">
            “Saving lives, one jar at a time.”
          </p>
          <p className="text-stone-400 leading-relaxed">
            Whether it’s our famous fundraisers for Shriners Children’s Hospital,
            support for local families in need, or simply being a safe, friendly
            place to celebrate or unwind — community is at the heart of everything
            we do.
          </p>
        </div>
      </section>

      {/* Visit / Contact */}
      <section id="visit" className="py-16 sm:py-20 bg-stone-900 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-amber-400 mb-10">
            Visit Us
          </h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h4 className="font-bold text-xl mb-4">Hours & Location</h4>
              <p className="text-stone-300 mb-2">
                <strong>Open daily</strong>
                <br />
                11:00 AM – 2:00 AM
              </p>
              <p className="text-stone-300 mb-4">
                6045 S 1900 W
                <br />
                Roy, UT 84067
              </p>
              <p className="mb-4">
                <a
                  href="tel:8017769678"
                  className="text-amber-400 font-semibold text-lg hover:underline"
                >
                  (801) 776-9678
                </a>
              </p>
              <p className="text-stone-400 text-sm mb-6">
                Free parking • Outdoor patio • Wheelchair accessible • Full bar
                (beer, wine, cocktails) • ID required
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/p/Rainbow-Saloon-100063619688255/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/rainbowsaloonandgrill/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                  Instagram
                </a>
                <a
                  href="https://www.yelp.com/biz/rainbow-saloon-roy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                  Yelp
                </a>
              </div>
            </div>
            <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
              <h4 className="font-bold text-xl mb-4">Map & Directions</h4>
              <div className="aspect-video bg-stone-700 rounded-lg flex items-center justify-center text-stone-400 text-sm">
                <a
                  href="https://maps.google.com/?q=6045+S+1900+W,+Roy,+UT+84067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-amber-400"
                >
                  Open in Google Maps →
                </a>
              </div>
              <p className="text-stone-500 text-xs mt-3">
                Easy access off SR-126 / 1900 W in Roy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-800 py-8 text-center text-stone-500 text-sm">
        <p className="mb-2">
          © {new Date().getFullYear()} Rainbow Saloon • 6045 S 1900 W, Roy, UT 84067
        </p>
        <p className="italic text-stone-600">
          Saving lives, one jar at a time.
        </p>
        <p className="mt-4 text-xs">
          Site built for speed, value & ownership handoff • Preview version
        </p>
      </footer>
    </div>
  );
}
