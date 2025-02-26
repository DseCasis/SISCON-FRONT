import React from "react";

const CivilPersonnelList = ({ personnel }) => {
    const sortedPersonnel = personnel.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-black text-center">Listado de Personal Civil</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full mx-auto bg-white border border-gray-300 table-auto">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-black text-center">Nombre</th>
                        <th className="py-2 px-4 border-b text-black text-center">Cargo</th>
                        <th className="py-2 px-4 border-b text-black text-center">Departamento</th>
                        <th className="py-2 px-4 border-b text-black text-center">Hora de Registro</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedPersonnel.map((person) => (
                        <tr key={person.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-black text-center">
                                {person.first_name} {person.last_name}
                            </td>
                            <td className="py-2 px-4 border-b text-black text-center">
                                {person.position || "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b text-black text-center">
                                {person.department || "N/A"}
                            </td>
                            <td className="py-2 px-4 border-b text-black text-center">
                                {new Date(person.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CivilPersonnelList;
