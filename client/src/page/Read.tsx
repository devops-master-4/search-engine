import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ReactReader } from 'react-reader'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../ui/loader'

const Read = () => {
    const location = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()
    const data = (location.state as BookProperties) || null
    const [loc, setLoc] = useState<string | number>(0)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (!data) {
            return navigate('/')
        }
    }, [data, navigate])

    const requestMethod = async (
        url: string,
        type: string,
        withCredentials: boolean,
        headers: Headers | undefined
    ): Promise<object> => {
        const requestOptions = new Headers()
        requestOptions.append('no-cors', 'true')

        const requestOptionsObject: RequestInit = {
            method: type,
            headers: requestOptions,
            credentials: withCredentials
                ? 'include'
                : ('same-origin' as RequestCredentials),
        }

        try {
            const response = await fetch(url, requestOptionsObject)

            if (response.status >= 400) {
                setError("Une erreur s'est produite lors de la requête!")
            }

            return await response.blob()
        } catch (error) {
            console.log(error)
            setError("Une erreur s'est produite lors de la requête!")
        }

        return {}
    }

    useEffect(() => {
        if (error !== '') {
            toast.error(error)
        }

        return
    }, [error])

    const loadingEpub = () => {
        if (error !== '') return null
        let userBooks = localStorage.getItem('user_books')

        if (!userBooks) {
            localStorage.setItem('user_books', id as string)
        } else {
            if (!userBooks.split(',').includes(id as string)) {
                userBooks += (',' + id) as string
                localStorage.setItem('user_books', userBooks)
            }
        }

        return <Loader />
    }

    return (
        <>
            <div className="h-screen">
                <ReactReader
                    url={`http://localhost:5000/download_epub?book_id=${id}`}
                    epubInitOptions={{
                        openAs: 'epub',
                        requestMethod: (url, type, withCredentials, headers) =>
                            requestMethod(url, 'GET', false, undefined),
                    }}
                    location={loc}
                    showToc={true}
                    loadingView={loadingEpub()}
                    locationChanged={(epubcfi: string) => setLoc(epubcfi)}
                    swipeable={true}
                />
            </div>
            <ToastContainer position="top-right" />
        </>
    )
}

export default Read
