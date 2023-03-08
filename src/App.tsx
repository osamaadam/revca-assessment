import { useCallback, useEffect, useRef } from "react";
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

  const handleResize = useCallback(() => {
    if (!canvasRef.current || !imageRef.current) return;
    const { clientHeight, clientWidth } = imageRef.current;
    resize(clientHeight, clientWidth);
  }, [canvasRef.current, imageRef.current]);

  useEffect(() => {
    window.onresize = handleResize;
  }, [window]);

  return (
    <main className="container">
      <div className="file-picker__container">
        <label htmlFor="file-picker-input">Select an image</label>
        <input
          name="file-picker-input"
          className="file-picker__input"
          type="file"
          accept="image/*"
          onInput={(ev) => {
            if (!ev.currentTarget.files?.length || !imageRef.current) return;
            const file = ev.currentTarget.files[0];
            imageRef.current.src = URL.createObjectURL(file);
          }}
        />
      </div>
      <article className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDownCapture={handleMouseDown}
          onMouseUpCapture={handleMouseUp}
        />
        <img
          onLoad={(ev) => {
            resize(ev.currentTarget.height, ev.currentTarget.width);
          }}
          ref={imageRef}
          className="img"
        />
      </article>
    </main>
  );
}

export default App;
