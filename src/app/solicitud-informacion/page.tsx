"use client";

import { useState } from "react";
import Header from "../components/Header";

export default function SolicitudInformacion() {
  const [formState, setFormState] = useState({
    fecha: "",
    nombre: "",
    correoSolicitante: "",
    telefono: "",
    tipoInformacion: "",
    descripcionSolicitud: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Here you would integrate with your backend API
      // For now we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and show success message
      setFormState({
        fecha: "",
        nombre: "",
        correoSolicitante: "",
        telefono: "",
        tipoInformacion: "",
        descripcionSolicitud: "",
      });
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Ocurrió un error al enviar la solicitud. Por favor intente de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        
        <div className="mt-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Solicitud de Información</h1>
          <div className="h-1 w-32 bg-[#712442] mb-6"></div>
          
          <p className="text-lg text-gray-600 mb-8">
            Utilice este formulario para solicitar información pública. 
            Todas las solicitudes serán procesadas de acuerdo con la Ley de Transparencia y Acceso a la Información Pública.
          </p>
          
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-start">
              <svg className="h-5 w-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">¡Solicitud enviada con éxito!</p>
                <p className="text-sm">Gracias por su solicitud. Su petición ha sido recibida y será procesada en los plazos establecidos por la ley.</p>
              </div>
            </div>
          )}
          
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">Error</p>
              <p className="text-sm">{submitError}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de solicitud *
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formState.fecha}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo del solicitante *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formState.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su nombre completo"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="correoSolicitante" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico *
              </label>
              <input
                type="email"
                id="correoSolicitante"
                name="correoSolicitante"
                value={formState.correoSolicitante}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono de contacto
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formState.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(000) 000-0000"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="tipoInformacion" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de información solicitada *
              </label>
              <select
                id="tipoInformacion"
                name="tipoInformacion"
                value={formState.tipoInformacion}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccione una opción</option>
                <option value="presupuesto">Información presupuestaria</option>
                <option value="contratos">Contratos y licitaciones</option>
                <option value="personal">Directorio de funcionarios</option>
                <option value="programas">Programas y servicios</option>
                <option value="normatividad">Normatividad</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="descripcionSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción detallada de la información solicitada *
              </label>
              <textarea
                id="descripcionSolicitud"
                name="descripcionSolicitud"
                value={formState.descripcionSolicitud}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describa con la mayor precisión posible la información que solicita..."
              />
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <p className="text-sm text-gray-500">* Campos obligatorios</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-[#712442] text-white font-medium rounded-md hover:bg-[#5e1c37] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#712442] transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar solicitud"
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer Section */}
        <footer className="mt-16 py-8 border-t border-gray-200 text-center text-gray-600">
          <div className="flex flex-col items-center">
            <p>© {new Date().getFullYear()} UNIDAD DE TRANSPARENCIA Y ACCESO A LA INFORMACION | Gobierno del Estado</p>
            <p className="mt-2 font-semibold">MUNICIPIO DE PIEDRAS NEGRAS, COAHUILA.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
