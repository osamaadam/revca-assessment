import { useEffect, useRef } from "react";
import useCanvas from "./hooks/useCanvas";
import useMousePosition from "./hooks/useMousePosition";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawRectStart, drawRectEnd, resize } = useCanvas(canvasRef);
  const position = useMousePosition(canvasRef);

  useEffect(() => {
    resize(500, 500);
  }, [canvasRef]);

  function handleMouseDown() {
    drawRectStart(position);
  }

  function handleMouseUp() {
    drawRectEnd(position);
  }

  return (
    <main className="container">
      <canvas
        ref={canvasRef}
        onMouseDownCapture={handleMouseDown}
        onMouseUpCapture={handleMouseUp}
      />
      <img className="img" src="https://picsum.photos/500" />
    </main>
  );
}

export default App;
