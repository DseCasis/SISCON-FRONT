import React from 'react';
import axios from "axios";
import Cookies from "js-cookie";

export const  API_URL = "http://localhost:8000/api";

export const URL_ADD_CIVIL = 'http://localhost:8000/api/addCivilianPersonnel';
export const URL_ADD_MILITARY = 'http://localhost:8000/api/addMilitaryPersonal';
export const URL_RANK = 'http://localhost:8000/api/getRank';
export const URL_UNIT = 'http://localhost:8000/api/getUnit';
export const URL_MILITARY_PERSONNEL = 'http://localhost:8000/api/getAllMilitaryPersonal';
export const URL_LOCATION = 'http://localhost:8000/api/getLocation';
export const URL_VEHICLE_BRAND = 'http://localhost:8000/api/getVehicleBrand';
export const URL_VEHICLE_TYPE = 'http://localhost:8000/api/getVehicleType';
export const URL_ADD_MILITARY_VEHICLE = 'http://localhost:8000/api/addMilitaryVehicle';
export const URL_ADD_CIVIL_VEHICLE = 'http://localhost:8000/api/addCivilVehicle';
export const URL_CIVIL_PERSONNEL = 'http://localhost:8000/api/getAllCivilianPersonnel';
export const URL_VEHICLE_LIST = 'http://localhost:8000/api/getAllVehicles';
export const URL_MILITARY_VEHICLE = 'http://localhost:8000/api/getAllMilitaryVehicle';
export const URL_CIVIL_VEHICLE = 'http://localhost:8000/api/getAllCivilVehicle';


const fetchWithAuth = async (url, options = {}) => {
    const token = Cookies.get('auth_token'); // Obtener el token de las cookies

    // Si no hay token, no puedes hacer la solicitud
    if (!token) {
        throw new Error('No token found. Please login first.');
    }

    // Agregar el token en la cabecera de la solicitud
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers, // Agregar otros encabezados si es necesario
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const data = await response.json();

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
        throw new Error(data.message || 'Error making the request');
    }

    return data;
};
// Función para obtener el personal militar
export const fetchMilitaryPersonnel = async () => {
    try {
        const response = await axios.get(`${API_URL}/militaryPersonnel`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener personal militar:', error);
        throw error;
    }
};

// Función para obtener el personal civil
export const fetchCivilPersonnel = async () => {
    try {
        const response = await axios.get(`${API_URL}/civilPersonnel`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener personal civil:', error);
        throw error;
    }
};

// Función para obtener los vehículos civiles
export const fetchCivilVehicles = async () => {
    try {
        const response = await axios.get(`${API_URL}/civilVehicles`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener vehículos civiles:', error);
        throw error;
    }
};