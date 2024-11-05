"use client";

import React, { useState, useEffect } from "react";
import { create, all, MathType, isDenseMatrix } from "mathjs";

const config = {};
const math = create(all, config);

const FernCanvas = () => {
  const [iteration, setIteration] = useState(5);
  const [point, setPoint] = useState(math.matrix([[1], [1]]));
  const [points, setPoints] = useState<MathType[]>([point]);

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
          console.log(newPoint);

          return newPoint;
        });
        setTimeout(() => performIterations(currentIteration - 1), 0);
      }
    };

    performIterations(iteration);
  }, [iteration]);

  return (
    <>
      {points.map((point, index) => {
        // Check if point is a DenseMatrix by checking its properties
        if (point && isDenseMatrix(point)) {
          const pointArray = point.toArray() as number[][];
          return (
            <div key={index}>
              X: {pointArray[0][0]}, Y: {pointArray[1][0]}{" "}
              {/* Display the coordinates */}
            </div>
          );
        }
        return null; // Return null if point is not a DenseMatrix
      })}
    </>
  );
};

export default FernCanvas;
