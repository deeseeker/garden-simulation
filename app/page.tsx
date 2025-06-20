"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIntentStore } from "@/lib/store";
import { STEPS, ANIMATION_DURATION } from "@/lib/constants";
import StepIndicator from "@/components/step-indicator";
import IntentBuilder from "@/components/intent-builder";
import IntentSigning from "@/components/intent-signing";
import OrderBookSubmission from "@/components/order-book-submission";
import AuctionSimulator from "@/components/auction-simulator";
import SolverSelection from "@/components/solver-selection";
import SettlementFlow from "@/components/settlement-flow";
import RedeemCard from "@/components/redeem-card";

/**
 * Step component mapping for the intent lifecycle
 */
const stepComponents = {
  1: IntentBuilder,
  2: IntentSigning,
  3: OrderBookSubmission,
  4: AuctionSimulator,
  5: SolverSelection,
  6: SettlementFlow,
  7: SettlementFlow, // Same component for both settlement steps
  8: RedeemCard,
} as const;

/**
 * Main application page component
 * Renders the complete intent lifecycle simulator
 */
export default function IntentFlow() {
  const currentStep = useIntentStore((state) => state.currentStep);
  const StepComponent =
    stepComponents[currentStep as keyof typeof stepComponents] || IntentBuilder;

  return (
    <div className="bg-garden-main min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-lg">
              <img
                src="/garden_logomark.svg"
                alt="Garden Protocol Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              IntentFlow
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 px-4">
            Garden Protocol Intent Lifecycle Simulator
          </p>
        </header>

        {/* Step Indicator */}
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        {/* Main Content */}
        <main className="mt-6 sm:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: ANIMATION_DURATION.normal }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
