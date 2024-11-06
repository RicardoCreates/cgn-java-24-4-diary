import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';

function Main() {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App toggleTheme={toggleTheme} />
                </BrowserRouter>
            </ThemeProvider>
        </StrictMode>
    );
}

createRoot(document.getElementById('root')!).render(<Main />);