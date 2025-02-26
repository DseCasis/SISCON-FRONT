"use client"

import React, { useState, useEffect } from "react";
import { URL_MILITARY_PERSONNEL } from "../../services/PrivateServices";
import axios from "axios";
import Cookies from "js-cookie";

const MilitaryPersonalList = () => {
    const [militaryPersonals, setMilitaryPersonals] = useState([]);

    const fetchMilitaryPersonals = async () => {
        try {
            const token = Cookies.get('authToken'); // Obtener el token de las cookies

            if (!token) {
                console.error('No token found. Please login first.');
                return;
            }

            const response = await axios.get(URL_MILITARY_PERSONNEL, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Añadir el token en el encabezado
                },
            });

            console.log("Datos recibidos del backend:", response.data); // Revisa la estructura aquí
            setMilitaryPersonals(response.data.data); // Asumiendo que la respuesta tiene esta estructura

        } catch (err) {
            console.error("Error al cargar el personal militar:", err);
        }
    };

    useEffect(() => {
        fetchMilitaryPersonals();
    }, []);

    const sortedPersonals = Array.isArray(militaryPersonals)
        ? militaryPersonals.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : [];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-black text-center">Listado de Personal Militar</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full mx-auto bg-white border border-gray-300 table-auto">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-black text-center">Cédula</th>
                        <th className="py-2 px-4 border-b text-black text-center">Nombre</th>
                        <th className="py-2 px-4 border-b text-black text-center">Apellido</th>
                        <th className="py-2 px-4 border-b text-black text-center">Unidad</th>
                        <th className="py-2 px-4 border-b text-black text-center">Rango</th>
                        <th className="py-2 px-4 border-b text-black text-center">Hora de Registro</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedPersonals.length > 0 ? (
                        sortedPersonals.map((personal) => {
                            console.log("Datos de personal:", personal); // Esto te dirá qué trae cada personal
                            return (
                                <tr key={personal.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-black text-center">{personal.cedula}</td>
                                    <td className="py-2 px-4 border-b text-black text-center">{personal.first_name}</td>
                                    <td className="py-2 px-4 border-b text-black text-center">{personal.last_name}</td>
                                    <td className="py-2 px-4 border-b text-black text-center">
                                        {personal.unit?.name || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b text-black text-center">
                                        {personal.rank?.name || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b text-black text-center">
                                        {new Date(personal.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No se encontró personal militar.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MilitaryPersonalList;