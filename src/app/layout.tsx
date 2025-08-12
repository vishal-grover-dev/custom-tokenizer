import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CT - Custom Tokenizer",
  description: "A modern web application for text tokenization with an intuitive orange-themed neumorphic interface",
  keywords: ["tokenizer", "text processing", "nlp", "tokens", "text analysis"],
  authors: [{ name: "CT Team" }],
  creator: "Custom Tokenizer",
  publisher: "CT",
  robots: "index, follow",
  openGraph: {
    title: "CT - Custom Tokenizer",
    description: "A modern web application for text tokenization with an intuitive orange-themed neumorphic interface",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CT - Custom Tokenizer",
    description: "A modern web application for text tokenization with an intuitive orange-themed neumorphic interface",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF6B35",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={inter.variable}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body className={`${inter.className} antialiased bg-neumorphic-background min-h-screen`}>
        <div id='root' className='min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  );
}
