import { useNavigate } from 'react-router-dom'
import { BookProperties } from '../types/search'

const Card = ({ cardProperties }: { cardProperties: BookProperties }) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/read/' + cardProperties.id, {
            state: cardProperties,
        })
    }

    return (
        <div
            className=" flex items-center justify-center cursor-pointer"
            onClick={() => handleNavigate()}
        >
            <div className="bg-white  overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer">
                <div className="relative lg:h-80 h-96">
                    <img
                        className="w-full  h-3/4"
                        src={cardProperties.bookCover}
                    />
                    <p className="w-full h-1/4     m-auto text-black p-3 text-center">
                        {cardProperties.title}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card
