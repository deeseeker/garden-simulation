"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.id < currentStep
                    ? "bg-garden-mint-500 border-garden-mint-500 text-white"
                    : step.id === currentStep
                      ? "bg-white border-garden-rose-500 text-garden-rose-500"
                      : "bg-white border-gray-300 text-gray-400"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </motion.div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className="h-0.5 bg-gray-200 relative">
                  <motion.div
                    className="h-full bg-garden-mint-400"
                    initial={{ width: "0%" }}
                    animate={{
                      width: step.id < currentStep ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="overflow-x-auto pb-4">
          <div className="flex items-center space-x-4 min-w-max px-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-0">
                  <motion.div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${
                      step.id < currentStep
                        ? "bg-garden-mint-500 border-garden-mint-500 text-white"
                        : step.id === currentStep
                          ? "bg-white border-garden-rose-500 text-garden-rose-500"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <span className="text-xs sm:text-sm font-semibold">{step.id}</span>
                    )}
                  </motion.div>
                  <div className="mt-1 sm:mt-2 text-center">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">{step.title}</p>
                    <p className="text-xs text-gray-500 whitespace-nowrap hidden sm:block">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-shrink-0 mx-2 sm:mx-4">
                    <div className="w-8 sm:w-12 h-0.5 bg-gray-200 relative">
                      <motion.div
                        className="h-full bg-garden-mint-400"
                        initial={{ width: "0%" }}
                        animate={{
                          width: step.id < currentStep ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Info for Mobile */}
        <div className="text-center mt-2 sm:hidden">
          <p className="text-sm font-medium text-gray-900">
            Step {currentStep}: {steps[currentStep - 1]?.title}
          </p>
          <p className="text-xs text-gray-500">{steps[currentStep - 1]?.description}</p>
        </div>
      </div>
    </div>
  )
}
