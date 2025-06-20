"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, CheckCircle, RotateCcw } from "lucide-react"
import { useIntentStore } from "@/lib/store"

export default function RedeemCard() {
  const { winningSolver, selectedOutputToken, selectedDestinationChain, setIsRedeemed, reset } = useIntentStore()

  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isRedeemed, setIsRedeemedLocal] = useState(false)

  const handleRedeem = async () => {
    setIsRedeeming(true)

    // Simulate redemption process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsRedeeming(false)
    setIsRedeemedLocal(true)
    setIsRedeemed(true)
  }

  const handleStartOver = () => {
    reset()
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-garden-rose-500" />
            Token Redemption
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
            >
              {isRedeemed ? (
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
              ) : (
                <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
              )}
            </motion.div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {isRedeemed ? "Tokens Successfully Redeemed!" : "Your Tokens Are Ready!"}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              {isRedeemed
                ? "The cross-chain intent has been completed successfully."
                : "Your cross-chain swap has been executed and tokens are available for redemption."}
            </p>
          </div>

          <div className="bg-garden-alt2 border border-garden-rose-200 rounded-lg p-4 sm:p-6">
            <div className="text-center mb-4">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                {winningSolver?.quote.outputAmount} {selectedOutputToken?.symbol}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Available on {selectedDestinationChain?.name}</div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Solver:</span>
                <div className="flex items-center gap-2">
                  <img
                    src={winningSolver?.avatar || "/placeholder.svg"}
                    alt={winningSolver?.name}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                  />
                  <span className="font-medium text-xs sm:text-sm">{winningSolver?.name}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Network:</span>
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  <img
                    src={selectedDestinationChain?.logoUrl || "/placeholder.svg"}
                    alt=""
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                  {selectedDestinationChain?.name}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">Total Fee:</span>
                <span className="font-medium text-xs sm:text-sm">{winningSolver?.quote.fee}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {!isRedeemed ? (
              <Button
                onClick={handleRedeem}
                disabled={isRedeeming}
                className="flex-1 bg-garden-mint-500 hover:bg-garden-mint-600 text-white h-11 sm:h-12 text-base sm:text-lg"
                size="lg"
              >
                {isRedeeming ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Redeeming...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Redeem Tokens
                  </div>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleStartOver}
                variant="outline"
                className="flex-1 h-11 sm:h-12 text-base sm:text-lg"
                size="lg"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Start New Intent
                </div>
              </Button>
            )}
          </div>

          {isRedeemed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4"
            >
              <h4 className="font-semibold text-green-700 mb-2 text-sm sm:text-base">Intent Lifecycle Complete!</h4>
              <p className="text-xs sm:text-sm text-green-600">
                Your cross-chain intent has been successfully processed through the Garden Protocol. The tokens have
                been transferred to your wallet on {selectedDestinationChain?.name}.
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
