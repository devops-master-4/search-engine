import { useNavigate } from 'react-router-dom'

const Card = ({ cardProperties }: { cardProperties: BookProperties }) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/read/' + cardProperties._id, {
            state: cardProperties,
        })
    }

    return (
        <div
            className=" flex items-center justify-center cursor-pointer"
            onClick={() => handleNavigate()}
        >
            <div className="bg-white w-80 overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer">
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
        </div>
    )
}

export default Card
