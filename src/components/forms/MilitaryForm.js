import React, { useEffect, useState } from "react";
import { URL_ADD_MILITARY, URL_RANK, URL_UNIT } from "../../services/PrivateServices";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "../Modal";

function MilitaryForm({ isOpen, onClose }) {
    const [unit, setUnit] = useState([]);
    const [rank, setRank] = useState([]);

    useEffect(() => {
        const token = Cookies.get('authToken'); // Obtener el token de las cookies

        if (!token) {
            console.error('No token found. Please login first.');
            return;
        }
        axios.get(URL_RANK, {
            headers: {
                'Authorization': `Bearer ${token}`, // Agregar el token al encabezado
            }
        })
            .then(response => {
                setRank(response.data.data); // Asigna los datos de rank
            })
            .catch(error => {
                console.error('Error fetching rank:', error);
            });
        axios.get(URL_UNIT, {
            headers: {
                'Authorization': `Bearer ${token}`, // Agregar el token al encabezado
            }
        })
            .then(response => {
                setUnit(response.data.data); // Asigna los datos de unit
            })
            .catch(error => {
                console.error('Error fetching unit:', error);
            });
    }, []);

    const initialState = {
        cedula: '',
        first_name: '',
        last_name: '',
        unit: '',
        rank: '',
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
            cedulaEmpty: formData.cedula.trim() === '',
            first_nameEmpty: formData.first_name.trim() === '',
            last_nameEmpty: formData.last_name.trim() === '',
            unitEmpty: formData.unit.trim() === '',
            rankEmpty: formData.rank.trim() === '',
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
            const response = await axios.post(URL_ADD_MILITARY, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccess('¡El formulario se ha enviado correctamente!');
            setError('');

            setTimeout(() => {
                setFormData(initialState);
                setSuccess('');
                onClose();
            }, 2000);
        } catch (error) {
            setError('Ocurrió un error al enviar el formulario.');
            setSuccess('');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <h1 className="text-gray-500 text-xl font-semibold text-center">Control Personal Civil</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-gray-700 px-4 py-2 rounded-md">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cédula:</label>
                        <input
                            type="text"
                            name="cedula"
                            value={formData.cedula}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md"
                            maxLength="10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombres:</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md"
                            maxLength="250"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Apellido:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md"
                            maxLength="250"
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unidad Militar:</label>
                        <select
                            id="unit"
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                            className={`text-gray-500 w-full p-2 ${formData.unitEmpty ? 'border-red-500' : 'border-gray-300'} border rounded text-gray-700`}
                        >
                            <option value="" className="whitespace-nowrap">Seleccione...</option>
                            {Array.isArray(unit) && unit.map((unitItem) => (
                                <option key={unitItem.id} value={unitItem.id} className="whitespace-nowrap">
                                    {unitItem.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="rank" className="block text-sm font-medium text-gray-700">Rango Militar:</label>
                        <select
                            id="rank"
                            name="rank"
                            value={formData.rank}
                            onChange={handleInputChange}
                            className={`w-full p-2 ${formData.rankEmpty ? 'border-red-500' : 'border-gray-300'} border rounded text-gray-700`}
                        >
                            <option value="" className="whitespace-nowrap">Seleccione</option>
                            {Array.isArray(rank) && rank.map((rankItem) => (
                                <option key={rankItem.id} value={rankItem.id} className="whitespace-nowrap">
                                    {rankItem.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default MilitaryForm;