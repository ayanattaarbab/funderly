import './globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit-next',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta-next',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <body >
        <main >
          {children}
        </main>
      </body>
    </html>
  );
}