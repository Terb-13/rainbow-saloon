export const site = {
  name: "Rainbow Saloon",
  slogan: "Saving lives, one jar at a time.",
  phone: "801-776-9678",
  phoneHref: "tel:8017769678",
  phoneDisplay: "(801) 776-9678",
  address: {
    street: "6045 S 1900 W",
    city: "Roy",
    state: "UT",
    zip: "84067",
    full: "6045 S 1900 W, Roy, UT 84067",
  },
  hours: "11 AM – 2 AM daily",
  hoursShort: "Open 11 AM – 2 AM, every day",
  owners: "Terry & Julie Strickland + daughter Brittni",
  impact: "$250,000+",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=6045+S+1900+W,+Roy,+UT+84067",
  mapsEmbed:
    "https://www.google.com/maps?q=6045+S+1900+W,+Roy,+UT+84067&output=embed",
  facebook: "https://www.facebook.com/p/Rainbow-Saloon-100063619688255/",
  instagram: "https://www.instagram.com/rainbowsaloonandgrill/",
  yelp: "https://www.yelp.com/biz/rainbow-saloon-roy",
} as const;

export const fundraiser = {
  title: "20th Annual Shriners Children’s Hospital Fundraiser",
  shortTitle: "20th Annual Shriners Fundraiser",
  dateLabel: "Saturday, August 29, 2026",
  dateShort: "This Saturday, Aug 29",
  isoDate: "2026-08-29",
  ticketCap: 450,
  price: 185,
  priceLabel: "$185",
  includes: [
    "2 entries into the party",
    "2 dinners",
    "2 live bands",
    "100+ prizes — all included",
  ],
  prizes: [
    { name: "Grill", note: "Backyard showpiece" },
    { name: "Blackstone", note: "Griddle night, sorted" },
    { name: "Kayak", note: "Utah water, unlocked" },
    { name: "Paddle board", note: "Lake-ready" },
    { name: "Swimming pool", note: "Summer, delivered" },
    { name: "Bike", note: "Ride-ready" },
    { name: "Gift certificates", note: "Local favorites" },
    { name: "$1,000 wakeboard", note: "The splash prize" },
  ],
  presentToWin: false,
  venmoNote:
    "Venmo is accepted. Include the word “donation” plus your full name, address, and phone number so we can fill out the tickets for you.",
  allProceeds: "All proceeds go to Shriners Children’s Hospital.",
};

export const nav = [
  { href: "/wings", label: "Wings" },
  { href: "/menu", label: "Menu" },
  { href: "/drinks", label: "Drinks" },
  { href: "/fundraiser", label: "Fundraiser" },
  { href: "/order", label: "Order" },
  { href: "/story", label: "Our Story" },
  { href: "/shop", label: "Shop" },
  { href: "/visit", label: "Visit" },
] as const;
