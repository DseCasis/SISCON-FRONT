"use client"

import React, { useState, useEffect } from "react";
import {URL_CIVIL_VEHICLE} from "../../services/PrivateServices";
import axios from "axios";
import Cookies from "js-cookie";

const CivilVehicleList = () => {
    const [civilVehicles, setCivilVehicles] = useState([]);

    const fetchCivilVehicles = async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token) return;

            const { data } = await axios.get(URL_CIVIL_VEHICLE, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCivilVehicles(data.data);
        } catch (err) {}
    };

    useEffect(() => {
        fetchCivilVehicles();
    }, []);

    const sortedVehicles = Array.isArray(civilVehicles)
        ? civilVehicles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : [];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-black text-center">Listado de Vehículos Militares</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full mx-auto bg-white border border-gray-300 table-auto">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-black text-center">Matrícula</th>
                        <th className="py-2 px-4 border-b text-black text-center">Conductor</th>
                        <th className="py-2 px-4 border-b text-black text-center">Color</th>
                        <th className="py-2 px-4 border-b text-black text-center">Ubicación</th>
                        <th className="py-2 px-4 border-b text-black text-center">Marca</th>
                        <th className="py-2 px-4 border-b text-black text-center">Tipo de Vehículo</th>
                        <th className="py-2 px-4 border-b text-black text-center">Hora de Registro</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedVehicles.length > 0 ? (
                        sortedVehicles.map((vehicle) => {
                            console.log("Datos de vehículo:", vehicle); // Esto te dirá qué trae cada vehículo
                            return (
                                <tr key={vehicle.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-black text-center">{vehicle.vehicle_id}</td>
                                    <td className="py-2 px-4 border-b text-black text-center">
                                        {vehicle.civil_personnel
                                            ? `${vehicle.civil_personnel.first_name} ${vehicle.civil_personnel.last_name}`
                                            : "N/A"}
                                    </td>

                                    <td className="py-2 px-4 border-b text-black text-center">{vehicle.color}</td>
                                    <td className="py-2 px-4 border-b text-black text-center">
                                        {vehicle.location?.name || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b text-black text-center">
                                        {vehicle.vehicle_brand?.name || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b text-black text-center">
                                        {vehicle.vehicle_type?.name || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b text-black text-center">
                                        {new Date(vehicle.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No se encontraron vehículos.</td>
                        </tr>
                    )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default CivilVehicleList;
