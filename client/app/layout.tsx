import type { Metadata, Viewport } from "next";
import ClientProviders from "./providers/ClientProviders";

export const metadata: Metadata = {
  title: "AI Knowledge Base",
  description: "Intelligent knowledge base for teams"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}