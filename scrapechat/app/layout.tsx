import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const adwaitaMono = localFont({
  src : "../public/AdwaitaMono-Regular.ttf",
  weight:"400",
  style:"normal",
  variable: "--font-adwaita-mono",
  
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scrapechat",
  description: "Website Scraper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      
      <body
        className={`${adwaitaMono.variable} antialiased`}>
          <header className="flex h-12 align-left border-b border-zinc-200  px-4 dark:border-zinc-700 bg-[rgb(22,21,21)]">
          <div className="h-full flex items-center gap-2">
          <div ><Image
            
            src="/main_logo.png"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
            
          />
           </div>
          </div>
        
      </header>
        
        
        <main className ="flex-1">{children}</main>
        <footer className="fixed bottom-0 align-left border-b border-zinc-200  px-4 dark:border-zinc-700 bg-black ">
          <div className="h-full flex items-center gap-2">
          <div ><a href="https://github.com/ypa-me/Webscraper">
          <Image
            
            src="/github-logo.png"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
            
          /></a>
           </div>



           <div ><a href="https://www.linkedin.com/in/yashvin-persand-37b404121/"><Image
            
            src="/linkedin-black.jpeg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
            
          /></a>
           </div>

           <div ><a href="mailto:portfolio.demise132@passinbox.com"><Image
            
            src="/mail-black.jpg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
            
          /></a>
           </div>
          </div>
        
      </footer>
        


      </body>
    </html>
  );
}
