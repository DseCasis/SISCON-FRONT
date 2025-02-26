"use client"
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import CivilForm from "../../components/forms/CivilForm";
import MilitaryForm from "../../components/forms/MilitaryForm";
import MilitaryVehicleForm from "../../components/forms/MilitaryVehicleForm";
import CivilVehicleForm from "../../components/forms/CivilVehicleForm";
import VehicleList from "../../components/List/VehicleList";
import { URL_VEHICLE_LIST } from "../../services/PrivateServices";
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
    const [isCivilModalOpen, setIsCivilModalOpen] = useState(false);
    const [isMilitaryModalOpen, setIsMilitaryModalOpen] = useState(false);
    const [isMilitaryVehicleModalOpen, setIsMilitaryVehicleModalOpen] = useState(false);
    const [isCivilVehicleModalOpen, setIsCivilVehicleModalOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    // Función para actualizar la lista de vehículos (solo cuando se desee actualizar manualmente)
    const fetchVehicles = async () => {
        try {
            const token = Cookies.get('authToken'); // Obtener el token de las cookies
            if (!token) {
                return;
            }
            const response = await axios.get(URL_VEHICLE_LIST, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Añadir el token en el encabezado
                },
            });
            setVehicles(response.data.data); // Asumiendo que la respuesta tiene esta estructura
        } catch (err) {}};

    useEffect(() => {
        fetchVehicles();
    }, []);

    // Funciones para el modal Civil
    const civilOpenModal = () => setIsCivilModalOpen(true);
    const civilCloseModal = () => setIsCivilModalOpen(false);

    // Funciones para el modal Military
    const militaryOpenModal = () => setIsMilitaryModalOpen(true);
    const militaryCloseModal = () => setIsMilitaryModalOpen(false);

    const militaryVehicleOpenModal = () => setIsMilitaryVehicleModalOpen(true);
    const militaryVehicleCloseModal = () => setIsMilitaryVehicleModalOpen(false);

    const civilVehicleOpenModal = () => setIsCivilVehicleModalOpen(true);
    const civilVehicleCloseModal = () => setIsCivilVehicleModalOpen(false);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">
                {/* Sección de Control de Personal */}
                <div className="min-h-screen bg-gray-100 p-6">
                    {/* Sección de Control de Personal */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                            CONTROL DE PERSONAL
                        </h1>
                        <div className="flex gap-4 w-full justify-center">
                            <button
                                onClick={civilOpenModal}
                                className="w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                            >
                                Agregar Persona Civil
                            </button>
                            <button
                                onClick={militaryOpenModal}
                                className="w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                            >
                                Agregar Persona Militar
                            </button>
                        </div>
                    </div>

                    {/* Sección de Control Vehicular */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                            CONTROL VEHICULAR
                        </h1>
                        <div className="flex gap-4 w-full justify-center">
                            <button
                                onClick={militaryVehicleOpenModal}
                                className="w-full md:w-56 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Agregar Vehiculo Militar
                            </button>
                            <button
                                onClick={civilVehicleOpenModal}
                                className="w-full md:w-56 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Agregar Vehiculo Civil
                            </button>
                        </div>
                    </div>

                    {/* Sección de Lista de Vehículos */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        {/* Botón para actualizar la lista de vehículos */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={fetchVehicles}  // Llama a la función fetchVehicles para actualizar la lista
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Actualizar Lista
                            </button>
                        </div>

                        {/* Mostrar la lista de vehículos */}
                        <VehicleList vehicles={vehicles} />
                    </div>

                </div>

                {/* Modales */}
                <CivilForm isOpen={isCivilModalOpen} onClose={civilCloseModal} />
                <MilitaryForm isOpen={isMilitaryModalOpen} onClose={militaryCloseModal} />
                <MilitaryVehicleForm
                    isOpen={isMilitaryVehicleModalOpen}
                    onClose={militaryVehicleCloseModal}
                />
                <CivilVehicleForm
                    isOpen={isCivilVehicleModalOpen}
                    onClose={civilVehicleCloseModal}
                />
            </div>
        </Layout>
    );
}
