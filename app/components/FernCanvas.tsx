"use client";

import React, { useState, useEffect, useRef } from "react";
import { create, all, MathType, isDenseMatrix } from "mathjs";

const config = {};
const math = create(all, config);

const FernCanvas = () => {
  const [iteration, setIteration] = useState(0);
  const [point, setPoint] = useState(math.matrix([[1], [1]]));
  const [points, setPoints] = useState<MathType[]>([point]);
  const [scale, setScale] = useState(52.5);
  const [rangeScale, setRangeScale] = useState(52.5);
  const [rangeIteration, setRangeIteration] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const f1 = (P: MathType) => {
    return math.add(
      math.multiply(
        math.matrix([
          [0, 0],
          [0, 0.16],
        ]),
        P
      ),
      math.matrix([[0], [0]])
    );
  };

  const f2 = (P: MathType) => {
    return math.add(
      math.multiply(
        math.matrix([
          [0.85, 0.04],
          [-0.04, 0.85],
        ]),
        P
      ),
      math.matrix([[0], [1.6]])
    );
  };

  const f3 = (P: MathType) => {
    return math.add(
      math.multiply(
        math.matrix([
          [0.2, -0.26],
          [0.23, 0.22],
        ]),
        P
      ),
      math.matrix([[0], [1.6]])
    );
  };

  const f4 = (P: MathType) => {
    return math.add(
      math.multiply(
        math.matrix([
          [-0.15, 0.28],
          [0.26, 0.24],
        ]),
        P
      ),
      math.matrix([[0], [0.44]])
    );
  };

  useEffect(() => {
    const chooseTransformation = () => {
      const rand = math.random();
      if (rand < 0.01) return f1;
      else if (rand < 0.86) return f2;
      else if (rand < 0.93) return f3;
      else return f4;
    };

    const performIterations = (currentIteration: number) => {
      if (currentIteration > 0) {
        setPoint((prevPoint) => {
          const transformation = chooseTransformation();
          const newPoint = transformation(prevPoint);
          setPoints((prevPoints) => [...prevPoints, newPoint]);

          return newPoint;
        });
        setTimeout(() => performIterations(currentIteration - 1), 0);
      }
    };

    performIterations(iteration);
  }, [iteration]);

  useEffect(() => {
    const colorPalette: { [key: number]: string } = {
      1: "#61b3ff",
      2: "#210a7f",
      3: "#0588da",
      4: "#0bcc31",
      5: "#21fd2b",
    };

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw points
        points.forEach((point) => {
          if (point && isDenseMatrix(point)) {
            const pointArray = point.toArray() as number[][];
            const x = pointArray[0][0] * scale;
            const y = pointArray[1][0] * scale;

            ctx.beginPath();
            ctx.arc(
              x + canvas.width / 2,
              -y + canvas.height,
              0.5,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = colorPalette[math.randomInt(1, 6)];
            // ctx.fillRect(x + canvas.width / 2, -y + canvas.height, 2, 2);
            ctx.fill();
            ctx.closePath();
          }
        });
      }
    }
  }, [points, scale]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newIterations = Number(formData.get("iterations"));
    const newScale = Number(formData.get("scale"));

    setIteration(newIterations);
    setScale(newScale);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-10">
        <canvas
          ref={canvasRef}
          width={550}
          height={550}
          style={{
            borderRadius: "35px",
            backgroundColor: "#141414",
            zIndex: "0",
          }}
        />
        <form
          className="flex flex-col justify-start items-start gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 justify-start items-start">
            <label htmlFor="range-iterations" className="text-white">
              Iterations:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                name="iterations"
                min={100}
                max={10000}
                defaultValue={iteration}
                id="range-iterations"
                onChange={(e) => setRangeIteration(Number(e.target.value))}
              />
              <span>{rangeIteration}</span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-1">
            <label htmlFor="range-scale" className="text-white">
              Scale:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                name="scale"
                min={2.5}
                max={102.5}
                defaultValue={scale}
                id="range-scale"
                onChange={(e) => setRangeScale(Number(e.target.value))}
              />
              <span>{rangeScale - 2.5}%</span>
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default FernCanvas;
