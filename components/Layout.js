import Head from 'next/head';
import Link from "next/link"

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Hymnbook App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Hymnbook</h1>
                    <nav className="mt-4">
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/">
                                    <button className="text-gray-600 hover:text-gray-800">Home</button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/hymns">
                                    <button className="text-gray-600 hover:text-gray-800">Hymns</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} Hymnbook App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;