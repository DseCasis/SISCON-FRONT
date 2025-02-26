import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importar iconos de sol y luna

const ThemeToggle = () => {
    const [darkTheme, setDarkTheme] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setDarkTheme(true);
        } else {
            setDarkTheme(false);
        }
    }, []);

    useEffect(() => {
        if (darkTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkTheme]);

    const toggleTheme = () => {
        setDarkTheme(prevTheme => !prevTheme);
    };

    return (
        <div className="theme-toggle fixed top-4 right-4">
            <button
                className={`theme-button flex items-center justify-center w-10 h-10 rounded-full ${darkTheme ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
                onClick={toggleTheme}
            >
                {darkTheme ? <FaSun /> : <FaMoon />}
            </button>
        </div>
    );
};

export default ThemeToggle;