"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Shield, Clock } from "lucide-react"
import { useIntentStore } from "@/lib/store"

export default function SolverSelection() {
  const { solvers, setWinningSolver, nextStep } = useIntentStore()
  const [selectedSolver, setSelectedSolver] = useState(null)
  const [showReasoning, setShowReasoning] = useState(false)

  useEffect(() => {
    // Auto-select the best solver after a delay
    const timer = setTimeout(() => {
      const bestSolver = solvers.reduce((best, current) =>
        Number.parseFloat(current.quote.outputAmount) > Number.parseFloat(best.quote.outputAmount) ? current : best,
      )
      setSelectedSolver(bestSolver)
      setWinningSolver(bestSolver)
      setShowReasoning(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [solvers, setWinningSolver])

  const handleProceed = () => {
    nextStep()
  }

  const getSelectionReason = (solver) => {
    const reasons = []
    const bestQuote = Math.max(...solvers.map((s) => Number.parseFloat(s.quote.outputAmount)))

    if (Number.parseFloat(solver.quote.outputAmount) === bestQuote) {
      reasons.push("Best quote offered")
    }
    if (solver.stakerScore >= 90) {
      reasons.push("High staker score")
    }
    if (solver.reputation >= 4.7) {
      reasons.push("Excellent reputation")
    }

    return reasons
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-garden-rose-500" />
            Solver Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              {selectedSolver ? "Winner Selected!" : "Evaluating Solvers..."}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              {selectedSolver
                ? "The optimal solver has been chosen based on quote quality and reliability"
                : "Analyzing bids, staker scores, and reputation metrics"}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {solvers.map((solver) => (
              <motion.div
                key={solver.id}
                initial={{ opacity: 0.7, scale: 1 }}
                animate={{
                  opacity: selectedSolver ? (solver.id === selectedSolver.id ? 1 : 0.4) : 0.7,
                  scale: solver.id === selectedSolver?.id ? 1.02 : 1,
                }}
                className={`border rounded-lg p-3 sm:p-4 transition-all ${
                  solver.id === selectedSolver?.id
                    ? "border-garden-mint-500 bg-garden-mint-50 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={solver.avatar || "/placeholder.svg"}
                        alt={solver.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                      />
                      {solver.id === selectedSolver?.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </motion.div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <span className="font-semibold text-base sm:text-lg">{solver.name}</span>
                        {solver.id === selectedSolver?.id && (
                          <Badge className="bg-green-500 text-xs w-fit">
                            <Trophy className="w-3 h-3 mr-1" />
                            Winner
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          <span>Score: {solver.stakerScore}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                          <span>{solver.reputation}/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                          <span>{solver.quote.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-lg sm:text-xl font-bold text-green-600">{solver.quote.outputAmount} USDC</div>
                    <div className="text-xs sm:text-sm text-gray-600">Fee: {solver.quote.fee}</div>
                  </div>
                </div>

                {solver.id === selectedSolver?.id && showReasoning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-200"
                  >
                    <h4 className="font-semibold text-green-700 mb-2 text-sm sm:text-base">Selection Reasoning:</h4>
                    <ul className="space-y-1">
                      {getSelectionReason(solver).map((reason, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs sm:text-sm text-green-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {selectedSolver && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center pt-2 sm:pt-4"
            >
              <Button
                onClick={handleProceed}
                size="lg"
                className="w-full sm:w-auto min-w-48 bg-garden-rose-500 hover:bg-garden-rose-600 text-white h-11 sm:h-12 text-base sm:text-lg"
              >
                Proceed to Settlement
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
