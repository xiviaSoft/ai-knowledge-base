import "./globals.css";
import ThemeRegistry from "./theme/themeRegistry";

export const metadata = {
  title: "AI Knowledge Assistant",
  description: "RAG + Wikipedia + Gemini",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}