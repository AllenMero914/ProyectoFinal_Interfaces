import React, { useEffect, useState } from 'react';
import { Topbar } from '../components/Topbar';
import { api } from '../../../core/api/api';
import { useAuth } from '../../../core/context/AuthContext';


export const Configuracion = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states for IVA
  const [ivaValue, setIvaValue] = useState('');

  const loadData = async () => {
    try {
      const data = await api.get('/parametros');
      
      const ivaParam = data.find(p => p.clave === 'IVA');
      if (ivaParam) {
        setIvaValue(ivaParam.valor);
      }
    } catch (error) {
      console.error('Error loading parameters', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveIva = async () => {
    const numValue = parseFloat(ivaValue);
    if (isNaN(numValue) || numValue < 0 || numValue > 20) {
      alert('El valor del IVA debe estar entre 0 y 20');
      return;
    }

    setSaving(true);
    try {
      await api.put('/parametros/IVA', {
        clave: 'IVA',
        valor: numValue.toString(),
        descripcion: 'Porcentaje de Impuesto al Valor Agregado'
      });
      alert('IVA actualizado correctamente');
      loadData();
    } catch (error) {
      alert(error.message || 'Error al actualizar el IVA');
    } finally {
      setSaving(false);
    }
  };

  if (user?.rol === 'VENDEDOR') {
    return (
      <main className="main-content config-restricted">
        <i className="fa-solid fa-lock"></i>
        <h2>Acceso Restringido</h2>
        <p>Tu rol de Vendedor no tiene permisos para acceder a este módulo.</p>
      </main>
    );
  }

  return (
    <main className="main-content">
      <Topbar
        title="Configuración del Sistema"
        subtitle="Parametriza los valores globales de ProFact"
        searchPlaceholder="Buscar configuración..."
      />

      <section className="table-section config-container">
        <div className="table-header">
          <h2>Parámetros Globales</h2>
        </div>
        
        {loading ? (
          <p className="config-loading">Cargando...</p>
        ) : (
          <div className="config-section">
            <div className="form-group">
              <label className="config-label">
                Impuesto al Valor Agregado (IVA %)
              </label>
              <p className="config-description">
                Define el porcentaje de IVA por defecto a aplicar en las ventas y compras (entre 0 y 20).
              </p>
              <div className="config-input-row">
                <input 
                  type="number" 
                  min="0" 
                  max="20" 
                  value={ivaValue} 
                  onChange={(e) => setIvaValue(e.target.value)} 
                  className="config-input"
                />
                <button 
                  onClick={handleSaveIva} 
                  disabled={saving}
                  className="config-save-btn"
                >
                  {saving ? 'Guardando...' : 'Guardar IVA'}
                </button>
              </div>
            </div>

            <hr className="config-divider" />
            
            <div className="form-group">
              <label className="config-coming-label">
                Próximamente
              </label>
              <p className="config-description">
                Aquí se podrán configurar otros parámetros como la moneda y el nombre de la empresa.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
