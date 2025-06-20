import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format time in MM:SS.MS format
 * @param time - Time in milliseconds
 * @returns Formatted time string
 */
export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60000)
  const seconds = Math.floor((time % 60000) / 1000)
  const milliseconds = Math.floor((time % 1000) / 10)

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
}

/**
 * Generate a unique ID with optional prefix
 * @param prefix - Optional prefix for the ID
 * @returns Unique identifier string
 */
export function generateId(prefix = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Sleep utility for async operations
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after specified time
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Format currency amounts with proper decimals
 * @param amount - Amount to format
 * @param decimals - Number of decimal places
 * @returns Formatted amount string
 */
export function formatAmount(amount: string | number, decimals = 6): string {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
  return num.toFixed(decimals)
}

/**
 * Truncate address for display
 * @param address - Ethereum address
 * @param start - Characters to show at start
 * @param end - Characters to show at end
 * @returns Truncated address
 */
export function truncateAddress(address: string, start = 6, end = 4): string {
  if (address.length <= start + end) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}
