import React, { createContext, useState, useContext } from 'react'

const ScrollContext = createContext()


export function ScrollProvider({ children }) {

    const [isHeroInView, setIsHeroInView] = useState(true)
    const [isInputInView, setIsInputInView] = useState(true)
    const [isInputVisible, setIsInputVisible] = useState(true)

    return (
        <ScrollContext.Provider value={{
            isHeroInView,
            setIsHeroInView,
            isInputInView,
            setIsInputInView,
            isInputVisible,
            setIsInputVisible

        }}>
            {children}
        </ScrollContext.Provider>
    )
}

export function useScrollContext() {
    return useContext(ScrollContext);
}