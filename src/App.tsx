/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Interactive Modal
          </h1>
          <p className="text-zinc-500">
            Click the button below to trigger a beautifully crafted modal dialog.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-semibold shadow-lg shadow-zinc-200 hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
        >
          Open Modal
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-zinc-100"
              >
                {/* Header */}
                <div className="relative h-32 bg-zinc-900 flex items-center justify-center">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                    <Info className="text-zinc-900" size={32} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 text-center space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-zinc-900">Important Update</h2>
                    <p className="text-zinc-500 leading-relaxed">
                      Your workspace has been successfully synchronized with the cloud. 
                      All your changes are now safe and accessible from any device.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 bg-zinc-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
                    >
                      <CheckCircle2 size={18} />
                      Got it, thanks!
                    </motion.button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 text-zinc-500 font-medium hover:text-zinc-900 transition-colors"
                    >
                      Remind me later
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
