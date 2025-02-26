import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const VehicleList = ({ vehicles }) => {
    const sortedVehicles = vehicles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Función para formatear la hora
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Función para generar el PDF
    const generatePDF = (vehicles) => {
        const doc = new jsPDF();

        // Establecer márgenes de forma manual
        const marginTop = 10; // Margen superior
        const marginLeft = 60; // Margen izquierdo
        const marginRight = 77; // Margen derecho
        const marginBottom = 20; // Margen inferior
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // URL de la imagen que se utilizará como logo
        const imgUrl = "https://i.imgur.com/rUS74bX.png"; // URL de la imagen

        // Añadir la imagen al PDF (centrada y con un tamaño adecuado)
        doc.addImage(imgUrl, "PNG", (pageWidth - 50) / 2, marginTop, 50, 50); // Centrado y tamaño adecuado

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("es-ES", {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Título y texto
        doc.setFont("arial", "bold");
        doc.setFontSize(24); // Tamaño de letra grande para "FUERZA TERRESTRE"
        doc.text("FUERZA TERRESTRE", marginLeft, marginTop + 60); // Centrado

        doc.setFontSize(12); // Fuente más pequeña para el resto de los textos
        doc.text("INFORME", marginLeft + 35, marginTop + 75); // Centrado
        doc.text("ACTIVIDAD VEHICULAR", marginLeft + 20, marginTop + 68); // Centrado
        // Agregar la fecha debajo de "INFORME"
        doc.setFontSize(12).setFont("Arial", "bold"); // Fecha
        doc.text(formattedDate, marginLeft+ 90, marginTop + 85); // Ajusta según el espacio necesario

        // Tabla de vehículos
        const tableColumn = ["Matrícula", "Color", "Ubicación", "Marca", "Tipo", "Hora Registro"];
        const tableRows = [];

        vehicles.forEach(vehicle => {
            const rowData = [
                vehicle.vehicle_id || "N/A",
                vehicle.color || "N/A",
                vehicle.location?.name || "N/A",
                vehicle.vehicle_brand?.name || "N/A",
                vehicle.vehicle_type?.name || "N/A",
                new Date(vehicle.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            ];
            tableRows.push(rowData);
        });

        // Crear la tabla con un formato más presentable
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: marginTop + 90,  // Donde comienza la tabla (debajo del texto)
            styles: {
                font: "arial", // Usar Arial
                fontSize: 10,  // Tamaño de letra para los datos de la tabla
                cellPadding: 5, // Espaciado dentro de las celdas
                halign: "center", // Alineación horizontal del contenido en las celdas
                valign: "middle", // Alineación vertical
                fillColor: [255, 255, 255], // Color de fondo blanco para las celdas
                lineWidth: 0.5, // Grosor de las líneas
                lineColor: [0, 0, 0], // Color de las líneas (negro)
            },
            headStyles: {
                fillColor: [200, 200, 200], // Color de fondo de la cabecera
                textColor: [0, 0, 0], // Color del texto en la cabecera
                fontStyle: "bold", // Negritas en los encabezados
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240], // Color alternativo de las filas
            },
            columnStyles: {
                0: { cellWidth: 25 }, // Ancho personalizado de las columnas
                1: { cellWidth: 25 },
                2: { cellWidth: 35 },
                3: { cellWidth: 25 },
                4: { cellWidth: 35 },
                5: { cellWidth: 25 },
            }
        });

        // Guardar el archivo PDF
        doc.save("Informe_Vehiculos.pdf");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-black text-center">Listado de Vehículos</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full mx-auto bg-white border border-gray-300 table-auto">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-black text-center">Tipo</th>
                        <th className="py-2 px-4 border-b text-black text-center">Matrícula</th>
                        <th className="py-2 px-4 border-b text-black text-center">Conductor</th>
                        <th className="py-2 px-4 border-b text-black text-center">Color</th>
                        <th className="py-2 px-4 border-b text-black text-center">Ubicación</th>
                        <th className="py-2 px-4 border-b text-black text-center">Marca</th>
                        <th className="py-2 px-4 border-b text-black text-center">Tipo de Vehículo</th>
                        <th className="py-2 px-4 border-b text-black text-center">Hora de Registro</th> {/* Nueva columna */}
                    </tr>
                    </thead>
                    <tbody>
                    {sortedVehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-black text-center">
                                {vehicle.hasOwnProperty('military_personnel_id') ? "Militar" : "Civil"}
                            </td>
                            <td className="py-2 px-4 border-b text-black text-center">
                                {vehicle.vehicle_id || "N/A"}
                            </td>

                            <td className="py-2 px-4 border-b text-black text-center">
                                {vehicle.military_personnel
                                    ? `${vehicle.military_personnel.first_name} ${vehicle.military_personnel.last_name}`
                                    : vehicle.civil_personnel
                                        ? `${vehicle.civil_personnel.first_name} ${vehicle.civil_personnel.last_name}`
                                        : "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b text-black text-center">
                                {vehicle.color || "N/A"}
                            </td>
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
                                {/* Mostrar la hora de registro */}
                                {formatTime(vehicle.created_at) || "N/A"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button
                    onClick={() => generatePDF(vehicles)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
                >
                    Descargar PDF
                </button>
            </div>
        </div>
    );
};

export default VehicleList;
