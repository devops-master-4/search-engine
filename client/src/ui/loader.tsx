import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center space-x-2 justify-center content-center w-full h-screen font-bold">
            <div aria-label="Loading..." role="status">
                <svg
                    width="48"
                    height="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin w-3/5 h-4/5 stroke-slate-500"
                >
                    <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
                </svg>
            </div>
            <span className="text-2xl font-medium text-slate-500">
                Loading...
            </span>
        </div>
    )
}

export default Loader
