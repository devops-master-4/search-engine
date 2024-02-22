import React, { ReactNode } from 'react'

type GridProperties = {
    children: ReactNode
}
const Grid = ({ children, ...props }: GridProperties) => {
    return (
        <div
            className={`grid 2xl:grid-cols-8 xl:grid-cols-6  lg:grid-cols-6 gap-10 p-5 md:grid-cols-4 xs:grid-cols-1 ${props}`}
        >
            {children}
        </div>
    )
}

export default Grid
