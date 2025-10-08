"use client";

import { useState } from "react";
import Loader from "~/components/Loading";
import Question from "~/components/Question";
import dataset from "~/lib/dataset";
import { compareSolution, solution as solutionFn } from "~/lib/utils";

export type Answer = {
  questionNumber: number;
  chosenIndex: number;
};

export default function Root() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [solution, setSolution] = useState<string | null>();
  const [answers, setAnswers] = useState<Answer[]>(
    dataset.map((_, i) => ({
      questionNumber: i,
      chosenIndex: -1,
    }))
  );

  function updateAnswer(questionNumber: number, chosenIndex: number) {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.questionNumber === questionNumber
          ? { ...answer, chosenIndex }
          : answer
      )
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center mt-[10rem] gap-[2rem]">
      <h1 className="font-semibold">Cloud Solutions Diagnotistc Tools</h1>
      <div className="flex flex-col w-full items-center gap-1">
        {dataset.map((question, index) => {
          return (
            <Question
              key={index}
              totalQuestions={dataset.length}
              index={index}
              question={question.title}
              anwserChoices={question.answers.map((f) => f.label)}
              onSelect={(chosenIndex) => updateAnswer(index, chosenIndex)}
            />
          );
        })}

        <div className="max-w-4xl mb-[5rem] w-full p-[0.35rem] max-h-[300px] bg-stone-400/5 rounded-md mx-[2rem]">
          <div className="w-full h-full bg-red-50 rounded-[8px] p-[0.75rem] flex justify-between items-center">
            {!solution ? (
              <h1>Calulate your Solution</h1>
            ) : loading ? (
              <Loader />
            ) : (
              <>{solution}</>
            )}
            <button
              onClick={() => {
                if (
                  answers.map((z) => z.chosenIndex >= 0).filter((z) => z)
                    .length > 0
                ) {
                  setLoading(true);
                  setSolution(compareSolution(solutionFn(answers))?.label);
                  setTimeout(() => {
                    setLoading(false);
                  }, 1250);
                }
              }}
              className={`bg-teal-400  ${
                answers.filter((f) => f.chosenIndex < 0).length > 0
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } text-sm text-white shadow-sm hover:bg-teal-500 smooth_transition py-[8px] px-[16px] rounded-md`}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
