import React, { ReactNode } from 'react'

type FlexProperties = {
    children: ReactNode
    center?: boolean
}
const Flex = ({ children, center = false, ...props }: FlexProperties) => {
    return (
        <div
            className={`flex lg:flex-row flex-wrap xs:flex-col p-5 ${center ? 'justify-center' : 'justify-items-start'} ${props}`}
        >
            {children}
        </div>
    )
}

export default Flex
