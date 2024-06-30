"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";

interface Pillar {
  top: number;
  bottom: number;
  start: number;
}

const GAME_HEIGHT = 600;
const GAME_WIDTH = 500;
const PILLAR_WIDTH = 5;
const BIRD_SIZE = 36;
const BIRD_X = 100;
const JUMP_HEIGHT = 5;
const GRAVITY = 1.5;
const PILLAR_SPEED = 2;
const SPEED_INCREASE = 0.5;

export default function FloppyBird() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const birdPositionRef = useRef({ x: BIRD_X, y: 200 });
  const [gameSpeed, setGameSpeed] = useState(PILLAR_SPEED);
  const isJumpingRef = useRef(false);

  const getRandomInt = useCallback(
    (height: number, width: number, delta: number): Pillar => {
      const x = Math.random() * height - 50;
      const topPillar = Math.max(Math.floor(x), 350);
      const bottomPillar = height - topPillar + 200;
      const startPos = width + delta;

      return { top: topPillar, bottom: bottomPillar, start: startPos };
    },
    []
  );

  const checkCollision = useCallback(
    (bird: { x: number; y: number }, pillar: Pillar) => {
      const birdLeft = bird.x;
      const birdRight = bird.x + BIRD_SIZE;
      const birdTop = GAME_HEIGHT - bird.y - BIRD_SIZE;
      const birdBottom = GAME_HEIGHT - bird.y;
      const pillarLeft = pillar.start;
      const pillarRight = pillar.start + PILLAR_WIDTH;
      const topPillarBottom = GAME_HEIGHT - pillar.top;
      const bottomPillarTop = pillar.bottom;

      return (
        birdRight > pillarLeft &&
        birdLeft < pillarRight &&
        (birdTop < topPillarBottom || birdBottom > bottomPillarTop)
      );
    },
    []
  );

  const checkBoundary = useCallback((bird: { x: number; y: number }) => {
    if (bird.y < 0 || bird.y > GAME_HEIGHT - 5) {
      return true;
    }
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const initialPillars = Array.from({ length: 20 }).map((_, index) =>
      getRandomInt(GAME_HEIGHT, GAME_WIDTH, index * 180)
    );
    setPillars(initialPillars);

    const gameLoop = setInterval(() => {
      setPillars((prevPillars) => {
        const movedPillars = prevPillars.map((pillar) => ({
          ...pillar,
          start: pillar.start - Math.min(8, gameSpeed),
        }));

        const filteredPillars = movedPillars.filter(
          (pillar) => pillar.start > -PILLAR_WIDTH
        );

        if (filteredPillars.length < 10) {
          const newPillars = Array.from({ length: 5 }).map((_, index) =>
            getRandomInt(
              GAME_HEIGHT,
              GAME_WIDTH,
              filteredPillars[filteredPillars.length - 1].start + 180 * index
            )
          );
          filteredPillars.push(...newPillars);
          console.log("Speed increased");
          setGameSpeed((prev) => prev + SPEED_INCREASE);
        }

        return filteredPillars;
      });

      birdPositionRef.current.y = isJumpingRef.current
        ? Math.min(
            birdPositionRef.current.y + JUMP_HEIGHT,
            GAME_HEIGHT - BIRD_SIZE
          )
        : Math.max(birdPositionRef.current.y - GRAVITY, 0);

      setPillars((prevPillars) => {
        const collision = prevPillars.some((pillar) =>
          checkCollision(birdPositionRef.current, pillar)
        );

        const boundary = checkBoundary(birdPositionRef.current);

        if (boundary) {
          setGameOver(true);
          clearInterval(gameLoop);
        }

        if (collision) {
          setGameOver(true);
          clearInterval(gameLoop);
        }
        return prevPillars;
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [getRandomInt, checkCollision, gameOver, checkBoundary, gameSpeed]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === " ") {
      isJumpingRef.current = true;
    } else if (e.key.toLowerCase() === "r") {
      setGameOver(false);
      setPillars([]);
      birdPositionRef.current = { x: BIRD_X, y: 200 };
    }
  }, []);

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === " ") {
      isJumpingRef.current = false;
    }
  }, []);

  return (
    <div className="flex h-screen bg-black justify-center items-center">
      <div
        className="h-[600px] w-[500px] border-2 relative border-black bg-blue-400 flex overflow-hidden bg-[url('/background.png')] bg-no-repeat bg-cover bg-center"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        autoFocus
      >
        <Image
          src="/brett.webp"
          alt="brett"
          width={250}
          height={250}
          className="absolute size-9 object-fill"
          style={{
            left: `${birdPositionRef.current.x}px`,
            bottom: `${birdPositionRef.current.y}px`,
          }}
        />
        {pillars.map((val, i) => (
          <div
            key={i}
            className="h-full absolute"
            style={{
              left: `${val.start}px`,
            }}
          >
            <div
              style={{
                top: `-${val.top}px`,
              }}
              className={`absolute left-0 bg-green-600 h-full w-5 border-x-2 border-black after:content-[''] after:absolute after:top-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-[180%] after:h-3 after:bg-green-700 after:border-2 after:border-black rotate-180
                `}
            />
            <div
              style={{
                bottom: `-${val.bottom}px`,
              }}
              className={`absolute left-0 bg-green-600  h-full w-5 border-x-2 border-black before:content-[''] before:absolute before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-[180%] before:h-3 before:bg-green-700 before:border-2 before:border-black`}
            />
          </div>
        ))}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl">
            Game Over
          </div>
        )}
      </div>
    </div>
  );
}
