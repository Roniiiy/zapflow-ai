import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZapFlow AI",
  description: "Funcionário IA para WhatsApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}