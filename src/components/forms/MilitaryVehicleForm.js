"use client"

import React, { useEffect, useState } from "react";
import { URL_ADD_MILITARY_VEHICLE, URL_MILITARY_PERSONNEL, URL_LOCATION, URL_VEHICLE_BRAND, URL_VEHICLE_TYPE } from "../../services/PrivateServices";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "../Modal";

function MilitaryVehicleForm({ isOpen, onClose }) {
    const [militaryPersonnel, setMilitaryPersonnel] = useState([]);
    const [locations, setLocations] = useState([]);
    const [vehicleBrands, setVehicleBrands] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);

    // Obtener datos para los selectores
    useEffect(() => {
        const token = Cookies.get('authToken'); // Obtener el token almacenado en cookies

        if (!token) {
            console.error('No token found. Please login first.');
            return;
        }

        // Configuración común de los headers
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        // Obtener personal militar
        axios.get(URL_MILITARY_PERSONNEL, config)
            .then(response => {
                setMilitaryPersonnel(response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener personal militar:', error);
            });

        // Obtener ubicaciones
        axios.get(URL_LOCATION, config)
            .then(response => {
                setLocations(response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener ubicaciones:', error);
            });

        // Obtener marcas de vehículos
        axios.get(URL_VEHICLE_BRAND, config)
            .then(response => {
                setVehicleBrands(response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener marcas de vehículos:', error);
            });

        // Obtener tipos de vehículos
        axios.get(URL_VEHICLE_TYPE, config)
            .then(response => {
                setVehicleTypes(response.data.data);
            })
            .catch(error => {
                console.error('Error al obtener tipos de vehículos:', error);
            });

    }, []);

    const initialState = {
        vehicle_id: '',
        color: '',
        camp: '',
        military_personnel: '',
        location: '',
        vehicle_brand: '',
        vehicle_type: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const empty = {
            vehicle_idEmpty: formData.vehicle_id.trim() === '',
            colorEmpty: formData.color.trim() === '',
            campEmpty: formData.camp.trim() === '',
            military_personnelEmpty: formData.military_personnel.trim() === '',
            locationEmpty: formData.location.trim() === '',
            vehicle_brandEmpty: formData.vehicle_brand.trim() === '',
            vehicle_typeEmpty: formData.vehicle_type.trim() === '',
        };

        setFormData({ ...formData, ...empty });
        return Object.values(empty).some((empty) => empty);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const token = Cookies.get('authToken');

            // Convertir los valores a números
            const payload = {
                ...formData,
                military_personnel: Number(formData.military_personnel),
                location: Number(formData.location),
                vehicle_brand: Number(formData.vehicle_brand),
                vehicle_type: Number(formData.vehicle_type),
            };

            const response = await axios.post(URL_ADD_MILITARY_VEHICLE, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Respuesta del servidor:', response.data);

            setSuccess('¡El vehículo militar ha sido registrado correctamente!');
            setError('');

            setTimeout(() => {
                setFormData(initialState);
                setSuccess('');
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setError('Ocurrió un error al registrar el vehículo.');
            setSuccess('');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <h1 className="text-gray-500 text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Registro de Vehículo Militar
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campos del formulario */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Matricula:</label>
                        <input
                            type="text"
                            name="vehicle_id"
                            value={formData.vehicle_id}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color:</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Campo/Base:</label>
                        <input
                            type="text"
                            name="camp"
                            value={formData.camp}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Personal Militar:</label>
                        <select
                            name="military_personnel"
                            value={formData.military_personnel}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione...</option>
                            {Array.isArray(militaryPersonnel) && militaryPersonnel.map((person) => (
                                <option key={person.id} value={person.id}> {/* Usa person.id como valor */}
                                    {person.first_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación:</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione...</option>
                            {Array.isArray(locations) && locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marca del Vehículo:</label>
                        <select
                            name="vehicle_brand"
                            value={formData.vehicle_brand}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione...</option>
                            {Array.isArray(vehicleBrands) && vehicleBrands.map((brand) => (
                                <option key={brand.id} value={brand.id}> {/* Usa brand.id como valor */}
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vehículo:</label>
                        <select
                            name="vehicle_type"
                            value={formData.vehicle_type}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleccione...</option>
                            {Array.isArray(vehicleTypes) && vehicleTypes.map((type) => (
                                <option key={type.id} value={type.id}> {/* Usa type.id como valor */}
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Registrar Vehículo
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default MilitaryVehicleForm;