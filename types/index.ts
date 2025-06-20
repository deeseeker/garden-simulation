export interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  logoUrl: string
}

export interface Chain {
  id: number
  name: string
  logoUrl: string
}

export interface Quote {
  inputAmount: string
  outputAmount: string
  rate: number
  fee: string
  estimatedTime: string
}

export interface Intent {
  id: string
  inputToken: Token
  outputToken: Token
  sourceChain: Chain
  destinationChain: Chain
  inputAmount: string
  outputAmount: string
  user: string
  timestamp: number
  signature?: string
}

export interface Solver {
  id: string
  name: string
  stakerScore: number
  quote: Quote
  reputation: number
  avatar: string
}

export interface IntentState {
  currentStep: number
  selectedInputToken: Token | null
  selectedOutputToken: Token | null
  selectedSourceChain: Chain | null
  selectedDestinationChain: Chain | null
  inputAmount: string
  quote: Quote | null
  intent: Intent | null
  solvers: Solver[]
  winningSolver: Solver | null
  isSettling: boolean
  isExecuting: boolean
  isRedeemed: boolean
}

export interface IntentActions {
  setCurrentStep: (step: number) => void
  setSelectedInputToken: (token: Token) => void
  setSelectedOutputToken: (token: Token) => void
  setSelectedSourceChain: (chain: Chain) => void
  setSelectedDestinationChain: (chain: Chain) => void
  setInputAmount: (amount: string) => void
  setQuote: (quote: Quote) => void
  setIntent: (intent: Intent) => void
  setSolvers: (solvers: Solver[]) => void
  setWinningSolver: (solver: Solver) => void
  setIsSettling: (settling: boolean) => void
  setIsExecuting: (executing: boolean) => void
  setIsRedeemed: (redeemed: boolean) => void
  nextStep: () => void
  reset: () => void
}

export type IntentStore = IntentState & IntentActions
