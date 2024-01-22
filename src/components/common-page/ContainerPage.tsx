import React, { ReactNode } from 'react'

interface ContainerPageProps {
    customStyle?: string;
    children: ReactNode;
}

export const ContainerPage: React.FC<ContainerPageProps> = ({customStyle, children}) => {
  return (
    <div className={`${customStyle ? customStyle : ""} container mx-auto mt-20 mb-24 px-28`}>
        <div className='py-0 px-10'>
        {children}
        </div>
    </div>
  )
}
