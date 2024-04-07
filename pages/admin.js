import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth, db } from "../firebase"

const AdminDashboard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hymn, setHymn] = useState({ title: '', lyrics: '', audioUrl: '' });
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkUserRole = async () => {
            if (isLoggedIn) {
                const auth = getAuth();
                const user = auth.currentUser;
                const role = await getUserRole(user.uid);
                setUserRole(role);
            }
        };
        checkUserRole();
    }, [isLoggedIn]);

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         setIsLoading(true);
    //         await signInWithEmailAndPassword(auth, email, password);
    //         setIsLoggedIn(true);
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error('Login error:', error);
    //         setError(true);
    //         setIsLoading(false);
    //     }
    // };

    // const handleSignup = async (e) => {
    //     e.preventDefault();
    //     const auth = getAuth();
    //     try {
    //         setIsLoading(true);
    //         await createUserWithEmailAndPassword(auth, email, password);
    //         setIsLoggedIn(true);
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error('Signup error:', error);
    //         setError(true);
    //         setIsLoading(false);
    //     }
    // };

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            setIsLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    role: 'user',
                });
            }
            setIsLoggedIn(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Google sign-in error:', error);
            alert("Error signing in");
            setError(true);
            setIsLoading(false);
        }
    };

    const getUserRole = async (userId) => {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return userDoc.data().role;
        }
        return null;
    };

    const handleInputChange = (e) => {
        setHymn({ ...hymn, [e.target.name]: e.target.value });
    };

    const handleAddHymn = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        try {
            await addDoc(collection(db, 'hymns'), hymn);
            setHymn({ title: '', lyrics: '', audioUrl: '' });
        } catch (error) {
            console.error('Error adding hymn:', error);
        }
    };

    const handleUpdateHymn = async (e, hymnId) => {
        e.preventDefault();
        const db = getFirestore();
        try {
            await updateDoc(doc(db, 'hymns', hymnId), hymn);
            setHymn({ title: '', lyrics: '', audioUrl: '' });
        } catch (error) {
            console.error('Error updating hymn:', error);
        }
    };

    const handleDeleteHymn = async (hymnId) => {
        const db = getFirestore();
        try {
            await deleteDoc(doc(db, 'hymns', hymnId));
        } catch (error) {
            console.error('Error deleting hymn:', error);
        }
    };

    // const buttonContent = (
    //     <span className="inline-flex items-center justify-center min-w-[70px] min-h-[20px]">
    //         {isLoading && (
    //             <div className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
    //                 <span className="sr-only">Loading...</span>
    //             </div>
    //         )}
    //         {!isLoading && 'Sign In'}
    //     </span>
    // );

    if (!isLoggedIn) {
        return (
            <Layout>
                <div className="px-4 py-6 sm:px-0">
                    {/* <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            {buttonContent}
                        </button>
                    </form> */}
                    <div className="mt-4">
                        <button type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" onClick={handleGoogleSignIn}>
                            <svg class="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                    {error && (
                        <div className="mt-4 text-red-500">
                            Error signing in. Please check your credentials.
                        </div>
                    )}
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
            {userRole !== "admin" ? (
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p>You do not have permission to access the admin dashboard.</p>
                </div>
            ) : (
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                    <form onSubmit={handleAddHymn}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={hymn.title}
                            onChange={handleInputChange}
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                            name="lyrics"
                            placeholder="Lyrics"
                            value={hymn.lyrics}
                            onChange={handleInputChange}
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
                        ></textarea>
                        <input
                            type="text"
                            name="audioUrl"
                            placeholder="Audio URL"
                            value={hymn.audioUrl}
                            onChange={handleInputChange}
                            className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Add Hymn
                        </button>
                    </form>
                </div>
            )}
        </Layout>
    );
};

export default AdminDashboard;