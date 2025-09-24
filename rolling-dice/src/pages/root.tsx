import confetti from "canvas-confetti";
import { useState } from "react";
import Histrogram from "../components/histrogram";
import { Dice } from "../lib/dice";

// Parse string to number or return a minimum if NaN
export const parseOrDefault = (parse: any, def: number) =>
  isNaN(parseInt(parse)) ? def : parseInt(parse);

// Returns the sum of an array of numbers or miniumum of 1.
export const arraySum = (arr: number[]) =>
  arr.length < 1 ? 0 : arr.reduce((acc, cv) => cv + acc);

/* Dice roll logic, set a max, min, and amount of dice to return, 
rounds the number and ensure if its smaller than min, return min.

Returns as array to display each roll seperately */
// export const diceRoll = (
//   max: number,
//   amountOfDice: number = 1,
//   min: number = 1
// ) => {
//   let sum = [];

//   for (let i = 0; i < amountOfDice; i++) {
//     const r = Math.floor(Math.random() * (max - min + 1)) + min;
//     sum.push(r);
//   }

//   return sum;
// };

// Main exported function -> the displayed page.
export default function RootPage() {
  // Setting reactive variables so the referenced components update on change
  // Number data types, stored as string to simplify input, parsed to int later on
  const [maxDiceSize, setMaxDiceSize] = useState("6");
  const [amountOfDice, setAmountOfDice] = useState("1");
  const [result, setResult] = useState<number[]>([]);
  const [rollCounter, setRollCounter] = useState(0);

  // Boolean
  const [loading, setLoading] = useState(false);

  // String to store the name
  const [name, setName] = useState("John Doe");

  // Confetti boom boom boom
  const confettiCannons = () => {
    const end = Date.now() + 1.5 * 1000; // 1.5 seconds

    // Confetti partical colours
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      // Run for a certain amount of time
      if (Date.now() > end) return;
      // Use package functions to generate majourity logic
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      // Frame logic
      requestAnimationFrame(frame);
    };
    frame();
  };

  // Main content of the page
  return (
    <div className="flex items-center justify-center w-screen mt-[4rem]">
      <div className="flex gap-[0.5rem] w-[500px] flex-col">
        <div className="flex gap-2 flex-col">
          {/* Take input for name */}
          <h1>Your name</h1>
          <input
            type="text"
            className={`border-1 rounded-sm px-4 py-2 ${
              name.length <= 0 ? "border-red-500" : "border-green-500"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-col">
          {/* Take input for max dice size e.g 20, ensure it is a valid number */}
          <h1>Max Dice Size</h1>
          <input
            type="text"
            className={`border-1 rounded-sm px-4 py-2 ${
              isNaN(parseInt(maxDiceSize))
                ? "border-red-500"
                : "border-green-500"
            }`}
            value={maxDiceSize}
            onChange={(e) => setMaxDiceSize(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-col">
          {/* Take input for max amount of dice, ensure it is a valid number */}
          <h1>Amount of Dice</h1>
          <input
            type="text"
            className={`border-1 rounded-sm px-4 py-2 ${
              isNaN(parseInt(amountOfDice))
                ? "border-red-500"
                : "border-green-500"
            }`}
            value={amountOfDice}
            onChange={(e) => setAmountOfDice(e.target.value)}
          />
        </div>

        {/* Button Logic, update loading state to rotate dice and change text, work out the total dice roll and 
        return the output and rechange states to ensure no longer spinning dice or loading text */}
        <button
          onClick={(e) => {
            e.preventDefault();

            setLoading(true);
            const diceRollCount = parseOrDefault(amountOfDice, 1);
            const dice = new Dice(
              parseOrDefault(maxDiceSize, 6),
              1,
              diceRollCount
            );
            setTimeout(() => {
              setResult(dice.roll());
              setRollCounter(rollCounter + diceRollCount);
              setLoading(false);

              confettiCannons();
            }, 1500);
          }}
          className="flex w-full bg-black text-white cursor-pointer scale-[1] hover:scale-[0.985] smooth px-4 py-2 rounded-sm"
        >
          Roll Dice{parseOrDefault(amountOfDice, 1) > 1 ? "s" : ""}
        </button>

        {/* Display total dice amount and rotating dice based on loading/result state */}
        <div className="flex flex-row gap-4 text-3xl mt-[4rem]">
          <span className={`${loading ? "rotating" : ""}`}>🎲</span>
          <span>
            {arraySum(result) > 0 ? (
              !loading ? (
                <span className="flex gap-3">
                  {result.map((r) => (
                    // Inline selection case
                    <span
                      className={`${
                        r === parseOrDefault(maxDiceSize, 6)
                          ? "font-bold text-green-600"
                          : ""
                      }`}
                    >
                      {r}
                    </span>
                  ))}
                </span>
              ) : (
                "Loading..."
              )
            ) : (
              "Unknown"
            )}
          </span>
        </div>

        <div className="text-sm opacity-30 italic">
          Your ({name}) total dice rolls: {rollCounter}
        </div>

        <Histrogram />
      </div>
    </div>
  );
}
