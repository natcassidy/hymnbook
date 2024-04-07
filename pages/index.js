import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold mb-4">Welcome to Hymnbook</h2>
        <p className="text-gray-700">Browse and search for your favorite hymns.</p>
      </div>
    </Layout>
  );
}