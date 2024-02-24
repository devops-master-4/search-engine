import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../utils/axiosApi'
import { AxiosResponse } from 'axios'
import { ReactReader } from 'react-reader'
const Read = () => {
    const location = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()
    const data = (location.state as BookProperties) || null
    const [loc, setLoc] = useState<string | number>(0)

    useEffect(() => {
        if (!data) {
            return navigate('/')
        }
    }, [data, navigate])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `http://localhost:8080/api/ebooks/1669`,
                    {
                        responseType: 'blob',
                    }
                )

                const blob = new Blob([response.data])
                const url = URL.createObjectURL(blob)

                console.log(url)
            } catch (error) {
                console.error('Error fetching ebook:', error)
            }
        }

        //fetchData()
    }, [])

    const loadingEpub = () => {
        return (
            <div className="flex items-center space-x-2 justify-center content-center w-full h-screen font-bold">
                <div aria-label="Loading..." role="status">
                    <svg
                        width="48"
                        height="48"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                    url={'http://localhost:8080/api/ebooks/' + id}
                    epubInitOptions={{
                        openAs: 'epub',
                    }}
                    location={loc}
                    showToc={true}
                    loadingView={loadingEpub()}
                    locationChanged={(epubcfi: string) => setLoc(epubcfi)}
                    swipeable={true}
                />
            </div>
        </>
    )
}

export default Read
