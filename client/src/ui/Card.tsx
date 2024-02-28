import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

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

    const [isHover, setIsHover] = useState(false)

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
        <div
            className=" flex items-center justify-center cursor-pointer relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div
                className="bg-white w-80  shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer relative overflow-hidden "
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
                    className="absolute top-1 right-1 z-20 w-20  h-20 flex justify-end content-start "
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

            {/*Show theme of book*/}
            {cardProperties.subjects && cardProperties.subjects.length > 0 && (
                <div
                    className={`absolute top-0 bottom-0 ${isHover ? 'translate-x-60 min-h-80   w-80' : 'width-0  h-0'}  z-10  transform scale-105 duration-300 overflow-hidden`}
                >
                    <div className="p-10 relative">
                        <div className="bg-white relative z-10 min-h-80 border-2 overflow-hidden">
                            <p className="pt-1">Thème : </p>

                            <ul>
                                {cardProperties?.subjects.map((subject) => {
                                    return (
                                        <li className="text-left p-1">
                                            {'- ' + subject.replace(/--/g, '')}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="absolute top-0 left-5 flex items-center h-full">
                            <div className="w-10 h-10 bg-white transform rotate-45 m-auto border-2 "></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Card
