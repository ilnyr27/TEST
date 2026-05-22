import { create } from "zustand";
import { Question, QuestionOption, AnswerData } from "@/types/database";

export interface TestSessionState {
  // Test metadata
  testId: string | null;
  testName: string;
  questions: (Question & { options: QuestionOption[] })[];
  totalQuestions: number;

  // Navigation
  currentIndex: number;
  answers: Record<string, AnswerData>; // keyed by question id

  // Status
  status: "idle" | "loading" | "active" | "paused" | "completed";
  startedAt: string | null;
  timeSpentSeconds: number;

  // Actions
  initTest: (
    testId: string,
    testName: string,
    questions: (Question & { options: QuestionOption[] })[]
  ) => void;
  submitAnswer: (questionId: string, data: AnswerData) => void;
  goNext: () => void;
  goPrev: () => void;
  goToQuestion: (index: number) => void;
  pause: () => void;
  resume: () => void;
  complete: () => void;
  reset: () => void;
  tick: () => void;
}

export const useTestSessionStore = create<TestSessionState>((set, _get) => ({
  testId: null,
  testName: "",
  questions: [],
  totalQuestions: 0,
  currentIndex: 0,
  answers: {},
  status: "idle",
  startedAt: null,
  timeSpentSeconds: 0,

  initTest: (testId, testName, questions) =>
    set({
      testId,
      testName,
      questions,
      totalQuestions: questions.length,
      currentIndex: 0,
      answers: {},
      status: "active",
      startedAt: new Date().toISOString(),
      timeSpentSeconds: 0,
    }),

  submitAnswer: (questionId, data) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: data },
    })),

  goNext: () =>
    set((state) => {
      const next = state.currentIndex + 1;
      if (next >= state.totalQuestions) {
        return { status: "completed" };
      }
      return { currentIndex: next };
    }),

  goPrev: () =>
    set((state) => ({
      currentIndex: Math.max(0, state.currentIndex - 1),
    })),

  goToQuestion: (index) =>
    set((state) => ({
      currentIndex: Math.max(0, Math.min(index, state.totalQuestions - 1)),
    })),

  pause: () => set({ status: "paused" }),
  resume: () => set({ status: "active" }),

  complete: () => set({ status: "completed" }),

  reset: () =>
    set({
      testId: null,
      testName: "",
      questions: [],
      totalQuestions: 0,
      currentIndex: 0,
      answers: {},
      status: "idle",
      startedAt: null,
      timeSpentSeconds: 0,
    }),

  tick: () =>
    set((state) => ({
      timeSpentSeconds: state.timeSpentSeconds + 1,
    })),
}));
