"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Timer, Trophy, Zap } from "lucide-react"
import { useIntentStore } from "@/lib/store"
import { mockSolvers } from "@/data/mock-data"

export default function AuctionSimulator() {
  const { setSolvers, nextStep } = useIntentStore()
  const [timeLeft, setTimeLeft] = useState(5)
  const [currentBids, setCurrentBids] = useState(mockSolvers.map((solver) => ({ ...solver, hasSubmitted: false })))
  const [auctionPhase, setAuctionPhase] = useState<"bidding" | "challenge" | "complete">("bidding")

  useEffect(() => {
    setSolvers(mockSolvers)

    // Simulate solvers submitting bids
    const bidTimers = mockSolvers.map((_, index) =>
      setTimeout(
        () => {
          setCurrentBids((prev) => prev.map((bid, i) => (i === index ? { ...bid, hasSubmitted: true } : bid)))
        },
        (index + 1) * 800,
      ),
    )

    // Start challenge window after all bids
    const challengeTimer = setTimeout(() => {
      setAuctionPhase("challenge")
      setTimeLeft(5)
    }, 3000)

    return () => {
      bidTimers.forEach(clearTimeout)
      clearTimeout(challengeTimer)
    }
  }, [setSolvers])

  useEffect(() => {
    if (auctionPhase === "challenge" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (auctionPhase === "challenge" && timeLeft === 0) {
      setAuctionPhase("complete")
      setTimeout(() => {
        nextStep()
      }, 2000)
    }
  }, [timeLeft, auctionPhase, nextStep])

  const bestBid = currentBids.reduce((best, current) =>
    Number.parseFloat(current.quote.outputAmount) > Number.parseFloat(best.quote.outputAmount) ? current : best,
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-garden-rose-500" />
            Solver Auction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
              <Badge
                variant={auctionPhase === "bidding" ? "default" : "secondary"}
                className="bg-garden-mint-500 text-xs sm:text-sm"
              >
                Bidding Phase
              </Badge>
              <Badge
                variant={auctionPhase === "challenge" ? "default" : "secondary"}
                className="bg-garden-mint-500 text-xs sm:text-sm"
              >
                Challenge Window
              </Badge>
              <Badge
                variant={auctionPhase === "complete" ? "default" : "secondary"}
                className="bg-garden-mint-500 text-xs sm:text-sm"
              >
                Complete
              </Badge>
            </div>

            {auctionPhase === "challenge" && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span className="text-base sm:text-lg font-semibold">Challenge Window: {timeLeft}s</span>
              </div>
            )}
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg">Solver Bids</h4>
            <AnimatePresence>
              {currentBids.map((solver, index) => (
                <motion.div
                  key={solver.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: solver.hasSubmitted ? 1 : 0.5,
                    x: 0,
                    scale: solver.id === bestBid.id && auctionPhase !== "bidding" ? 1.02 : 1,
                  }}
                  className={`border rounded-lg p-3 sm:p-4 ${
                    solver.id === bestBid.id && auctionPhase !== "bidding"
                      ? "border-garden-mint-500 bg-garden-mint-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={solver.avatar || "/placeholder.svg"}
                        alt={solver.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="font-semibold text-sm sm:text-base">{solver.name}</span>
                          {solver.id === bestBid.id && auctionPhase !== "bidding" && (
                            <Badge className="bg-green-500 text-xs w-fit">
                              <Trophy className="w-3 h-3 mr-1" />
                              Leading
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span>Staker Score: {solver.stakerScore}</span>
                          <span>Reputation: {solver.reputation}/5</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      {solver.hasSubmitted ? (
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-green-600">
                            {solver.quote.outputAmount} USDC
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            Fee: {solver.quote.fee} • {solver.quote.estimatedTime}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-300 border-t-transparent rounded-full"
                          />
                          <span className="text-xs sm:text-sm">Calculating...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {auctionPhase === "challenge" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-garden-orange-50 border border-garden-orange-200 rounded-lg p-3 sm:p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span className="font-semibold text-orange-700 text-sm sm:text-base">Challenge Window Active</span>
              </div>
              <p className="text-xs sm:text-sm text-orange-600 mb-3">
                Higher-ranked solvers have {timeLeft} seconds to match or beat the current best quote.
              </p>
              <Progress value={(5 - timeLeft) * 20} className="h-2" />
            </motion.div>
          )}

          {auctionPhase === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6"
            >
              <Trophy className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-semibold text-green-700 mb-2">Auction Complete!</h3>
              <p className="text-sm sm:text-base text-green-600">Proceeding to solver selection...</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
