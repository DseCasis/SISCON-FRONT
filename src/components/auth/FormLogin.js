'use client'; // Marca el componente como del lado del cliente

import { useRouter } from 'next/navigation'; // Importa useRouter de Next.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { login, setToken } from '../../services/AuthServices';
import { ErrorLogin, successLogin } from '../../alerts/GlobalAlerts';

export default function FormLogin() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const router = useRouter(); // Usa useRouter para redirección

    const onSubmit = async (data) => {
        try {
            const response = await login(data); // Hacer la solicitud de login

            // Verificar que el token esté presente en la respuesta
            if (!response.authToken) {
                throw new Error("No se recibió un token válido.");
            }

            // Guardar el token en las cookies
            setToken(response.authToken);

            // Mostrar alerta de éxito
            successLogin();

            // Redirigir al usuario después del login
            router.push('/dashboard'); // Cambia '/dashboard' por la ruta que desees
        } catch (error) {
            console.error('Error en el login:', error);
            ErrorLogin(error.response?.data?.message || "Error al iniciar sesión");
        }
    };

    return (
        <div className="w-full text-black h-full flex justify-center border-2 rounded-md md:shadow-2xl md:shadow-stone-500 bg-gray-200 ">
            <div className="w-1/2 flex flex-col p-12 space-y-2">
                <h1 className="flex-1 text-xl text-center font-semibold pb-0 text-black">
                    Sistema De Control
                </h1>
                <div className="px-8">
                    <img src="/images/Escudo-de-Ecuador.png" alt="Logo" />
                </div>

                <form
                    className="w-full space-y-4 flex flex-col justify-center pb-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="px-6 mb-4 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-red-500">
                        {errors.cedula?.type === 'required' && (
                            <p className="text-red-400 text-sm">* Este campo es requerido</p>
                        )}
                        <input
                            {...register('cedula', {
                                required: true,
                            })}
                            type="text"
                            placeholder="Cedula"
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        />
                    </div>
                    <div className="px-6 mt-6 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-red-500">
                        {errors.password?.type === 'required' && (
                            <p className="text-red-400 text-sm">* Este campo es requerido</p>
                        )}
                        <input
                            {...register('password', {
                                required: true,
                            })}
                            type="password"
                            placeholder="Contraseña"
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 rounded-r-md bg-red-500">
                <img
                    className="w-full h-full object-cover rounded-r-md"
                    src="/images/batallon_logo.jpeg"
                    alt=""
                />
            </div>
        </div>
    );
}