import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { HtmlRedirect } from '../components/HtmlRedirect';

// React Pages
import { Sesion } from '../../modules/landing/pages/Sesion';

// Dashboard Pages
import { InicioDashboard } from '../../modules/dashboard/pages/InicioDashboard';
import { Compras } from '../../modules/dashboard/pages/Compras';
import { Ventas } from '../../modules/dashboard/pages/Ventas';
import { Inventario } from '../../modules/dashboard/pages/Inventario';
import { Reportes } from '../../modules/dashboard/pages/Reportes';
import { Usuarios } from '../../modules/dashboard/pages/Usuarios';
import { Clientes } from '../../modules/dashboard/pages/Clientes';
import { Proveedores } from '../../modules/dashboard/pages/Proveedores';
import { Configuracion } from '../../modules/dashboard/pages/Configuracion';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Landing pages → redirección full page a HTML standalone */}
      <Route path="/" element={<HtmlRedirect to="/pages/inicio.html" />} />
      <Route path="/nosotros" element={<HtmlRedirect to="/pages/nosotros.html" />} />
      <Route path="/planes" element={<HtmlRedirect to="/pages/planes.html" />} />
      <Route path="/capacitacion" element={<HtmlRedirect to="/pages/capacitacion.html" />} />

      {/* Sesion - React (Firebase Auth) */}
      <Route path="/sesion" element={<Sesion />} />

      {/* Dashboard - React (Authenticated) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<InicioDashboard />} />
        <Route path="compras" element={<Compras />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="proveedores" element={<Proveedores />} />
        <Route path="configuracion" element={<Configuracion />} />
      </Route>

      {/* Catch-all → login */}
      <Route path="*" element={<Navigate to="/sesion" replace />} />
    </Routes>
  );
};
