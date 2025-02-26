// components/forms/MilitaryForm.js
import React, { useState } from 'react';
import { URL_ADD_CIVIL } from '../../services/PrivateServices';
import Cookies from 'js-cookie';
import axios from 'axios';
import Modal from '../Modal'; // Importa el componente Modal mejorado

function CivilForm({ isOpen, onClose }) {
    const initialState = {
        cedula: '',
        first_name: '',
        last_name: '',
    };
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState(''); // Estado para mensajes de error
    const [success, setSuccess] = useState(''); // Estado para mensajes de éxito

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const empty = {
            cedulaEmpty: formData.cedula.trim() === '',
            first_nameEmpty: formData.first_name.trim() === '',
            last_nameEmpty: formData.last_name.trim() === '',
        };

        setFormData({ ...formData, ...empty });
        return Object.values(empty).some((empty) => empty);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validación de campos
        if (validate()) {
            setError('Por favor, completa todos los campos.'); // Mensaje de error
            return;
        }

        try {
            const token = Cookies.get('authToken');
            const response = await axios.post(URL_ADD_CIVIL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Respuesta del servidor:', response.data);

            // Mensaje de éxito
            setSuccess('¡El formulario se ha enviado correctamente!');
            setError(''); // Limpiar mensajes de error

            // Reiniciar el formulario después de 2 segundos
            setTimeout(() => {
                setFormData(initialState);
                setSuccess('');
                onClose(); // Cerrar el modal
            }, 2000);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);

            // Mensaje de error
            setError('Ocurrió un error al enviar el formulario.');
            setSuccess(''); // Limpiar mensajes de éxito
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <h1 className="text-xl text-gray-500 font-semibold text-center">Control Personal Civil</h1>

                {/* Mostrar mensajes de error */}
                {error && (
                    <div className="text-gray-500 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
                        {error}
                    </div>
                )}

                {/* Mostrar mensajes de éxito */}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
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
                        <label className="block text-sm font-medium text-gray-700">Género:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="text-gray-500 w-full p-2 border border-gray-300 rounded-md"
                            maxLength="250"
                        />
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

export default CivilForm;