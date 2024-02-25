import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ReactReader } from 'react-reader'
import { toast, ToastContainer } from 'react-toastify'

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

            if (response.status >= 400)
                setError("Une erreur s'est produite lors de la requête!")

            return await response.blob()
        } catch (error) {
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
        return (
            <div className="flex items-center space-x-2 justify-center content-center w-full h-screen font-bold">
                <div aria-label="Loading..." role="status">
                    <svg
                        width="48"
                        height="48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-spin w-3/5 h-4/5 stroke-slate-500"
                    >
                        <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
                    </svg>
                </div>
                <span className="text-2xl font-medium text-slate-500">
                    Loading...
                </span>
            </div>
        )
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
