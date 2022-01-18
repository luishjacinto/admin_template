import { createContext, useState, useEffect } from "react";

interface AppContextProps {
    theme: string
    changeTheme?: () => void
}

const AppContext = createContext<AppContextProps>({
    theme: null
})

export function AppProvider(props){
    const [theme, setTheme] = useState('')

    useEffect(() => {
        const savedTheme = window.localStorage.getItem('theme') ?? ''
        setTheme(savedTheme)
    }, [])

    function changeTheme() {
        const changedTheme = theme === '' ? 'dark' : ''
        window.localStorage.setItem('theme', changedTheme)
        setTheme(changedTheme)
    }

    return (
        <AppContext.Provider value={{
            theme,
            changeTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext