import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ModalProvider from "@/components/modal-provider";
import ToasterProvider from "@/components/toaster-provider";
import CrispProvider from "@/components/crisp-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI as a Service: Empowering Your Business",
  description:
    "Our AIaaS (AI as a Service) platform is your all-in-one solution for harnessing the power of artificial intelligence to elevate your business to new heights. Engage with customers effortlessly using our conversation tool, akin to ChatGPT, for seamless and intelligent interactions. Unlock your creative potential with image, music, and video generation tools that can produce stunning visuals, melodies, and videos based on your preferences. Need code? Let our AI code generator simplify your development tasks. Whether it's fostering customer engagement, generating content, or automating coding, our platform empowers you to thrive in today's AI-driven world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

// TODO:- remove them after shifting to .env file
