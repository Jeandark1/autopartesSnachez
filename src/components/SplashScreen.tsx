import { useEffect, useState } from 'react';
import { Cog, Wrench } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 2200);
    const doneTimer = setTimeout(onComplete, 2900);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d1117] ${
        exiting ? 'animate-splash-exit' : ''
      }`}
    >
      <div className="relative flex items-center justify-center">
        <Cog
          className="absolute w-24 h-24 text-[#e63946] animate-gear-spin"
          strokeWidth={1.5}
        />
        <Cog
          className="absolute w-16 h-16 text-[#00b4d8] animate-gear-spin-reverse"
          style={{ transform: 'translate(35px, 30px)' }}
          strokeWidth={1.5}
        />
        <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-[#161b22] rounded-full border-2 border-slate-700">
          <Wrench className="w-8 h-8 text-[#fcbf49] animate-fade-in delay-500" />
        </div>
      </div>

      <div className="mt-8 text-center opacity-0-init animate-fade-in-up delay-700">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          AUTOREPUESTOS
        </h1>
        <h2 className="text-xl font-bold text-[#e63946] tracking-widest">
          SANCHEZ
        </h2>
        <p className="mt-2 text-slate-500 text-xs tracking-[0.3em] uppercase">
          El Alto · La Paz · Bolivia
        </p>
      </div>

      <div className="absolute bottom-12 w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-[#e63946] to-[#00b4d8] origin-left animate-[draw-line_2s_ease-in-out_forwards]" />
      </div>
    </div>
  );
}
