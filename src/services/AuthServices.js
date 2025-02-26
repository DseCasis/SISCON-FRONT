import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = 'http://localhost:8000/api';

export const setToken = (newToken) => {
    Cookies.set('authToken', newToken, { // Usa newToken sin comillas
        expires: 1, // Expira en 1 día
        sameSite: 'Lax', // 🔥 Prueba con 'Lax' en lugar de 'None'
        secure: false, // 🔥 Solo usar en desarrollo
    });
};

export const getToken = () => {
    return Cookies.get('authToken');
};

export const removeToken = () => {
    Cookies.remove('authToken');
};

export const isAuthenticated = () => {
    const token = getToken(); // Obtén el token de las cookies
    return !!token; // Devuelve true si el token existe, false si no
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data)
        const { authToken } = response.data;

        // Guarda el token en las cookies
        setToken(authToken);

        return response.data;
    } catch (error) {
        throw error;
    }
};