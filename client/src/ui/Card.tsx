import { useNavigate } from 'react-router-dom'
import React from 'react'

type CarProps = {
    cardProperties: BookProperties
    isDeletable?: boolean
    continueReading?: BookProperties[] | null
    setContinueReading?: React.Dispatch<BookProperties[]>
}
const Card = ({
    cardProperties,
    isDeletable,
    continueReading,
    setContinueReading,
}: CarProps) => {
    const userbooks = localStorage.getItem('user_books')
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/read/' + cardProperties._id, {
            state: cardProperties,
        })
    }

    const deleteBook = (id: string) => {
        const books = (userbooks && userbooks?.split(',')) || []
        const newBooks = books?.filter((book) => book !== id)

        localStorage.setItem('user_books', newBooks?.join(','))

        if (continueReading && setContinueReading) {
            const newReadingBooks: BookProperties[] = continueReading?.filter(
                (book) => book._id !== id
            )

            setContinueReading(newReadingBooks)
        }
    }

    return (
        <div className=" flex items-center justify-center cursor-pointer relative">
            <div
                className="bg-white w-80 overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer"
                onClick={() => handleNavigate()}
            >
                <div className="relative  lg:h-100 xs:h-96 ">
                    <img
                        className="w-full  h-3/4"
                        src={cardProperties.covers}
                        alt={cardProperties.title}
                    />
                    <p className="w-full h-auto m-auto  pl-1 pr-1 text-black  text-center">
                        {cardProperties.title}
                    </p>
                </div>
            </div>
            {isDeletable && (
                <div
                    className="absolute top-1 right-1 z-10 w-20  h-20 flex justify-end content-start "
                    onClick={() => deleteBook(cardProperties._id)}
                >
                    <div>
                        <svg
                            className="h-8 w-8 text-red-700 hover:scale-110 hover:shadow-2xl transform duration-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Card
