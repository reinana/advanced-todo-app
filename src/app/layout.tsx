import Footer from "./Footer";
import Header from "./Header";
import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Advanced Todo App",
    description: "TODO管理機能のついたカレンダーアプリです",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className="container mx-auto bg-indigo-900 text-slate-50 flex flex-col min-h-screen ">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                
            </body>
        </html>
    );
}
