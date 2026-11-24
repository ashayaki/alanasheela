import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://alanasheela.shop'),
  title: 'ASC — Lala Style Picks | Inspirasi Belanja Modis Ala Lala',
  description:
    'Platform kurasi belanja affiliate resmi ASC (Alana Sheela Clarissa). INSPIRED BY LALA, PICKED FOR YOU. Temukan rekomendasi tops, bottoms, gamis, abaya, hijab, dan aksesoris rating 4.5+ di alanasheela.shop.',
  keywords: [
    'ASC',
    'Alana Sheela Clarissa',
    'Lala Style Picks',
    'Lala',
    'alanasheela.shop',
    'Affiliate Fashion',
    'Gamis',
    'Abaya',
    'Hijab',
    'Tops',
    'Bottoms',
    'Aksesoris',
  ],
  authors: [{ name: 'ASC (Alana Sheela Clarissa)' }],
  openGraph: {
    title: 'ASC — Lala Style Picks | INSPIRED BY LALA, PICKED FOR YOU',
    description: 'Inspirasi Belanja Modis Ala Lala di alanasheela.shop.',
    url: 'https://alanasheela.shop',
    siteName: 'ASC (Alana Sheela Clarissa)',
    images: [
      {
        url: '/lala-dress/lala-kondangan-01-sage-champagne.jpg',
        width: 1200,
        height: 630,
        alt: 'ASC — Lala Style Picks',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASC — Lala Style Picks',
    description: 'INSPIRED BY LALA, PICKED FOR YOU • alanasheela.shop',
    images: ['/lala-dress/lala-kondangan-01-sage-champagne.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icon.png?v=2', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/icon.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png?v=2" />
        <link rel="apple-touch-icon" href="/icon.png?v=2" />
      </head>
      <body className="antialiased min-h-screen bg-[#fbf9f5] text-[#24281e] font-sans selection:bg-[#e4ede0] selection:text-[#2d361f]">
        {children}
      </body>
    </html>
  );
}
