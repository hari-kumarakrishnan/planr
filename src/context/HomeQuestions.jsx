import { createContext } from "react";

export const HomeQuestions = createContext({
  questions: [],
  setQuestions: () => {},
  answers: [],
  setAnswers: () => {},
});
