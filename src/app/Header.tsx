import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <header className="p-6 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-extrabold">
                    <Link href="/">Advanced Todo App</Link>
                </h1>
            </div>
            <div>
                <nav className="text-sm font-medium">
                    <Link href="/articles/new" className="bg-slate-300 px-3 py-3 rounded-md">ログアウト</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;