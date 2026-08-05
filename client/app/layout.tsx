import { AuthProvider } from "./contexts/AuthContext";
import EmotionRegistry from "./theme/EmotionRegistry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <AuthProvider>{children}</AuthProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}