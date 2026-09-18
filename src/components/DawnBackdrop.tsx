/* Fondo del amanecer — corrientes.

   Cinco curvas casi paralelas que se juntan y se abren, como corrientes de aire,
   con la rampa del cielo del hero (#241B3C → #5B3352 → #B8543C → #E8823F → #F6C99A).
   El grupo se repite cuatro veces a lo alto de la página; el segundo va espejado,
   el tercero volteado y el cuarto las dos cosas, así que no se nota la repetición
   y el degradado se invierte en la mitad de ellos.

   Va una sola vez, como primer hijo de <main>, por detrás de todo. Los extremos
   de cada curva quedan fuera de cuadro (de -160 a 1360 sobre un lienzo de 1200),
   de modo que nunca se ve dónde empieza ni dónde termina.

   Su intensidad vive en --dawn-glow (globals.css). */

const CURRENTS = [
  { className: 'c1', d: 'M-160,250 C200,150 500,330 820,270 C1060,225 1180,180 1360,215' },
  { className: 'c2', d: 'M-160,290 C210,196 510,372 830,312 C1070,267 1190,228 1360,262' },
  { className: 'c3', d: 'M-160,336 C190,250 520,414 840,356 C1080,314 1200,282 1360,312' },
  { className: 'c4', d: 'M-160,392 C220,306 530,468 850,410 C1090,368 1210,342 1360,370' },
  { className: 'c5', d: 'M-160,446 C200,368 540,516 860,462 C1100,420 1220,400 1360,424' },
];

const STREAMS = ['s1', 's2', 's3', 's4'];

function Stream({ position }: { position: string }) {
  return (
    <div className={`stream ${position}`}>
      <svg viewBox="0 0 1200 560" preserveAspectRatio="none">
        {CURRENTS.map((c) => (
          <path key={c.className} className={c.className} d={c.d} />
        ))}
      </svg>
    </div>
  );
}

export default function DawnBackdrop() {
  return (
    <div className="dawn-backdrop" aria-hidden="true">
      {/* Los degradados se declaran una vez y los referencian los cuatro grupos */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="dawn-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#241B3C" stopOpacity="0" />
            <stop offset="16%" stopColor="#5B3352" />
            <stop offset="46%" stopColor="#B8543C" />
            <stop offset="74%" stopColor="#E8823F" />
            <stop offset="92%" stopColor="#F6C99A" />
            <stop offset="100%" stopColor="#F6C99A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dawn-h2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F6C99A" stopOpacity="0" />
            <stop offset="18%" stopColor="#E8823F" />
            <stop offset="52%" stopColor="#B8543C" />
            <stop offset="84%" stopColor="#5B3352" />
            <stop offset="100%" stopColor="#241B3C" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {STREAMS.map((position) => (
        <Stream key={position} position={position} />
      ))}
    </div>
  );
}
