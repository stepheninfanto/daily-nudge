import { useState } from 'react';
import { X } from 'lucide-react';

export function DailyReflection({ 
  isOpen, 
  reflection, 
  onUpdate, 
  onSave, 
  onSkip, 
  streak 
}) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const questions = [
    {
      field: 'accomplished',
      question: 'What is one thing you accomplished today?',
      placeholder: 'Completed that project task...',
      hint: 'Small wins count too!'
    },
    {
      field: 'grateful',
      question: 'What are you grateful for?',
      placeholder: 'My morning coffee...',
      hint: 'Notice the good around you'
    },
    {
      field: 'wastedFocus',
      question: 'What drained your focus today?',
      placeholder: 'Mindless scrolling...',
      hint: 'Be honest with yourself'
    },
    {
      field: 'improvement',
      question: 'What will you do better tomorrow?',
      placeholder: 'Set phone to airplane mode...',
      hint: 'One small change at a time'
    }
  ];

  const currentQuestion = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onSave();
    setIsSubmitting(false);
    setStep(0);
  };

  const handleSkip = () => {
    setStep(0);
    onSkip();
  };

  const progress = ((step + 1) / questions.length) * 100;
  const canProceed = reflection[currentQuestion.field]?.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleSkip}
      />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-night-800 rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-night-700">
          <div className="flex items-center gap-3">
            <span className="text-lg">🌙</span>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Daily Reflection
            </h2>
          </div>
          <button
            onClick={handleSkip}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-night-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full h-1 bg-gray-100 dark:bg-night-700">
          <div 
            className="h-full bg-accent-light dark:bg-accent-dark transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {step + 1} of {questions.length}
            </p>
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
              {currentQuestion.question}
            </h3>
            <p className="text-sm text-accent-light dark:text-accent-dark mt-1">
              {currentQuestion.hint}
            </p>
          </div>

          <textarea
            value={reflection[currentQuestion.field]}
            onChange={(e) => onUpdate(currentQuestion.field, e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full h-32 p-4 rounded-xl border border-gray-200 dark:border-night-600 bg-gray-50 dark:bg-night-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-accent-light/50 dark:focus:ring-accent-dark/50 transition-shadow"
            autoFocus
          />
        </div>

        <div className="flex items-center justify-between gap-4 p-5 border-t border-gray-100 dark:border-night-700 bg-gray-50/50 dark:bg-night-700/50">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
          >
            Back
          </button>

          {step === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting}
              className="px-6 py-2.5 bg-accent-light dark:bg-accent-dark text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Complete {streak > 0 ? `🔥 +1 streak` : ''}
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-6 py-2.5 bg-accent-light dark:bg-accent-dark text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
