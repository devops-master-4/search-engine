import React, { useEffect, useState } from 'react'

import Card from '../ui/Card'
import PopUpMessage from '../ui/PopUpMessage'
import Grid from '../ui/Grid'

import { mockBooks } from '../assets/mockBooks'
import Dropdown from './components/select'
import { optionsEnumTranslated } from '../utils/constants'
import { axiosInstance } from '../utils/axiosApi'

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    //const navigate = useNavigate()

    const [optionSelected, setOptionSelected] = useState<optionSelected[]>([])

    const [popUp, setPopup] = useState<MessageProperties | undefined>(undefined)

    const [advanceSearch, setAdvancedSearch] = useState(false)

    const [isFetching, setIsFetching] = useState(false)

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const onToggle = () => {
        setOptionSelected([])
        setAdvancedSearch(!advanceSearch)
    }

    const getTranslatedOptions = (): string[] => {
        const optionsTranslated: string[] = []
        optionSelected.forEach((option) => {
            optionsTranslated.push(
                optionsEnumTranslated[
                    option.name as keyof OptionsEnumTranslated
                ]
            )
        })
        return optionsTranslated
    }

    useEffect(() => {
        const handleSearch = async () => {
            if (searchValue === '') {
                setIsFetching(false)
                return setPopup({
                    type: 'Error',
                    message: 'Le champs de recherche ne peut pas être vide',
                })
            }

            const response = await axiosInstance
                .get('https://react-icons.github.io/react-icons/icons/md/')
                .catch(() => {
                    setIsFetching(false)
                })

            if (response) {
                setTimeout(() => {
                    setIsFetching(false)
                }, 3000)
            }

            const body = {
                value: searchValue as string,
                options: getTranslatedOptions() as string[],
            }

            console.log(JSON.stringify(body))
        }

        if (isFetching) handleSearch()
    }, [getTranslatedOptions, isFetching, searchValue])

    const formControl = () => {
        return (
            <div className="flex flex-row justify-center content-center  w-full p-3">
                <div className="inline lg:w-1/2 md:w-1/2  xs:w-full m-3">
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>

                        <input
                            onChange={handleTextChange}
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Trouver un livre..."
                            required
                            value={searchValue}
                        />

                        <button
                            onClick={() => setIsFetching(true)}
                            disabled={isFetching}
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Recherche
                        </button>
                    </div>
                </div>

                <div className="mt-auto mb-auto inline">
                    <div>
                        <input
                            type="checkbox"
                            className="peer sr-only opacity-0"
                            id="toggle"
                            onChange={onToggle}
                            checked={advanceSearch}
                        />
                        <label
                            htmlFor="toggle"
                            className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                        >
                            <span className="sr-only">Enable</span>
                        </label>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <h1>Moteur de recherche</h1>
            {formControl()}
            {popUp && <PopUpMessage setMessage={setPopup} message={popUp} />}
            {advanceSearch && (
                <Dropdown
                    optionSelected={optionSelected}
                    setOptionSelected={setOptionSelected}
                />
            )}

            <Grid>
                {mockBooks.map((c) => {
                    return <Card cardProperties={c} key={c.id} />
                })}
            </Grid>
        </>
    )
}

export default Search
