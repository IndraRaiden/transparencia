"use client";

import { useState } from "react";
import Header from "../components/Header";

export default function Contacto() {
  const [formState, setFormState] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
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
      // Send form data to Formspree - replace with your own endpoint
      const response = await fetch("https://formspree.io/f/mdkdegev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formState.nombre,
          correo: formState.correo,
          telefono: formState.telefono,
          asunto: formState.asunto,
          mensaje: formState.mensaje,
          _subject: "Nuevo mensaje de contacto desde el portal de transparencia"
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Reset form and show success message
      setFormState({
        nombre: "",
        correo: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Ocurrió un error al enviar el formulario. Por favor intente de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />
        
        <div className="mt-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Contacto</h1>
          <div className="h-1 w-32 bg-[#712442] mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                Póngase en contacto con la Unidad de Transparencia y Acceso a la Información 
                para cualquier consulta o solicitud.
              </p>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-start space-x-3">
                  <div className="text-[#712442] text-xl">📍</div>
                  <div>
                    <p className="font-medium">Dirección:</p>
                    <p className="text-gray-600">Calle Zaragoza y Jiménez S/N, Zona Centro, 26000 Piedras Negras, Coahuila</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-[#712442] text-xl">📞</div>
                  <div>
                    <p className="font-medium">Teléfono:</p>
                    <p className="text-gray-600">(878) 782-0404</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-[#712442] text-xl">✉️</div>
                  <div>
                    <p className="font-medium">Correo Electrónico:</p>
                    <p className="text-gray-600">transparencia@piedrasnegras.gob.mx</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-[#712442] text-xl">🕒</div>
                  <div>
                    <p className="font-medium">Horario de Atención:</p>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium">¡Mensaje enviado con éxito!</p>
                    <p className="text-sm">Gracias por contactarnos. Su mensaje ha sido recibido y será atendido a la brevedad.</p>
                  </div>
                </div>
              )}
              
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{submitError}</p>
                </div>
              )}
              
              <form 
                onSubmit={handleSubmit} 
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="mb-4">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formState.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#712442] focus:border-transparent"
                    placeholder="Ingrese su nombre completo"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formState.correo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#712442] focus:border-transparent"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formState.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#712442] focus:border-transparent"
                    placeholder="(Opcional) Su número telefónico"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formState.asunto}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#712442] focus:border-transparent"
                    placeholder="Asunto de su mensaje"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formState.mensaje}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#712442] focus:border-transparent"
                    placeholder="Escriba su mensaje aquí..."
                  />
                </div>
                
                <div className="flex items-center justify-between mt-6">
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
                      "Enviar mensaje"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Footer Section */}
        <footer className="mt-16 py-8 border-t border-gray-200 text-center text-gray-600">
          <div className="flex flex-col items-center">
            <p>© {new Date().getFullYear()} UNIDAD DE TRANSPARENCIA Y ACCESO A LA INFORMACION</p>
            <p className="mt-2 font-semibold">MUNICIPIO DE PIEDRAS NEGRAS, COAHUILA.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
