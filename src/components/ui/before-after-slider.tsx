import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  priority?: boolean;
}

/** Comparador genérico de imágenes antes/después con handle arrastrable. */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Antes",
  afterLabel = "Después",
  className,
  priority = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none overflow-hidden rounded-3xl border border-border bg-muted shadow-lift",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
    >
      <img
        src={afterSrc}
        alt={afterAlt}
        width={1280}
        height={960}
        loading={priority ? "eager" : "lazy"}
        className="block h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt={beforeAlt}
          width={1280}
          height={960}
          loading={priority ? "eager" : "lazy"}
          className="block h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-card/85 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-foreground backdrop-blur">
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-card/90"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-muted-foreground shadow-lift">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6 4 12l5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <label className="sr-only" htmlFor="before-after-range">
        Comparar antes y después
      </label>
      <input
        id="before-after-range"
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
