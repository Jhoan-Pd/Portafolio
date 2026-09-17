/* Fondo del amanecer.

   Seis franjas largas e inclinadas, tomadas de la rampa del cielo del hero
   (#241B3C → #5B3352 → #B8543C → #E8823F → #F6C99A), que cruzan la página
   entera por detrás de las secciones.

   Va una sola vez, como primer hijo de <main>. No es un separador entre
   secciones: si lo fuera, el recorte de cada separador cortaría el desenfoque
   y se verían bloques. Acá el color no se interrumpe nunca.

   Su intensidad vive en --dawn-glow (globals.css). */

export default function DawnBackdrop() {
  return (
    <div className="dawn-backdrop" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
