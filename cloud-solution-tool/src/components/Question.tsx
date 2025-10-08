"use client";

import { useState } from "react";
import { capitilization, returnAsDouble } from "~/lib/utils";

type QuestionProps = {
  question: string;
  index: number;
  anwserChoices: string[];
  totalQuestions: number;
  onSelect: (chosenIndex: number) => void;
};

function Progress(props: { current: number; max: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="border overflow-hidden border-blue-500/20 w-full h-[8px] rounded-sm">
        <div
          style={{
            width: `${(100 / props.max) * props.current}%`,
          }}
          className={`max-w-[100%]  relative h-full bg-blue-500`}
        ></div>
      </div>
      <h1 className="opacity-20 flex justify-end font-semibold text-xs">
        {props.current}/{props.max}
      </h1>
    </div>
  );
}

export default function Question(props: QuestionProps) {
  const [active, setActive] = useState(-1);
  return (
    <div className="max-w-4xl w-full p-[0.35rem] max-h-[300px] bg-stone-400/5 rounded-md mx-[2rem]">
      <div className="w-full h-full bg-red-50 rounded-[8px] p-[0.75rem]">
        <div className="flex justify-between">
          <h1 className="font-semibold">{props.question}</h1>
          <h1 className="font-semibold opacity-25">
            {returnAsDouble(props.index, props.totalQuestions)}
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-[1.5rem]">
          {props.anwserChoices.map((z, i) => {
            return (
              <button
                onClick={() => {
                  setActive(i );
                  props.onSelect(i);
                }}
                key={i}
                className={`col-span-1 smooth_transition  ${
                  active === i
                    ? "bg-teal-400 text-white shadow-sm"
                    : "bg-stone-200/50 text-black shadow-transparent hover:bg-stone-200/75"
                } text-sm py-[8px] px-[2px] cursor-pointer rounded-md`}
              >
                {capitilization(z)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
