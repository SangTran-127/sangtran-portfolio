import type { NextSeoProps } from "next-seo";

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: "Sang | Portfolio",
  description: "Hi I'm Sang, hope you find something interesting",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://sangtran.dev",
    title: "Sang | Portfolio",
    description: "Hi I'm Sang, hope you find something interesting",
    images: [
      {
        url: "https://res.cloudinary.com/sangtran127/image/upload/v1674398189/blog-assests/2j_cp134j.png",
        width: 800,
        height: 600,
        alt: "Sang | Portfolio",
        type: "image/jpeg",
        // secureUrl: "https://www.test.ie/secure-og-image-a-01.jpg",
      },
    ],
    siteName: "SiteName A",
  },
  twitter: {
    handle: "@handlea",
    site: "@sitea",
    cardType: "summary_large_image",
  },
};
