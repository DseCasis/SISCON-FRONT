// components/Modal.js
import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);

    // Cerrar el modal al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 transform transition-all duration-300 ease-out scale-95 opacity-0"
                style={{
                    animation: isOpen ? 'modalEnter 0.3s ease-out forwards' : 'modalExit 0.3s ease-out forwards',
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;