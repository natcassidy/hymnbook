import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Hymn from '../../models/hymn';

const HymnDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hymn, setHymn] = useState(null);

  useEffect(() => {
    const fetchHymn = async () => {
      if (id) {
        const db = getFirestore();
        const hymnRef = doc(db, 'hymns', id);
        const hymnSnapshot = await getDoc(hymnRef);

        if (hymnSnapshot.exists()) {
          const hymnData = Hymn.fromFirestore(hymnSnapshot);
          setHymn(hymnData);
        }
      }
    };

    fetchHymn();
  }, [id]);

  if (!hymn) {
    return (
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold mb-4">{hymn.title}</h2>
        <div className="bg-white shadow-md rounded-md p-4">
          <p className="text-gray-800 whitespace-pre-wrap">{hymn.lyrics}</p>
          {hymn.audioUrl && (
            <audio controls className="mt-4">
              <source src={hymn.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HymnDetails;