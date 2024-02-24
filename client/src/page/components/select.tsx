import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { optionSelected } from '../../types/search'
import { initialOptions } from '../../utils/constants'

type optionsProperties = {
    optionSelected: optionSelected[]
    setOptionSelected: Dispatch<optionSelected[]>
}

const Dropdown = ({ optionSelected, setOptionSelected }: optionsProperties) => {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const addOption = (option: optionSelected) => {
        const newSelectedOption = optionSelected.filter(
            (o) => o.selected !== option.selected
        )
        option.selected = true

        newSelectedOption.push(option)
        setOptionSelected(newSelectedOption)
    }

    const removeOption = (option: optionSelected) => {
        option.selected = false

        const indexOptionSelected = optionSelected.findIndex(
            (o) => o.selected === option.selected
        )
        const newSelectedOption = optionSelected.filter(
            (o) => o.selected !== option.selected
        )

        if (indexOptionSelected >= 0) {
        }

        setOptionSelected(newSelectedOption)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains((event.target as Node) || null)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div
            className="relative inline-block text-left  min-w-80"
            ref={dropdownRef}
        >
            <button
                type="button"
                className="inline-flex  justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="dropdown-button"
                onClick={() => toggleDropdown()}
                aria-haspopup="true"
                aria-expanded="true"
            >
                {optionSelected.length > 0 && (
                    <div className="grid lg:grid-cols-4 xs:grid-cols-2">
                        {optionSelected.map((item) => (
                            <div className="border border-amber-100 p-2 m-2 flex flex-row rounded-full min-w-20">
                                <div className="h-5">{item.name}</div>

                                <button
                                    className={`w-5 h-5 ml-1 rounded-full bg-blue-500 text-white flex items-center justify-center ${!isOpen ? 'hover:bg-amber-500' : ''}`}
                                    onClick={() => removeOption(item)}
                                >
                                    <svg
                                        className="w-4/5 h-auto"
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 50 50"
                                    >
                                        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {optionSelected.length === 0 && <p>Recherche avancée</p>}
                <div className="absolute right-0   mt-auto mb-auto ">
                    <svg
                        className="h-5 w-10"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className="absolute bottom-[-1]  h-auto left-0 right-0 m-auto bg-white border-l-2 border-r-2 border-b-2  z-10 p-3">
                    {initialOptions.map((option) => {
                        return (
                            <div
                                key={option.name}
                                className="relative"
                                onClick={() =>
                                    !option.selected && addOption(option)
                                }
                            >
                                <div className="cursor-pointer pt-3">
                                    {option.name}
                                </div>
                                {option.selected && (
                                    <div className="absolute right-0 top-0  mt-auto mb-auto">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            width="24"
                                            height="24"
                                            viewBox="0,0,256,256"
                                        >
                                            <g
                                                fill="#2456c3"
                                                fillRule="nonzero"
                                                stroke="none"
                                                strokeWidth="1"
                                                strokeLinecap="butt"
                                                strokeLinejoin="miter"
                                                strokeMiterlimit="10"
                                                strokeDasharray=""
                                                strokeDashoffset="0"
                                                fontFamily="none"
                                                fontWeight="none"
                                                fontSize="none"
                                                textAnchor="none"
                                            >
                                                <g transform="scale(5.33333,5.33333)">
                                                    <path d="M40.6,12.1l-23.6,23.6l-9.6,-9.6l-2.8,2.9l12.4,12.3l26.4,-26.4z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Dropdown
