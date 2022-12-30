import React from 'react'

interface ContainerProps {
    children: JSX.Element
    tailWindClass?: string
}

const Container = ({children, tailWindClass} : ContainerProps) => {
  return (
    <div className={`container mx-auto ${tailWindClass}`}>
    {children}
    </div>
  )
}

export default Container