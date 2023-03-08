import { RefObject, useEffect, useState } from "react";
import { CanvasPoint } from "./useCanvas";

export default function useMousePosition(ref: RefObject<HTMLCanvasElement>) {
  const [position, setPosition] = useState<CanvasPoint>({ x: 0, y: 0 });

  useEffect(() => {
    const cb = (e: any) => {
      switch (e.type) {
        case "touchstart":
        case "touchend":
          if (!e.changedTouches?.length) break;
          setPosition({
            x: e.changedTouches[0].clientX - e.target.offsetParent?.offsetLeft,
            y: e.changedTouches[0].clientY - e.target.offsetParent?.offsetTop,
          });
          break;
        case "mousemove":
          setPosition({ x: e.layerX, y: e.layerY });
          break;
      }
    };
    ref.current?.addEventListener("mousemove", cb);
    ref.current?.addEventListener("touchstart", cb);
    ref.current?.addEventListener("touchend", cb);
    return () => {
      ref.current?.removeEventListener("mousemove", cb);
      ref.current?.removeEventListener("touchstart", cb);
      ref.current?.removeEventListener("touchend", cb);
    };
  }, []);

  return position;
}
