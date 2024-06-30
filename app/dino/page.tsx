"use client";

import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { motion, useAnimationControls, cubicBezier } from "framer-motion";
import { useInterval } from "@/hooks/useInterval";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const INITIAL_TREE_DIFFICULTY = 4;
const WIDTH = 1200;
const INITIAL_GAME_SPEED = 5;
const TREE_GAP = 500;
const TREE_HEIGHT = 60;
const TREE_WIDTH = 48;
const PLAYER_SIZE = 20;
const FPS = 60;

const slowRiseFastDrop = cubicBezier(0.4, 0.0, 1, 0.5);

export default function DinoGame({ playerImg }: { playerImg?: string }) {
  const [_, setTreeDifficulty] = useState(INITIAL_TREE_DIFFICULTY);
  const playerPosition = useRef({ x: 15, y: 0 });
  const controls = useAnimationControls();
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const playerBlock = useRef<HTMLImageElement | null>(null);

  const generateBlock = useCallback(
    (pos: number) => ({
      number: Math.max(Math.floor(Math.random() * 3), 1),
      pos,
    }),
    []
  );

  const [pillars, setPillars] = useState(() =>
    Array.from({ length: 10 }, (_, i) =>
      generateBlock(WIDTH / 2 + TREE_GAP * i)
    )
  );

  const updatePillars = useCallback(() => {
    setPillars((prev) => {
      const newPillars = prev.map((pillar) => ({
        ...pillar,
        pos: pillar.pos - gameSpeed,
      }));

      const playerLeft = playerPosition.current.x;
      const playerRight = playerPosition.current.x + PLAYER_SIZE;
      const playerTop =
        497 -
        Math.floor(
          playerBlock.current?.getBoundingClientRect().y
            ? playerBlock.current?.getBoundingClientRect().y
            : 360
        );

      for (let i = 0; i < newPillars.length; i++) {
        const pillar = newPillars[i];
        for (let j = 0; j < pillar.number; j++) {
          const blockLeft = pillar.pos + j * TREE_WIDTH;
          const blockRight = blockLeft + TREE_WIDTH;

          if (
            playerRight > blockLeft &&
            playerLeft < blockRight &&
            playerTop < TREE_HEIGHT
          ) {
            setGameOver(true);
            return prev;
          }
        }
      }

      if (newPillars[0].pos < -TREE_GAP) {
        newPillars.shift();
        newPillars.push(
          generateBlock(newPillars[newPillars.length - 1].pos + TREE_GAP)
        );
      }

      return newPillars;
    });
  }, [generateBlock, gameSpeed]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(updatePillars, 1000 / FPS);
      return () => clearInterval(interval);
    }
  }, [updatePillars, gameOver]);

  useInterval(() => {
    if (!gameOver) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore % 40 === 0) {
          setGameSpeed((prevSpeed) => Math.min(prevSpeed + 1, 10));
          setTreeDifficulty((prevDifficulty) => prevDifficulty + 1);
        }
        return newScore;
      });
    }
  }, 1000);

  const handleKeyDown = useCallback(
    async (e: { key: string }) => {
      if (e.key === " " && !isJumping && !gameOver) {
        setIsJumping(true);
        await controls.start({
          y: [-80, 0],
          transition: {
            duration: 0.6,
            times: [0.6, 1],
            ease: slowRiseFastDrop,
          },
        });
        setIsJumping(false);
      }
    },
    [controls, isJumping, gameOver]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setGameSpeed(INITIAL_GAME_SPEED);
    setTreeDifficulty(INITIAL_TREE_DIFFICULTY);
    playerPosition.current = { x: 10, y: 0 };
    setPillars(
      Array.from({ length: 10 }, (_, i) =>
        generateBlock(WIDTH / 2 + TREE_GAP * i)
      )
    );
  };

  const pillarBlocks = useMemo(
    () =>
      pillars.flatMap((block, index) =>
        Array.from({ length: block.number }, (_, i) => (
          <Image
            src="/tree.png"
            alt="tree"
            width={478}
            height={522}
            className="absolute -bottom-1 w-12 h-16 "
            key={`${index}-${i}`}
            style={{ left: block.pos + i * TREE_WIDTH }}
          />
        ))
      ),
    [pillars]
  );

  return (
    <div className="flex h-screen bg-black flex-col items-center">
      <div className="w-[1200px] h-[400px] mt-[100px] border-8 border-pearl rounded-t-md relative overflow-hidden bg-[url(/background-dino.png)] bg-no-repeat bg-cover aspect-video bg-center ">
        {pillarBlocks}
        <motion.img
          src={playerImg ?? "/runner.gif"}
          alt="runner"
          width={200}
          height={265}
          className="absolute w-8 h-10 bottom-0"
          style={{
            left: playerPosition.current.x,
            bottom: playerPosition.current.y,
          }}
          animate={controls}
          initial={{ y: 0 }}
          ref={playerBlock}
        />

        <div className="absolute top-4 right-4 text-2xl font-bold">
          Score: {score}
        </div>

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-pearl p-8 rounded-lg shadow-lg text-center flex flex-col justify-center items-center">
              <div className="text-4xl font-bold text-red-500">Game Over</div>
              <div className="text-2xl mt-4">Score: {score}</div>
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleRestart}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className="relative border-b-[3px] border-x-[3px] bg-pearl border-pearl
       rounded-b-md p-4 w-[1200px]"
      >
        <Image
          src="/controllers.svg"
          alt="alt"
          className="w-fit mx-auto"
          width={500}
          height={500}
        />
        <div className="absolute right-2 bottom-2 text-sm">
          Press <span className="text-red-500">Space</span> to jump
        </div>
      </div>
      <Link href="/" className="absolute top-8 left-8">
        <ArrowLeft className="size-6 text-white cursor-pointer" />
      </Link>
    </div>
  );
}
