import { useCallback, useEffect, useState } from "react"
import { createGlobalStyle, DefaultTheme, ThemeProvider } from "styled-components"

declare module 'styled-components' {
    export interface DefaultTheme {
        name: string, 
        radius: string, 
        switch: VoidFunction, 
        colors,
    }
}

const CommonTheme = {
    switch: () => { },
    radius: '5px',
}

const lightTheme: DefaultTheme = {
    name: 'light',
    ...CommonTheme,
    colors: {
        background: 'linear-gradient(100deg, #ebc8eb, #bea9cf)',
        backgroundSingle: '#a692b6',
        backgroundDark: 'linear-gradient(100deg, rgb(106, 7, 160), rgb(64, 11, 77))',
        btn: 'linear-gradient( 100deg, rgb(106, 7, 160), rgb(64, 11, 77))',
        border: 'purple',
        borderLight: 'grey',
        outlineBtnText: 'indigo',
        selectedItem: '',
        text: 'black',
        reverseText: 'white',
    }
}

const darkTheme: DefaultTheme = {
    name: 'dark',
    ...CommonTheme,
    colors: {
        background: 'linear-gradient( 100deg, rgb(106, 7, 160), rgb(64, 11, 77))',
        backgroundLight: 'linear-gradient(to right bottom, rgb(159 32 228), rgb(154 84 171))',
        btn: 'linear-gradient( 100deg, rgb(106, 7, 160), rgb(64, 11, 77))',
        border: 'white',
        borderLight: 'white',
        outlineBtnText: 'indigo',
        selectedItem: '',
        text: 'white',
        reverseText: 'black',
    }
}

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;   
        label{
            cursor: pointer;
        }
        [type=checkbox]{
            margin-right: 0.5rem;
        }
        textarea{
            resize: none;
        }
        a{
            text-decoration: none;
            color: inherit;
        }
        svg{
            cursor: pointer;
            font-size: 1.5rem;
        }
        font-style: italic;
    }
    body{
        height: 100vh;
        background:  ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text}
    }
`

const currentTheme = () => {
    return localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme
}


const Theme = ({ children }) => {
    const [theme, setTheme] = useState(currentTheme())
    const _switch = useCallback(
        () => {
            let _theme = currentTheme().name === 'dark' ? lightTheme : darkTheme;
            setTheme(_theme)
        },
        []
    )

    useEffect(() => {
        theme.switch = _switch;
        localStorage.setItem('theme', theme.name)
    }, [theme])

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    )
}

export default Theme;