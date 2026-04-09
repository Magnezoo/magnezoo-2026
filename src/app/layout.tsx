import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Magnezoo",
    default: "Magnezoo - みんなのウチの子決定戦！",
  },
  description:
    "Magnezooは、みんなのウチの子（ペットやキャラクターなど）を投稿して競う楽しいコンテストサイトです。かわいい、面白い、個性的なウチの子たちが大集合！ユーザーはお気に入りのウチの子に投票したり、コメントを残したりできます。さあ、あなたのウチの子も参加してみませんか？",
  openGraph: {
    title: "Magnezoo - みんなのウチの子決定戦！",
    description:
      "Magnezooは、みんなのウチの子（ペットやキャラクターなど）を投稿して競う楽しいコンテストサイトです。かわいい、面白い、個性的なウチの子たちが大集合！ユーザーはお気に入りのウチの子に投票したり、コメントを残したりできます。さあ、あなたのウチの子も参加してみませんか？",
    url: "https://magnezoo.com",
    siteName: "Magnezoo",
    images: [
      {
        url: "https://magnezoo.com/kv_net.png",
        width: 1200,
        height: 630,
        alt: "Magnezoo OGP Image",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnezoo - みんなのウチの子決定戦！",
    description:
      "Magnezooは、みんなのウチの子（ペットやキャラクターなど）を投稿して競う楽しいコンテストサイトです。かわいい、面白い、個性的なウチの子たちが大集合！ユーザーはお気に入りのウチの子に投票したり、コメントを残したりできます。さあ、あなたのウチの子も参加してみませんか？",
    images: [
      {
        url: "https://magnezoo.com/kv_net.png",
        alt: "Magnezoo Twitter Card Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <script
        id="adobe"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: 仕方ない
        dangerouslySetInnerHTML={{
          __html: `(function(d) {
    var config = {
      kitId: 'kag3lhh',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);`,
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleTagManager gtmId={"GTM-MR2QPRG5"} />
    </html>
  );
}
