"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, Zap } from "lucide-react"
import { useIntentStore } from "@/lib/store"
import { mockTokens, mockChains, generateMockQuote } from "@/data/mock-data"

export default function IntentBuilder() {
  const {
    selectedInputToken,
    selectedOutputToken,
    selectedSourceChain,
    selectedDestinationChain,
    inputAmount,
    setSelectedInputToken,
    setSelectedOutputToken,
    setSelectedSourceChain,
    setSelectedDestinationChain,
    setInputAmount,
    setQuote,
    nextStep,
  } = useIntentStore()

  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false)

  const handleGenerateQuote = async () => {
    if (!selectedInputToken || !selectedOutputToken || !inputAmount) return

    setIsGeneratingQuote(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const quote = generateMockQuote(inputAmount, selectedInputToken, selectedOutputToken)
    setQuote(quote)
    setIsGeneratingQuote(false)
    nextStep()
  }

  const canGenerateQuote =
    selectedInputToken && selectedOutputToken && selectedSourceChain && selectedDestinationChain && inputAmount

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-garden-rose-500" />
            Create Intent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">From Chain</Label>
              <Select
                onValueChange={(value) => {
                  const chain = mockChains.find((c) => c.id.toString() === value)
                  if (chain) setSelectedSourceChain(chain)
                }}
              >
                <SelectTrigger className="h-10 sm:h-11">
                  <SelectValue placeholder="Select source chain" />
                </SelectTrigger>
                <SelectContent>
                  {mockChains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id.toString()}>
                      <div className="flex items-center gap-2">
                        <img src={chain.logoUrl || "/placeholder.svg"} alt={chain.name} className="w-4 h-4" />
                        <span className="text-sm sm:text-base">{chain.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">To Chain</Label>
              <Select
                onValueChange={(value) => {
                  const chain = mockChains.find((c) => c.id.toString() === value)
                  if (chain) setSelectedDestinationChain(chain)
                }}
              >
                <SelectTrigger className="h-10 sm:h-11">
                  <SelectValue placeholder="Select destination chain" />
                </SelectTrigger>
                <SelectContent>
                  {mockChains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id.toString()}>
                      <div className="flex items-center gap-2">
                        <img src={chain.logoUrl || "/placeholder.svg"} alt={chain.name} className="w-4 h-4" />
                        <span className="text-sm sm:text-base">{chain.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base">You Send</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="flex-1 h-10 sm:h-11 text-base"
                />
                <Select
                  onValueChange={(value) => {
                    const token = mockTokens.find((t) => t.symbol === value)
                    if (token) setSelectedInputToken(token)
                  }}
                >
                  <SelectTrigger className="w-full sm:w-32 h-10 sm:h-11">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <img src={token.logoUrl || "/placeholder.svg"} alt={token.symbol} className="w-4 h-4" />
                          <span className="text-sm sm:text-base">{token.symbol}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center py-2">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                <ArrowDownUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm sm:text-base">You Receive</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input placeholder="0.0" disabled className="flex-1 bg-gray-50 h-10 sm:h-11 text-base" />
                <Select
                  onValueChange={(value) => {
                    const token = mockTokens.find((t) => t.symbol === value)
                    if (token) setSelectedOutputToken(token)
                  }}
                >
                  <SelectTrigger className="w-full sm:w-32 h-10 sm:h-11">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <img src={token.logoUrl || "/placeholder.svg"} alt={token.symbol} className="w-4 h-4" />
                          <span className="text-sm sm:text-base">{token.symbol}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGenerateQuote}
            disabled={!canGenerateQuote || isGeneratingQuote}
            className="w-full bg-garden-rose-500 hover:bg-garden-rose-600 text-white h-11 sm:h-12 text-base sm:text-lg"
            size="lg"
          >
            {isGeneratingQuote ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "Get Quote"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
