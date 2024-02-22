import React, { useState, useEffect } from 'react'

export type MessageProperties = {
    type: 'Error' | 'Success' | 'Information'
    message: string
}

const enumTypeMessage = {
    Error: 'bg-red-100 border border-red-400 text-red-700',
    Success: 'bg-green-100 border border-green-400 text-green-700',
    Information: 'bg-blue-100 border border-blue-400 text-blue-700 ',
}

const PopUpMesage = (messageProps: MessageProperties | undefined) => {
    const [isVisible, setIsVisible] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        if (messageProps?.message !== '') {
            setIsVisible(true)
        }
    }, [messageProps])

    return (
        <>
            <div
                className={`fixed z-50 top-0 left-0 right-0 flex justify-center  ${!isVisible ? '-translate-y-full ' : 'translate-y-6'} transition ease-in delay-300`}
            >
                <div
                    className={`${messageProps && enumTypeMessage[messageProps.type]} p-4 rounded lg:w-full mx-3 md:w-6/12 xs:w-full m-auto  relative`}
                >
                    <span className="block sm:inline">
                        {messageProps?.message}
                    </span>
                    <button
                        className="absolute top-0 right-0 px-4 py-3"
                        onClick={() => setIsVisible(false)}
                    >
                        <svg
                            className="fill-current h-6 w-6 text-red-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default PopUpMesage
