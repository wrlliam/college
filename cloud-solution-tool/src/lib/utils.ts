import type { Answer } from "~/app/page";
import dataset, { cloudSolutions } from "./dataset";

export const capitilization = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const returnAsDouble = (int: number, max: number): string => {
  const splitInt = int.toString().split("");
  const splitMax = max.toString().split("");
  if (splitInt.length < splitMax.length) {
    const amountOfZeros = splitMax.length - splitInt.length;
    return `${"0".repeat(amountOfZeros)}${int}`;
  }
  return int.toString();
};

export const averageScore = (anwsers: number[]) =>
  anwsers.reduce((sum, val) => sum + val, 0) / anwsers.length;
export const recommendSolution = (avgScore: number) =>
  cloudSolutions.reduce((prev, curr) => {
    const prevDiff = Math.abs(prev.value - avgScore);
    const currDiff = Math.abs(curr.value - avgScore);
    return currDiff < prevDiff ? curr : prev;
  });

export const solution = (answers: Answer[]) => {
  const points = answers.map((answer) => {
    const question = dataset[answer.questionNumber];
    if (!question) return 0;

    const chosen = question.answers[answer.chosenIndex];
    if (!chosen) return 0;

    return chosen.value;
  });

  const pointLength = points.length;
  const avg = points.reduce((prev, curr) => prev + curr) / pointLength;

  return avg;
};

export const compareSolution = (solutionAvg: number) => {
  const rounded = Math.round(solutionAvg);

  let closestDiff = Infinity;
  let bestSolution = null;

  for (const option of cloudSolutions) {
    const diff = Math.abs(option.value - rounded);

    if (diff < closestDiff) {
      closestDiff = diff;
      bestSolution = option;
    }
  }

  return bestSolution;
};
