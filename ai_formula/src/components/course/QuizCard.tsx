import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Trophy, Award, Check, XCircle } from 'lucide-react';

// TypeScript ?•Âè£ÂÆöÁæ©
interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

interface QuizCardProps {
  questions: QuizQuestion[];
  isZhTW: boolean;
}

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  onSubmit: (score: number) => void;
  onBack: () => void;
  isZhTW: boolean;
}

// Hook: ÁÆ°Á? Quiz ?≤Â∫¶?åÁ???
const useQuizProgress = (isZhTW: boolean) => {
  const ATTEMPT_LIMIT = 5;
  const attemptKey = isZhTW ? 'pe_lesson2_quiz_attempts_zh' : 'pe_lesson2_quiz_attempts_en';
  const scoreKey = isZhTW ? 'pe_lesson2_quiz_score_zh' : 'pe_lesson2_quiz_score_en';

  // ÂÆâÂÖ®??localStorage ?ç‰?
  const getStoredValue = useCallback((key: string, defaultValue: any) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('localStorage error:', error);
      return defaultValue;
    }
  }, []);

  const setStoredValue = useCallback((key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage error:', error);
    }
  }, []);

  const [score, setScore] = useState<number | null>(() => {
    const val = localStorage.getItem(scoreKey);
    return val ? Number(val) : null;
  });

  const [attempts, setAttempts] = useState(() => {
    const val = localStorage.getItem(attemptKey);
    return val ? Number(val) : 0;
  });

  const updateScore = useCallback((newScore: number) => {
    if (score === null || newScore > score) {
      setScore(newScore);
      localStorage.setItem(scoreKey, String(newScore));
    }
  }, [score, scoreKey]);

  const incrementAttempts = useCallback(() => {
    if (attempts < ATTEMPT_LIMIT) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem(attemptKey, String(newAttempts));
      return true;
    }
    return false;
  }, [attempts, attemptKey, ATTEMPT_LIMIT]);

  const attemptsLeft = ATTEMPT_LIMIT - attempts;
  const percent = score !== null ? Math.round((score / 5) * 100) : null;
  const passed = percent !== null && percent >= 70;

  return {
    score,
    attempts,
    attemptsLeft,
    percent,
    passed,
    canAttempt: attempts < ATTEMPT_LIMIT,
    updateScore,
    incrementAttempts,
    ATTEMPT_LIMIT
  };
};

