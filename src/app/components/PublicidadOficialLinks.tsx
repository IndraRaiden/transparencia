import DropdownLink from './DropdownLink';

const PublicidadOficialLinks = () => {
  return (
    <>
      <DropdownLink href="/publicidad-oficial/presupuesto-aprobado" text="1. Presupuesto aprobado por partida y ejercido (gastos de publicidad)" />
      <DropdownLink href="/publicidad-oficial/contrato-monto-factura" text="2. Contrato, monto y factura (gastos de publicidad oficial)" />
      <DropdownLink href="/publicidad-oficial/nombre-campana-objeto" text="3. Nombre de la campaña y objeto (gastos de publicidad oficial)" />
      <DropdownLink href="/publicidad-oficial/fecha-inicio-termino" text="4. Fecha de inicio y fecha de término (gastos de publicidad oficial)" />
      <DropdownLink href="/publicidad-oficial/dependencia-direccion" text="5. Dependencia o dirección que la solicita (gastos de publicidad oficial)" />
      <DropdownLink href="/publicidad-oficial/tipo-medio-comunicacion" text="6. Tipo de medio de comunicación (gastos de publicidad oficial)" />
      <DropdownLink href="/publicidad-oficial/costo-centimetro" text="7. Costo por centímetro de los gastos de publicidad oficial" />
      <DropdownLink href="/publicidad-oficial/padron-proveedores" text="8. Padrón de proveedores de gastos de publicidad oficial" />
    </>
  );
};

export default PublicidadOficialLinks;
