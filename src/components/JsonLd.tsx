import { fundraiser, site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BarOrPub",
        "@id": "https://rainbow-saloon.vercel.app/#place",
        name: site.name,
        description:
          "Family-owned hometown bar in Roy, Utah, famous for extra-saucy house-sauce hot wings and Thursday & Saturday steak night.",
        telephone: "+1-801-776-9678",
        slogan: site.slogan,
        url: "https://rainbow-saloon.vercel.app/",
        image: "https://rainbow-saloon.vercel.app/images/wings-hero.jpg",
        servesCuisine: ["American", "Wings", "Steak"],
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 41.1535,
          longitude: -112.0261,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "11:00",
          closes: "02:00",
        },
      },
      {
        "@type": "Event",
        name: fundraiser.title,
        startDate: fundraiser.isoDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: site.name,
          address: site.address.full,
        },
        organizer: { "@type": "Organization", name: site.name },
        description: `Limited to ${fundraiser.ticketCap} tickets at ${fundraiser.priceLabel} each. Includes 2 entries, 2 dinners, 2 bands, and 100+ prizes. All proceeds to Shriners Children’s Hospital.`,
        offers: {
          "@type": "Offer",
          price: fundraiser.price,
          priceCurrency: "USD",
          availability: "https://schema.org/LimitedAvailability",
          url: "https://rainbow-saloon.vercel.app/fundraiser",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
