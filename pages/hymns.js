import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getHymns } from '../firebase/firestore';
import Link from "next/link"

const HymnList = () => {
    const [hymns, setHymns] = useState([]);

    useEffect(() => {
        const fetchHymns = async () => {
            const hymnsData = await getHymns();
            setHymns(hymnsData);
        };

        fetchHymns();
    }, []);

    return (
        <Layout>
            <div className="px-4 py-6 sm:px-0">
                <h2 className="text-2xl font-bold mb-4">Hymn List</h2>
                <ul className="space-y-4">
                    {hymns.map(hymn => (
                        <li key={hymn.id} className="bg-white shadow-md rounded-md p-4">
                            <Link href={`/hymns/${hymn.id}`}>
                                <button>
                                    <h3 className="text-xl font-semibold">{hymn.title}</h3>
                                    <p className="text-gray-600">{hymn.lyrics.slice(0, 100)}...</p>
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default HymnList;