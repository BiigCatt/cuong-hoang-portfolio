import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cuong Hoang — Director / DOP / Editor",
    template: "%s — Cuong Hoang",
  },

  description:
    "Portfolio of Cuong Hoang — Director, DOP and Editor based in Vietnam. Selected work across film, media production and motion design.",

  keywords: [
    "Cuong Hoang",
    "Director",
    "DOP",
    "Editor",
    "Media Production",
    "Motion Design",
    "Vietnam",
    "Film",
    "Portfolio",
  ],

  authors: [
    {
      name: "Cuong Hoang",
    },
  ],

  creator: "Cuong Hoang",

  openGraph: {
    title: "Cuong Hoang — Director / DOP / Editor",

    description:
      "Selected film, media production and motion design work by Cuong Hoang.",

    type: "website",

    locale: "en_US",

    siteName: "Cuong Hoang Portfolio",
  },

  twitter: {
    card: "summary_large_image",

    title: "Cuong Hoang — Director / DOP / Editor",

    description:
      "Selected film, media production and motion design work by Cuong Hoang.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}