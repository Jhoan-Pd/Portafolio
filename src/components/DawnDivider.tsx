/* Franjas del amanecer.
   Toman la rampa del cielo del hero (#241B3C → #5B3352 → #B8543C → #E8823F → #F6C99A)
   y la llevan al resto de la página como color suspendido, sin rellenar el fondo.

   - "aurora" separa una sección de otra.
   - "fog" cierra la página después de Contacto.

   La intensidad de ambas vive en --dawn-glow (globals.css). */

type Props = {
  variant?: 'aurora' | 'fog';
};

export default function DawnDivider({ variant = 'aurora' }: Props) {
  if (variant === 'fog') {
    return (
      <div className="dawn-fog theme-page" aria-hidden="true">
        <span />
      </div>
    );
  }

  return (
    <div className="dawn-aurora theme-page" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
