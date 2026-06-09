"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoProcesso() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  function toggleMute() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <div className="group relative mx-auto aspect-[9/16] w-full max-w-[19rem] overflow-hidden rounded-3xl border border-areia-300 bg-vinho-900 shadow-2xl">
      <video
        ref={ref}
        src="/processo-cura.mp4"
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vinho-950/85 via-vinho-950/10 to-vinho-950/30" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />

      {/* Ativar / desativar */}
      <button
        onClick={toggle}
        className="absolute inset-0 flex items-center justify-center"
        aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
      >
        <span
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full bg-dourado text-cafe shadow-lg backdrop-blur transition-all duration-300 group-hover:scale-105",
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        >
          {playing ? <Pause size={26} /> : <Play size={26} className="ml-1" />}
        </span>
      </button>

      {/* Som */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Ativar som" : "Desativar som"}
        className={cn(
          "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-vinho-950/50 text-creme-claro backdrop-blur transition-opacity hover:bg-vinho-950/70",
          playing ? "opacity-100" : "opacity-0",
        )}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Legenda */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 p-5 text-center transition-opacity duration-500",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        <p className="font-display text-lg italic text-creme/90">
          &ldquo;Charcutaria é paciência que vira sabor.&rdquo;
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-dourado-claro/80">
          Douglas · Mestre Charcuteiro
        </p>
      </div>
    </div>
  );
}
