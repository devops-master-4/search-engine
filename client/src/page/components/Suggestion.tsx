import { useEffect, useState } from 'react'

type SuggestionProperties = {
    style?: string
}
const Suggestion = ({ style, ...props }: SuggestionProperties) => {
    useEffect(() => {}, [style])

    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <div className={`${style}`}>
                <button onClick={() => setIsVisible(!isVisible)}>
                    <svg
                        className="h-8 w-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        height={24}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            {/* Suggestions */}

            <div
                className={`absolute top-0 right-0   inline-block bg-amber-50`}
            >
                <div
                    className={`fixed  top-0  right-0 pt-20 pl-5 pr-5 lg:w-1/5 md:w-1/5 xs:w-full   z-10 bg-amber-50 h-full ${isVisible ? '' : 'translate-x-full'} transition ease-in delay-300`}
                >
                    <div className="pt-40">pour vous</div>
                </div>
            </div>
        </>
    )
}

export default Suggestion
