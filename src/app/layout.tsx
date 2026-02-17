import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  // IMPORTANT: change this to your real domain once deployed (Vercel/custom domain)
  metadataBase: new URL("https://shivam-joshi-ds.vercel.app/"),

  title: {
    default: "Shivam Joshi | Data Scientist",
    template: "%s | Shivam Joshi",
  },
  description:
    "Data Scientist focused on production-ready ML systems: recommendation engines, NLP classifiers, and agentic AI workflows. Python, SQL, Spark, AWS/GCP, Docker, GitHub Actions.",

  // Helps some search engines understand your site
  keywords: [
    "Shivam Joshi",
    "Data Scientist",
    "Machine Learning Engineer",
    "NLP",
    "Recommendation Systems",
    "RAG",
    "FastAPI",
    "Python",
    "SQL",
    "Spark",
    "AWS",
    "GCP",
  ],

  authors: [{ name: "Shivam Joshi" }],
  creator: "Shivam Joshi",

  openGraph: {
    title: "Shivam Joshi | Data Scientist",
    description:
      "Production-ready ML systems: recommendation engines, NLP classifiers, and agentic AI workflows.",
    url: "/",
    siteName: "Shivam Joshi Portfolio",
    images: [
      {
        url: "/og.png", // must exist in /public
        width: 1200,
        height: 630,
        alt: "Shivam Joshi Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shivam Joshi | Data Scientist",
    description:
      "Production-ready ML systems: recommendation engines, NLP classifiers, and agentic AI workflows.",
    images: ["/og.png"],
  },

  icons: {
    icon: "/favicon.ico", // optional but recommended
    // You can also add:
    // apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* remove conflicting Tailwind bg/text since you use CSS variables */}
      <body suppressHydrationWarning className="min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
