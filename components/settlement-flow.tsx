"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, ArrowRight, Loader2 } from "lucide-react"
import { useIntentStore } from "@/lib/store"

export default function SettlementFlow() {
  const {
    currentStep,
    winningSolver,
    selectedSourceChain,
    selectedDestinationChain,
    setIsSettling,
    setIsExecuting,
    nextStep,
  } = useIntentStore()

  const [userTxStatus, setUserTxStatus] = useState<"pending" | "confirming" | "confirmed">("pending")
  const [solverTxStatus, setSolverTxStatus] = useState<"waiting" | "executing" | "confirmed">("waiting")
  const [progress, setProgress] = useState(0)

  const isUserSettlement = currentStep === 6
  const isSolverExecution = currentStep === 7

  useEffect(() => {
    if (isUserSettlement) {
      setIsSettling(true)

      // Simulate user transaction flow
      const timer1 = setTimeout(() => {
        setUserTxStatus("confirming")
        setProgress(30)
      }, 2000)

      const timer2 = setTimeout(() => {
        setUserTxStatus("confirmed")
        setProgress(60)
        setIsSettling(false)
        nextStep() // Move to solver execution
      }, 5000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [isUserSettlement, setIsSettling, nextStep])

  useEffect(() => {
    if (isSolverExecution) {
      setIsExecuting(true)

      // Simulate solver execution
      const timer1 = setTimeout(() => {
        setSolverTxStatus("executing")
        setProgress(80)
      }, 1500)

      const timer2 = setTimeout(() => {
        setSolverTxStatus("confirmed")
        setProgress(100)
        setIsExecuting(false)
        nextStep() // Move to redemption
      }, 4000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [isSolverExecution, setIsExecuting, nextStep])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
      case "waiting":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      case "confirming":
      case "executing":
        return <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 animate-spin" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string, isUser: boolean) => {
    if (isUser) {
      switch (status) {
        case "pending":
          return "Waiting for transaction submission"
        case "confirming":
          return "Confirming on blockchain..."
        case "confirmed":
          return "Transaction confirmed"
        default:
          return "Pending"
      }
    } else {
      switch (status) {
        case "waiting":
          return "Waiting for user confirmation"
        case "executing":
          return "Executing on destination chain..."
        case "confirmed":
          return "Execution confirmed"
        default:
          return "Waiting"
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-garden-rose-500" />
            {isUserSettlement ? "User Settlement" : "Solver Execution"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              {isUserSettlement ? "Submitting Your Transaction" : "Solver Executing on Destination Chain"}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              {isUserSettlement
                ? `Confirming your ${winningSolver?.quote.inputAmount} ETH transaction on ${selectedSourceChain?.name}`
                : `${winningSolver?.name} is executing the swap on ${selectedDestinationChain?.name}`}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(userTxStatus)}
                <div>
                  <div className="font-semibold text-sm sm:text-base">User Transaction</div>
                  <div className="text-xs sm:text-sm text-gray-600">{getStatusText(userTxStatus, true)}</div>
                </div>
              </div>
              <Badge
                variant={userTxStatus === "confirmed" ? "default" : "secondary"}
                className="text-xs sm:text-sm w-fit"
              >
                {selectedSourceChain?.name}
              </Badge>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 rotate-90 sm:rotate-0" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(solverTxStatus)}
                <div>
                  <div className="font-semibold text-sm sm:text-base">Solver Execution</div>
                  <div className="text-xs sm:text-sm text-gray-600">{getStatusText(solverTxStatus, false)}</div>
                </div>
              </div>
              <Badge
                variant={solverTxStatus === "confirmed" ? "default" : "secondary"}
                className="text-xs sm:text-sm w-fit"
              >
                {selectedDestinationChain?.name}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-garden-mint-200" />
          </div>

          {winningSolver && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={winningSolver.avatar || "/placeholder.svg"}
                  alt={winningSolver.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
                <div>
                  <div className="font-semibold text-sm sm:text-base">{winningSolver.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Executing your intent</div>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Expected Output:</span>
                  <span className="font-medium">{winningSolver.quote.outputAmount} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Time:</span>
                  <span className="font-medium">{winningSolver.quote.estimatedTime}</span>
                </div>
              </div>
            </div>
          )}

          {userTxStatus === "confirmed" && solverTxStatus === "confirmed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-garden-mint-50 border border-garden-mint-200 rounded-lg p-4 sm:p-6"
            >
              <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-base sm:text-lg font-semibold text-green-700 mb-2">Settlement Complete!</h3>
              <p className="text-sm sm:text-base text-green-600">Your tokens are ready for redemption.</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
