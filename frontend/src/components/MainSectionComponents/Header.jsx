import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const host = process.env.REACT_APP_BACKEND_HOST;

function Header() {
    let navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}`);
            } catch (error) {
                console.error('Some error occured:', error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background px-4 py-3 shadow-sm md:px-6 md:py-4" style={{ backgroundColor: '#EBD96B' }}>
            <div className="container mx-auto flex max-w-7xl items-center justify-between">
                <a className="flex items-center gap-2" href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                    >
                        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
                    </svg>
                    <span className="text-xl font-bold">Creatorships</span>
                </a>
                <nav className="hidden items-center gap-4 md:flex">
                    <a className="text-sm font-medium hover:underline" href="/businesses">
                        Businesses
                    </a>
                    <a className="text-sm font-medium hover:underline" href="/creators">
                        Creators
                    </a>
                    <a className="text-sm font-medium hover:underline" href="/about">
                        About
                    </a>
                    <a className="text-sm font-medium hover:underline" href="/contact">
                        Contact
                    </a>
                    <a className="text-sm font-medium hover:underline" href="/other-businesses">
                    Other Businesses
                    </a>
                </nav>
                {!localStorage.getItem('token') ?
                    <div className="flex items-center gap-2">
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            onClick={() => window.location.href = '/signin'}>
                            Sign In
                        </button>

                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
                            onClick={() => window.location.href = '/signup'}>
                            Sign Up
                        </button>
                    </div> :
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
                        onClick={handleLogout}>
                        Logout
                    </button>
                }
            </div>
        </header>
    );
}

export default Header;
