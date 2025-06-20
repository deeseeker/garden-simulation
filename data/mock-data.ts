import type { Token, Chain, Solver } from "@/types"

/**
 * Mock token data for demonstration
 */
export const mockTokens: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    logoUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0xa0b86a33e6776e681c6c5b7f4b8c5b8e8f8e8f8e",
    decimals: 6,
    logoUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 8,
    logoUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
    decimals: 18,
    logoUrl: "/placeholder.svg?height=32&width=32",
  },
]

/**
 * Mock blockchain data for demonstration
 */
export const mockChains: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    logoUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 42161,
    name: "Arbitrum",
    logoUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 10,
    name: "Optimism",
    logoUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 137,
    name: "Polygon",
    logoUrl: "/placeholder.svg?height=32&width=32",
  },
]

/**
 * Mock solver data for auction simulation
 */
export const mockSolvers: Solver[] = [
  {
    id: "solver-1",
    name: "Lightning Solver",
    stakerScore: 95,
    reputation: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
    quote: {
      inputAmount: "1.0",
      outputAmount: "2847.32",
      rate: 2847.32,
      fee: "0.1%",
      estimatedTime: "2-3 minutes",
    },
  },
  {
    id: "solver-2",
    name: "Flash Bridge",
    stakerScore: 88,
    reputation: 4.6,
    avatar: "/placeholder.svg?height=40&width=40",
    quote: {
      inputAmount: "1.0",
      outputAmount: "2845.18",
      rate: 2845.18,
      fee: "0.15%",
      estimatedTime: "3-4 minutes",
    },
  },
  {
    id: "solver-3",
    name: "Quantum Router",
    stakerScore: 92,
    reputation: 4.7,
    avatar: "/placeholder.svg?height=40&width=40",
    quote: {
      inputAmount: "1.0",
      outputAmount: "2849.67",
      rate: 2849.67,
      fee: "0.08%",
      estimatedTime: "1-2 minutes",
    },
  },
]

/**
 * Generate a mock quote based on input parameters
 * @param inputAmount - Amount to swap
 * @param inputToken - Input token
 * @param outputToken - Output token
 * @returns Mock quote object
 */
export function generateMockQuote(inputAmount: string, inputToken: Token, outputToken: Token) {
  const amount = Number.parseFloat(inputAmount) || 0
  let rate = 1

  // Mock exchange rates - in production, this would come from an API
  if (inputToken.symbol === "ETH" && outputToken.symbol === "USDC") {
    rate = 2847.32
  } else if (inputToken.symbol === "USDC" && outputToken.symbol === "ETH") {
    rate = 0.000351
  } else if (inputToken.symbol === "WBTC" && outputToken.symbol === "USDC") {
    rate = 43250.18
  }

  const outputAmount = (amount * rate * 0.999).toFixed(6) // 0.1% fee

  return {
    inputAmount,
    outputAmount,
    rate,
    fee: "0.1%",
    estimatedTime: "2-3 minutes",
  }
}
