"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Wallet, CheckCircle } from "lucide-react"
import { useIntentStore } from "@/lib/store"

export default function IntentSigning() {
  const {
    selectedInputToken,
    selectedOutputToken,
    selectedSourceChain,
    selectedDestinationChain,
    inputAmount,
    quote,
    setIntent,
    nextStep,
  } = useIntentStore()

  const [isSigning, setIsSigning] = useState(false)
  const [isSigned, setIsSigned] = useState(false)

  const intentData = {
    id: `intent_${Date.now()}`,
    inputToken: selectedInputToken,
    outputToken: selectedOutputToken,
    sourceChain: selectedSourceChain,
    destinationChain: selectedDestinationChain,
    inputAmount,
    outputAmount: quote?.outputAmount || "0",
    user: "0x742d35Cc6634C0532925a3b8D4C9db96590e4CAF",
    timestamp: Date.now(),
    nonce: Math.floor(Math.random() * 1000000),
    deadline: Date.now() + 3600000, // 1 hour
  }

  const handleSign = async () => {
    setIsSigning(true)

    // Simulate wallet signing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const signedIntent = {
      ...intentData,
      signature:
        "0x" +
        Array(130)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
    }

    setIntent(signedIntent)
    setIsSigning(false)
    setIsSigned(true)

    // Auto-proceed after showing success
    setTimeout(() => {
      nextStep()
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-garden-rose-500" />
            Intent Signing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-base sm:text-lg">Quote Summary</h3>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">You Send:</span>
                  <span className="font-medium">
                    {inputAmount} {selectedInputToken?.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">You Receive:</span>
                  <span className="font-medium">
                    {quote?.outputAmount} {selectedOutputToken?.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate:</span>
                  <span className="font-medium text-xs sm:text-sm">
                    1 {selectedInputToken?.symbol} = {quote?.rate.toFixed(2)} {selectedOutputToken?.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-medium">{quote?.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. Time:</span>
                  <span className="font-medium">{quote?.estimatedTime}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-base sm:text-lg">Route</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 text-xs sm:text-sm">
                  <img
                    src={selectedSourceChain?.logoUrl || "/placeholder.svg"}
                    alt=""
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                  {selectedSourceChain?.name}
                </Badge>
                <span className="text-gray-400 hidden sm:inline">→</span>
                <span className="text-gray-400 sm:hidden">↓</span>
                <Badge variant="outline" className="flex items-center gap-1 text-xs sm:text-sm">
                  <img
                    src={selectedDestinationChain?.logoUrl || "/placeholder.svg"}
                    alt=""
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                  {selectedDestinationChain?.name}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-base sm:text-lg">Intent Structure</h3>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-x-auto">
              <pre className="text-gray-700">{JSON.stringify(intentData, null, 2)}</pre>
            </div>
          </div>

          <div className="flex justify-center pt-2 sm:pt-4">
            <Button
              onClick={handleSign}
              disabled={isSigning || isSigned}
              size="lg"
              className="w-full sm:w-auto min-w-48 bg-garden-mint-500 hover:bg-garden-mint-600 text-white h-11 sm:h-12 text-base sm:text-lg"
            >
              {isSigning ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Signing...
                </div>
              ) : isSigned ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Signed Successfully
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Sign Intent
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
