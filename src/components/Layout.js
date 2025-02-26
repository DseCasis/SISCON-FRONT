"use client";

import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
    Drawer,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton
} from "@mui/material";
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Logout as LogoutIcon,
    Home as HomeIcon,
    MilitaryTech, Commute, Person, TimeToLeave
} from '@mui/icons-material';
import React, { useState } from "react";
import Link from "next/link";
import ThemeButton from "./theme/ThemeButton";
import Footer from "./Footer";
import Cookies from "js-cookie";
import axios from "axios";
import {useRouter} from "next/navigation";

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const useLogout = () => {
        return async () => {
            try {
                const token = Cookies.get("authToken");
                if (token) {
                    await axios.post(`${API_URL}/logout`, {}, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                }
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
            } finally {
                Cookies.remove("authToken"); // Elimina el token del frontend
                window.location.reload(); // Recarga la página para que el middleware maneje la redirección
            }
        };
    };

    return (
        <html lang="en">
        <body>
        <CssBaseline />
        <AppBar position="relative" color="grey" enableColorOnDark>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <Typography style={{ flexGrow: 3 }}>
                    SISCON
                </Typography>
            </Toolbar>
            <ThemeButton />
        </AppBar>
        <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
            <Paper style={{ width: 240 }} elevation={0}>
                <div className="dark:bg-gray-700 dark:text-white transition duration-500 h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
                        <IconButton edge="start" color="inherit" onClick={handleDrawerClose}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                            SISCON APP
                        </Typography>
                    </div>
                    <Divider />
                    <List className="flex justify-between flex-col" style={{ flexGrow: 1 }}>
                        <div className="justify-content-center">
                            <img src="/images/batallon_logo2.png" alt="Logo" style={{ height: 90, marginLeft: 75, marginRight: 'auto' }} />
                            <Typography className="p-2 text-center" gutterBottom>
                                SISTEMA DE CONTROL
                            </Typography>
                        </div>
                        <Divider />
                        <ListItem button component={Link} href="/home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItem>

                        <ListItem button component={Link} href="/dashboard">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Panel De Control" />
                        </ListItem>

                        <ListItem button component={Link} href="/militaryPersonnel">
                            <ListItemIcon>
                                <MilitaryTech />
                            </ListItemIcon>
                            <ListItemText primary="Personal militar" />
                        </ListItem>

                        <ListItem button component={Link} href="/militaryVehicle">
                            <ListItemIcon>
                                <Commute/>
                            </ListItemIcon>
                            <ListItemText primary="Vehículo Militar" />
                        </ListItem>

                        <ListItem button component={Link} href="/civilVehicle">
                            <ListItemIcon>
                                <TimeToLeave />
                            </ListItemIcon>
                            <ListItemText primary="Vehículo Civil" />
                        </ListItem>

                        <Divider />
                    </List>

                    <ListItem button onClick={useLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar Sesión" />
                    </ListItem>

                </div>
            </Paper>
        </Drawer>

        <main>
            {children}
        </main>
        <footer style={{ bottom: 0, position: 'relative', width: '100%' }}>
            <Footer />
        </footer>
        </body>
        </html>
    );
};

export default Layout;