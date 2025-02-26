import { NextResponse } from 'next/server';

export function middleware(req) {
    // Leer las cookies directamente usando NextResponse
    const token = req.cookies.get('authToken');  // Utiliza NextResponse para acceder a las cookies

    // Verificar si el token existe en las cookies
    if (!token) {
        // Si no hay token, redirigir a la página de login
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Si hay token, permitir el acceso a la página
    return NextResponse.next();
}

// Definir las rutas a proteger
export const config = {
    matcher: ['/dashboard', '/home', '/civilVehicle', '/militaryPersonnel', '/militaryVehicle'], // Ajusta las rutas según sea necesario
};
