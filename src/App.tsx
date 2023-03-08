import { useEffect, useRef } from "react";
import useCanvas from "./hooks/useCanvas";
import useMousePosition from "./hooks/useMousePosition";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { drawRectStart, drawRectEnd, resize } = useCanvas(canvasRef);
  const position = useMousePosition(canvasRef);

  function handleMouseDown() {
    drawRectStart(position);
  }

  function handleMouseUp() {
    drawRectEnd(position);
  }

  return (
    <main className="container">
      <article className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDownCapture={handleMouseDown}
          onMouseUpCapture={handleMouseUp}
        />
        <img
          onLoad={(ev) => {
            resize(
              (ev.target as HTMLImageElement).height,
              (ev.target as HTMLImageElement).width
            );
          }}
          ref={imageRef}
          className="img"
          src="https://picsum.photos/1000"
        />
      </article>
    </main>
  );
}

export default App;
