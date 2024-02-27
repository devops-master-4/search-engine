import React, { useEffect, useState } from 'react'

import Card from '../ui/Card'
import PopUpMessage from '../ui/PopUpMessage'
import Grid from '../ui/Grid'

import Dropdown from './components/select'
import { fetchBooks, optionsEnumTranslated } from '../utils/constants'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../ui/loader'

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    //const navigate = useNavigate()
    const userBooks: string | null = localStorage.getItem('user_books')

    const [optionSelected, setOptionSelected] = useState<optionSelected[]>([])

    const [popUp, setPopup] = useState<MessageProperties | undefined>(undefined)

    const [advanceSearch, setAdvancedSearch] = useState(false)

    const [isFetching, setIsFetching] = useState(false)

    const [bookSearched, setSearchedBook] = useState<BookProperties[] | null>(
        null
    )

    const [mostDownloaded, setMostDownloaded] = useState<
        BookProperties[] | null
    >(null)

    const [suggestions, setSuggestions] = useState<BookProperties[] | null>(
        null
    )

    const [suggestedByReading, setSuggestedByReading] = useState<
        BookProperties[] | null
    >(null)

    const [booksByGenre, setBooksByGenre] = useState<BookProperties[] | null>(
        null
    )

    const [continueReading, setContinueReading] = useState<
        BookProperties[] | null
    >(null)

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const onToggle = () => {
        setOptionSelected([])
        setAdvancedSearch(!advanceSearch)
    }

    useEffect(() => {
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

        const simpleSearch = async () => {
            const response = await fetchBooks('search?query=' + searchValue)

            if (!response) {
                setIsFetching(false)
            }

            if (response) {
                setSearchedBook(response)
                setIsFetching(false)
            }
        }

        const advancedSearch = async () => {
            const data = {
                value: searchValue,
                options: getTranslatedOptions(),
            }

            const response = await fetchBooks('regex_search', 'POST', data)

            if (!response) {
                setIsFetching(false)
            }

            if (response) {
                setSearchedBook(response)
                setIsFetching(false)
            }
        }

        const handleSearch = async () => {
            if (searchValue === '') {
                setIsFetching(false)
                return toast.error('La recherche ne peut pas être vide')
            }

            if (optionSelected.length > 0) {
                return await advancedSearch()
            }

            return await simpleSearch()
        }

        if (isFetching) handleSearch().catch(/**/)
    }, [isFetching, optionSelected, searchValue])

    useEffect(() => {
        if (advanceSearch) toast.error('Regex activé!')
    }, [advanceSearch])

    useEffect(() => {
        const fetch = async () => {
            if (suggestions === null)
                setSuggestions(await fetchBooks('random_books'))
            if (mostDownloaded === null)
                setMostDownloaded(await fetchBooks('most_downloaded'))
            if (!!userBooks && continueReading === null)
                setContinueReading(
                    await fetchBooks('continue_reading?book_id=' + userBooks)
                )

            if (suggestedByReading === null && !!userBooks) {
                console.log(userBooks)
                setSuggestedByReading(
                    await fetchBooks('suggestions?book_id=' + userBooks)
                )
            }
        }

        fetch().catch(/**/)
    }, [
        continueReading,
        mostDownloaded,
        suggestedByReading,
        suggestions,
        userBooks,
    ])

    /*useEffect(() => {
        const fetchReading = async () => {
            const response = await fetchBooks(
                'continue_reading?book_id=' + userBooks
            )

            setContinueReading(response)
        }

        if (userBooks && continueReading === null) fetchReading().catch()
    }, [continueReading, userBooks])*/

    useEffect(() => {
        const fetchBooksByGenre = async () => {
            const response = await fetchBooks('books_by_genre')
            setBooksByGenre(response)
        }
        fetchBooksByGenre().catch(/**/)
    }, [])

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
            <div className="relative ">
                {formControl()}

                <PopUpMessage setMessage={setPopup} message={popUp} />

                {advanceSearch && (
                    <Dropdown
                        optionSelected={optionSelected}
                        setOptionSelected={setOptionSelected}
                    />
                )}

                {bookSearched && (
                    <div className="mt-10">
                        <h3 className="text-left pl-10 font-bold text-xl">
                            Résultat de votre recherche
                        </h3>

                        {isFetching && <Loader />}
                        {!isFetching && (
                            <>
                                <Grid>
                                    {bookSearched &&
                                        bookSearched.map((c) => {
                                            return (
                                                <Card
                                                    cardProperties={c}
                                                    key={c._id}
                                                />
                                            )
                                        })}
                                </Grid>

                                {/* Empty results*/}
                                {bookSearched && bookSearched.length === 0 && (
                                    <div>
                                        <h4>
                                            Aucun résultat... essayez la
                                            recherche avancée
                                        </h4>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* Most popular books*/}
                <div className="mt-10">
                    <h3 className="text-left pl-10 font-bold text-xl">
                        Les plus populaires
                    </h3>
                    <Grid>
                        {mostDownloaded?.map((c) => {
                            return <Card cardProperties={c} key={c._id} />
                        })}
                    </Grid>
                </div>

                {/* Suggestions to users based on his previous reading or random books suggested*/}
                <div className="mt-10">
                    <h3 className="text-left pl-10 font-bold text-xl">
                        {suggestions && suggestions[0].theme}
                    </h3>
                    <Grid>
                        {suggestions?.map((c) => {
                            return <Card cardProperties={c} key={c._id} />
                        })}
                    </Grid>
                </div>

                {/* Random  book by subjects */}
                <div className="mt-10">
                    <h3 className="text-left pl-10 font-bold text-xl">
                        {booksByGenre && booksByGenre[0].theme}
                    </h3>

                    <Grid>
                        {booksByGenre?.map((c) => {
                            return <Card cardProperties={c} key={c._id} />
                        })}
                    </Grid>
                </div>

                {/* What user has read */}
                <div className="mt-10">
                    <h3 className="text-left pl-10 font-bold text-xl">
                        Continuer la lecture
                    </h3>
                    {!!userBooks && (
                        <Grid>
                            {continueReading?.map((c) => {
                                return (
                                    <Card
                                        cardProperties={c}
                                        key={c._id}
                                        isDeletable={true}
                                        continueReading={continueReading}
                                        setContinueReading={setContinueReading}
                                    />
                                )
                            })}
                        </Grid>
                    )}
                    {!userBooks && (
                        <p className="pt-20">Vous n'avez encore rien lu..</p>
                    )}
                </div>

                {/* Suggested to user based on his reading */}
                {!!userBooks && (
                    <div className="mt-10">
                        <h3 className="text-left pl-10 font-bold text-xl">
                            Parce que vous avez lu récemment...
                        </h3>

                        <Grid>
                            {suggestedByReading?.map((c) => {
                                return <Card cardProperties={c} key={c._id} />
                            })}
                        </Grid>
                    </div>
                )}
            </div>
            <ToastContainer position="bottom-right" />
        </>
    )
}

export default Search
