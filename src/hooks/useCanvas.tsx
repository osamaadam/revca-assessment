import { RefObject, useEffect, useState } from "react";

export interface CanvasPoint {
  x: number;
  y: number;
}

const COLORS = ["red", "blue", "green", "yellow", "orange", "purple", "pink"];

export default function useCanvas(ref: RefObject<HTMLCanvasElement>) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [drawStart, setDrawStart] = useState<CanvasPoint>({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) {
      setCtx(ref.current.getContext("2d"));
    }
  }, [ref]);

  function drawRectStart(point: CanvasPoint) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.lineWidth = 2;
    setDrawStart(point);
  }

  function drawRectEnd(point: CanvasPoint, stroke?: string, fill?: string) {
    if (!ctx) return;
    const width = point.x - drawStart.x;
    const height = point.y - drawStart.y;

    const randomIndex = Math.floor(Math.random() * COLORS.length);

    ctx.strokeStyle = stroke ?? COLORS[randomIndex];
    ctx.fillStyle = fill ?? "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(drawStart.x, drawStart.y, width, height);
    ctx.strokeRect(drawStart.x, drawStart.y, width, height);
    printCoords(drawStart.x, drawStart.y, width, height);
  }

  function printCoords(x: number, y: number, width: number, height: number) {
    console.log([
      { x, y },
      { x: x + width, y },
      { x: x + width, y: y + height },
      { x, y: y + height },
    ]);
  }

  function clear() {
    if (!ctx || !ref.current) return;

    ctx.clearRect(0, 0, ref.current.width, ref.current.height);
  }

  function maxmize() {
    if (ref.current) {
      clear();
      ref.current.width = window.innerWidth;
      ref.current.height = window.innerHeight;
    }
  }

  function resize(height: number, width: number) {
    if (!ref.current) return;
    clear();
    ref.current.width = width;
    ref.current.height = height;
  }

  return { drawRectStart, drawRectEnd, maxmize, resize, clear };
}
