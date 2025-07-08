"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPublicidadDropdownOpen, setIsPublicidadDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const togglePublicidadDropdown = () => {
    setIsPublicidadDropdownOpen(!isPublicidadDropdownOpen);
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Portal de Transparencia</h1>
      
      <div className="flex flex-col gap-4">
        {/* Buzón de Quejas */}
        <Link href="/buzon-quejas" className="block">
          <div className="bg-red-600 text-white p-4 rounded shadow-md hover:bg-red-700 transition-colors">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>Buzón de quejas</span>
            </div>
          </div>
        </Link>

        {/* IPO de la Ley estatal de transparencia y ley general de transparencia */}
        <div className="relative">
          <button 
            onClick={toggleDropdown}
            className="w-full bg-red-600 text-white p-4 rounded shadow-md hover:bg-red-700 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2">📄</span>
                <span>IPO de la Ley estatal de transparencia y ley general de transparencia</span>
              </div>
              <span>{isDropdownOpen ? '▲' : '▼'}</span>
            </div>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b shadow-lg mt-1 max-h-96 overflow-y-auto">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/estructura-organica" className="block">
                    1. Estructura Orgánica
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/marco-normativo" className="block">
                    2. Marco normativo
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/directorio" className="block">
                    3. Directorio
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/nombramientos" className="block">
                    4. Nombramientos, comisiones y licencias
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/remuneracion" className="block">
                    5. Remuneración mensual
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/declaracion-patrimonial" className="block">
                    6. Declaración Patrimonial
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/viaticos" className="block">
                    7. Viáticos y gastos de representación
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/perfil-puestos" className="block">
                    8. Perfil de puestos y curriculum
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/convenios" className="block">
                    9. Convenios de colaboración
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/condiciones-trabajo" className="block">
                    10. Condiciones generales de trabajo
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/planes-programas" className="block">
                    11. Planes, programas o proyectos
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/servicios-tramites" className="block">
                    12. Servicios y trámites
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/mecanismo-solicitudes" className="block">
                    13. Mecanismo de solicitudes, opiniones, quejas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/mecanismos-participacion" className="block">
                    14. Mecanismos de participación ciudadana
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/estimulos" className="block">
                    15. Estímulos, apoyos y requisitos
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/beneficiarios-subsidios" className="block">
                    16. Beneficiarios de subsidios, estímulos y apoyos
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/beneficiarios-programas" className="block">
                    17. Beneficiarios de programas sociales
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/personas-recursos" className="block">
                    18. Personas que utilizan recursos públicos
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/instituciones-beneficencia" className="block">
                    19. Instituciones de beneficencia
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/presupuesto" className="block">
                    20. Presupuesto asignado
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/fraccion-52" className="block">
                    21. Ver esta fracción en el número 52
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/unidad-transparencia" className="block">
                    22. Unidad de Transparencia y Comité de Transparencia
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/solicitudes" className="block">
                    24. Solicitudes y respuestas (ver también número 54)
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/informes-financieros" className="block">
                    25. Informes financieros y cuenta pública
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/deuda-publica" className="block">
                    26. Deuda pública
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/auditorias" className="block">
                    27. Auditorías
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/proveedores" className="block">
                    28. Proveedores y contratistas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/inspectores" className="block">
                    29. Inspectores o visitadores
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/procedimientos-adjudicacion" className="block">
                    30. Procedimientos de adjudicación directa, invitación restringida y licitación
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/agenda-eventos" className="block">
                    31. Agenda de eventos culturales o deportivos
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/actas-entrega" className="block">
                    32. Actas de entrega-recepción
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/georreferenciacion" className="block">
                    33. Georreferenciación de obras públicas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/expedientes-reservados" className="block">
                    34. Expedientes reservados
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/guia-archivos" className="block">
                    35. Guía de archivos
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/concesiones" className="block">
                    36. Concesiones, permisos y autorizaciones
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/concesiones-transporte" className="block">
                    37. Concesiones de transporte público
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/entrega-recursos" className="block">
                    38. Entrega de recursos públicos
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/sistemas-pensionarios" className="block">
                    39. Sistemas pensionarios
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/informe-actividades" className="block">
                    40. Informe de actividades
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/ingresos" className="block">
                    41. Ingresos
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/informacion-desclasificada" className="block">
                    42. Información desclasificada
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/preguntas-frecuentes" className="block">
                    43. Preguntas frecuentes
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/catalogo-informacion-adicional" className="block">
                    44. Catálogo de Información Adicional
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/acciones-contingencias" className="block">
                    45. Acciones realizadas por contingencias
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/aportaciones-emergencia" className="block">
                    46. Aportaciones nacionales o internacionales, para emergencia o desastre
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/servidores-sanciones" className="block">
                    47. Servidores públicos con sanciones definitivas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/parque-vehicular" className="block">
                    48. El listado del parque vehicular
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/informacion-catastral" className="block">
                    49. Información catastral
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/proceso-catastral" className="block">
                    50. Proceso catastral
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/otra-informacion" className="block">
                    51. Cualquier otra información
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/calendario-sesiones" className="block">
                    52. Calendario de sesiones o reuniones públicas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/catalogos-documentales" className="block">
                    53. Catálogos documentales
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/solicitudes-respuestas" className="block">
                    54. Solicitudes y respuestas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/ipo-leyes-transparencia/expedientes-impacto" className="block">
                    55. Expedientes que midan el impacto ambiental, social, demográfico o económico
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Publicidad Oficial */}
        <div className="relative">
          <button 
            onClick={togglePublicidadDropdown}
            className="w-full bg-red-600 text-white p-4 rounded shadow-md hover:bg-red-700 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2">📄</span>
                <span>Publicidad oficial</span>
              </div>
              <span>{isPublicidadDropdownOpen ? '▲' : '▼'}</span>
            </div>
          </button>
          
          {isPublicidadDropdownOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b shadow-lg mt-1 max-h-96 overflow-y-auto">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/cuerpos-policia" className="block">
                    1. Cuerpos de policía
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/combate-delincuencia" className="block">
                    2. Combate a la delincuencia
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/sistema-pensiones" className="block">
                    3. Sistema de pensiones
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/multas" className="block">
                    4. Multas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/cuotas-tarifas" className="block">
                    5. Cuotas y tarifas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/indicadores-servicios" className="block">
                    6. Indicadores de servicios
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/gaceta-municipal" className="block">
                    7. Gaceta Municipal
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/calendario-cultural" className="block">
                    8. Calendario cultural y deportivo
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/actas-cabildo" className="block">
                    9. Actas de Cabildo
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/patrimonio-municipal" className="block">
                    10. Patrimonio Municipal
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/emprestitos-deudas" className="block">
                    11. Emprestitos y Deudas
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/ejercicio-presupuesto" className="block">
                    12. Ejercicio del presupuesto
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/control-asistencia" className="block">
                    13. Control de asistencia
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/comision-transparencia" className="block">
                    14. Comisión de Transparencia
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/iniciativas-legales" className="block">
                    15. Iniciativas legales
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/usos-suelo" className="block">
                    16. Usos de suelo
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/rutas-transporte" className="block">
                    17. Rutas de transporte
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/servicio-basura" className="block">
                    18. Servicio de Basura
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/infractores" className="block">
                    19. Infractores
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/deudores-fiscales" className="block">
                    20. Deudores fiscales
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/uso-suelo" className="block">
                    21. Uso de suelo
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/publicidad-oficial/atlas-riesgo" className="block">
                    22. Atlas de riesgo
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Obligaciones Específicas de los Municipios */}
        <Link href="/obligaciones-especificas-municipios" className="block">
          <div className="bg-red-600 text-white p-4 rounded shadow-md hover:bg-red-700 transition-colors">
            <div className="flex items-center">
              <span className="mr-2">📄</span>
              <span>Obligaciones específicas de los municipios</span>
            </div>
          </div>
        </Link>

        {/* Información complementaria del artículo 70 Ley general de transparencia */}
        <Link href="/informacion-complementaria-art70" className="block">
          <div className="bg-red-600 text-white p-4 rounded shadow-md hover:bg-red-700 transition-colors">
            <div className="flex items-center">
              <span className="mr-2">📄</span>
              <span>Información complementaria del artículo 70 Ley general de transparencia</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
