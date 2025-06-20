"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, BookOpen } from "lucide-react"
import { useIntentStore } from "@/lib/store"

export default function OrderBookSubmission() {
  const { intent, nextStep } = useIntentStore()
  const [isSubmitting, setIsSubmitting] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Auto-proceed to auction
      setTimeout(() => {
        nextStep()
      }, 2000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [nextStep])

  const mockPendingIntents = [
    {
      id: "intent_1703123456789",
      from: "ETH",
      to: "USDC",
      amount: "2.5",
      status: "pending",
      timestamp: Date.now() - 300000,
    },
    {
      id: "intent_1703123456790",
      from: "WBTC",
      to: "ETH",
      amount: "0.1",
      status: "pending",
      timestamp: Date.now() - 600000,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-garden-rose-500" />
            Order Book Submission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-garden-mint-100 flex items-center justify-center"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-500" />
              )}
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">
              {isSubmitting ? "Submitting to Order Book..." : "Successfully Added to Order Book"}
            </h3>
            <p className="text-gray-600">
              {isSubmitting
                ? "Your signed intent is being added to the pending intents pool"
                : "Your intent is now visible to solvers and ready for auction"}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Pending Intents</h4>
            <div className="space-y-3">
              {/* Current intent */}
              {isSubmitted && intent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-2 border-garden-mint-200 bg-garden-mint-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-green-100 text-green-700">
                        Your Intent
                      </Badge>
                      <span className="font-medium">
                        {intent.inputAmount} {intent.inputToken?.symbol} → {intent.outputAmount}{" "}
                        {intent.outputToken?.symbol}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      Just now
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mock existing intents */}
              {mockPendingIntents.map((mockIntent, index) => (
                <div key={mockIntent.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Pending</Badge>
                      <span className="font-medium">
                        {mockIntent.amount} {mockIntent.from} → {mockIntent.to}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {Math.floor((Date.now() - mockIntent.timestamp) / 60000)}m ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isSubmitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-gray-600">
              Proceeding to auction phase...
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
