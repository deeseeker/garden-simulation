import { create } from "zustand"
import type { IntentStore } from "@/types"

export const useIntentStore = create<IntentStore>((set) => ({
  // State
  currentStep: 1,
  selectedInputToken: null,
  selectedOutputToken: null,
  selectedSourceChain: null,
  selectedDestinationChain: null,
  inputAmount: "",
  quote: null,
  intent: null,
  solvers: [],
  winningSolver: null,
  isSettling: false,
  isExecuting: false,
  isRedeemed: false,

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedInputToken: (token) => set({ selectedInputToken: token }),
  setSelectedOutputToken: (token) => set({ selectedOutputToken: token }),
  setSelectedSourceChain: (chain) => set({ selectedSourceChain: chain }),
  setSelectedDestinationChain: (chain) => set({ selectedDestinationChain: chain }),
  setInputAmount: (amount) => set({ inputAmount: amount }),
  setQuote: (quote) => set({ quote }),
  setIntent: (intent) => set({ intent }),
  setSolvers: (solvers) => set({ solvers }),
  setWinningSolver: (solver) => set({ winningSolver: solver }),
  setIsSettling: (settling) => set({ isSettling: settling }),
  setIsExecuting: (executing) => set({ isExecuting: executing }),
  setIsRedeemed: (redeemed) => set({ isRedeemed: redeemed }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  reset: () =>
    set({
      currentStep: 1,
      selectedInputToken: null,
      selectedOutputToken: null,
      selectedSourceChain: null,
      selectedDestinationChain: null,
      inputAmount: "",
      quote: null,
      intent: null,
      solvers: [],
      winningSolver: null,
      isSettling: false,
      isExecuting: false,
      isRedeemed: false,
    }),
}))