// InteractiveQuiz ÁµÑ‰ª∂
const InteractiveQuiz: React.FC<InteractiveQuizProps> = memo(({ questions, onSubmit, onBack, isZhTW }) => {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = useCallback((qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => {
      const copy = [...prev];
      copy[qIdx] = optIdx;
      return copy;
    });
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
    });
    setScore(s);
    setSubmitted(true);
    onSubmit?.(s);
  }, [submitted, questions, answers, onSubmit]);

  const handleRedo = useCallback(() => {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
    setScore(0);
  }, [questions.length]);

  const percent = useMemo(() => 
    score !== null ? Math.round((score / questions.length) * 100) : null,
    [score, questions.length]
  );
  
  const pass = useMemo(() => 
    percent !== null && percent >= 70,
    [percent]
  );

  return (
    <div className="space-y-8">
      {questions.map((q, i) => (
        <div key={i} className="bg-gray-800 rounded-xl p-6">
          <div className="font-semibold mb-2">{q.q}</div>
          <div className="space-y-2">
            {q.options.map((opt, j) => (
              <label key={j} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-all
                ${answers[i] === j ? 'bg-blue-900 text-blue-300' : 'hover:bg-gray-700'}
                ${submitted && q.answer === j ? 'border border-green-400' : ''}
                ${submitted && answers[i] === j && answers[i] !== q.answer ? 'border border-red-400' : ''}
              `}>
                <input
                  type="radio"
                  name={`q${i}`}
                  value={j}
                  checked={answers[i] === j}
                  disabled={submitted}
                  onChange={() => handleSelect(i, j)}
                  className="accent-blue-500"
                />
                <span>{opt}</span>
                {submitted && q.answer === j && (
                  <span className="ml-2 text-green-400 font-bold">{isZhTW ? 'Ê≠?¢∫Á≠îÊ?' : 'Correct'}</span>
                )}
                {submitted && answers[i] === j && answers[i] !== q.answer && (
                  <span className="ml-2 text-red-400 font-bold">{isZhTW ? '‰Ω†Á??∏Ê?' : 'Your choice'}</span>
                )}
              </label>
            ))}
          </div>
          {submitted && answers[i] !== q.answer && (
            <div className="mt-2 text-sm text-yellow-300">
              {isZhTW ? 'Ê≠?¢∫Á≠îÊ?Ôº? : 'Correct answer: '}
              <b>{q.options[q.answer]}</b>
            </div>
          )}
        </div>
      ))}
      
      {!submitted && (
        <button
          className="mt-4 px-8 py-3 rounded-lg font-bold text-lg transition-all bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={answers.some(a => a === null)}
        >
          {isZhTW ? '?ê‰∫§Á≠îÊ?' : 'Submit Answers'}
        </button>
      )}
      
      {submitted && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="text-xl font-bold text-blue-400">
            {isZhTW ? '‰Ω†Á??ÜÊï∏Ôº? : 'Your Score: '}{percent}%
          </div>
          <div className={`mt-2 font-semibold ${pass ? 'text-green-400' : 'text-red-400'}`}>
            {pass ? (isZhTW ? '?àÊ†º' : 'Passed') : (isZhTW ? '?™Â??? : 'Not passed')}
          </div>
          <div className="flex gap-4">
            {score === questions.length ? (
              <button
                className="px-8 py-3 rounded-lg font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white"
                onClick={onBack}
              >
                {isZhTW ? 'ËøîÂ?Â∞èÊ∏¨È©? : 'Back to Quiz'}
              </button>
            ) : (
              <>
                <button
                  className="px-8 py-3 rounded-lg font-bold text-lg bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={handleRedo}
                >
                  {isZhTW ? '?çÂ?' : 'Redo'}
                </button>
                <button
                  className="px-8 py-3 rounded-lg font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={onBack}
                >
                  {isZhTW ? 'ËøîÂ?Â∞èÊ∏¨È©? : 'Back to Quiz'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

InteractiveQuiz.displayName = 'InteractiveQuiz';

// QuizCard ÁµÑ‰ª∂
const QuizCard: React.FC<QuizCardProps> = memo(({ questions, isZhTW }) => {
  const quizProgress = useQuizProgress(isZhTW);
  const [started, setStarted] = useState(false);
  const [latestScore, setLatestScore] = useState<number | null>(null);

  useEffect(() => {
    if (latestScore !== null) {
      quizProgress.updateScore(latestScore);
    }
  }, [latestScore, quizProgress]);

  const handleQuizSubmit = useCallback((score: number) => {
    setLatestScore(score);
  }, []);

  const handleBack = useCallback(() => {
    setStarted(false);
    setLatestScore(null);
  }, []);

  const handleStart = useCallback(() => {
    if (quizProgress.canAttempt && quizProgress.incrementAttempts()) {
      setStarted(true);
    }
  }, [quizProgress]);

  const attemptsMsg = isZhTW
    ? `Â∑≤Â?Ë©?${quizProgress.attempts} Ê¨°`
    : `${quizProgress.attempts} attempt${quizProgress.attempts !== 1 ? 's' : ''} made`;

  if (!started) {
    return (
      <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl p-8 shadow-xl flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-300">{isZhTW ? 'Â∞èÊ∏¨È©? : 'Quiz'}</h2>
          <div className="text-blue-400 font-semibold mb-4">{isZhTW ? '?™Ë≥™?êÁ§∫ÁµêÊ?' : 'Prompt Structure'}</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 mb-4 shadow-xl animate-fade-in">
          <div className="font-bold mb-2">{isZhTW ? '‰ΩúÊ•≠Ë©≥Ê?' : 'Assignment details'}</div>
          <div className="flex items-center gap-8">
            <div className="text-sm text-gray-300">
              <div className="font-semibold">{isZhTW ? '?óË©¶Ê¨°Êï∏' : 'Attempts'}</div>
              <div>{isZhTW ? '?ÄÂ§?5 Ê¨? : 'Max 5 times'}</div>
              <div className="mt-1 text-xs text-yellow-300">{attemptsMsg}</div>
            </div>
          </div>
          <button
            className={`mt-6 px-8 py-3 rounded-lg font-bold text-lg transition-all ${
              !quizProgress.canAttempt 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={handleStart}
            disabled={!quizProgress.canAttempt}
          >
            {!quizProgress.canAttempt ? (isZhTW ? 'Â∑≤È?‰∏äÈ?' : 'No more attempts') : (isZhTW ? '?ãÂ?' : 'Start')}
          </button>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl animate-fade-in">
          <div className="font-bold mb-2 flex items-center gap-2">
            {quizProgress.passed ? (
              <Trophy className="inline-block w-6 h-6 ai-text-primary mr-1" />
            ) : (
              <Award className="inline-block w-6 h-6 text-gray-400 mr-1" />
            )}
            {isZhTW ? '‰Ω†Á??ÜÊï∏' : 'Your grade'}
          </div>
          <div className="text-gray-400 text-sm mb-2">
            {isZhTW ? '‰Ω†Êú™?ê‰∫§?éÁ?Ê°à„ÄÇÊ??ëÊ?Ë®òÈ?‰Ω†Ê?È´òÂ??? : "You haven't submitted this yet. We keep your highest score."}
          </div>
          <div className="text-3xl font-extrabold flex items-center justify-center gap-2 mb-2">
            {quizProgress.percent !== null ? (
              <span className="ai-text-primary">{quizProgress.percent}%</span>
            ) : '--'}
          </div>
          <hr className="my-3 border-gray-700" />
          {quizProgress.percent !== null && (
            <div className={`mt-2 font-semibold flex items-center gap-2 ${quizProgress.passed ? 'text-green-400' : 'text-red-400'}`}>
              {quizProgress.passed ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              {quizProgress.passed ? (isZhTW ? '?àÊ†º' : 'Passed') : (isZhTW ? '?™Â??? : 'Not passed')}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <InteractiveQuiz
      questions={questions}
      onSubmit={handleQuizSubmit}
      onBack={handleBack}
      isZhTW={isZhTW}
    />
  );
});

QuizCard.displayName = 'QuizCard';

export default React.memo(QuizCard);
export type { QuizQuestion, QuizCardProps }; 