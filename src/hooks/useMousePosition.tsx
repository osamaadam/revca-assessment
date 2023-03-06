import { RefObject, useEffect, useState } from "react";
import { CanvasPoint } from "./useCanvas";

export default function useMousePosition(ref: RefObject<HTMLCanvasElement>) {
  const [position, setPosition] = useState<CanvasPoint>({ x: 0, y: 0 });

  useEffect(() => {
    const cb = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    ref.current?.addEventListener("mousemove", cb);
    return () => {
      ref.current?.removeEventListener("mousemove", cb);
    };
  }, []);

  return position;
}
