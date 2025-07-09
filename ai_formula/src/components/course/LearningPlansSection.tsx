import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { LearningPlansProps } from '@/types/courseTypes';

const LearningPlansSection: React.FC<LearningPlansProps> = ({ 
  plans, 
  isZhTW, 
  onPlanClick 
}) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {isZhTW ? '學習計劃' : 'Learning Plans'}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {isZhTW 
              ? '選擇適合你的學習計劃，免費入門或升級至專業版本。'
              : 'Choose your learning plan - start free or upgrade to professional version.'
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="group"
            >
              <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`bg-gradient-to-br ${plan.gradient} p-3 rounded-xl text-2xl shadow-lg`}>
                      {plan.icon}
                    </div>
                    <CardTitle className="text-white">
                      {isZhTW ? plan.titleCht : plan.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    {isZhTW ? plan.descriptionCht : plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Free Plan */}
                    <div className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">
                          {isZhTW ? '免費版' : 'Free Plan'}
                        </h4>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {isZhTW ? plan.freePrice : plan.freePriceEn}
                        </Badge>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {(isZhTW ? plan.freeIncludesCht : plan.freeIncludes).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full mt-3 text-black bg-white border-gray-300 hover:bg-gray-100"
                        onClick={() => onPlanClick(plan.id, 'free')}
                        aria-label={`Start ${isZhTW ? plan.titleCht : plan.title} free plan`}
                      >
                        {isZhTW ? '免費開始' : 'Start Free'}
                      </Button>
                    </div>

                    {/* Pro Plan */}
                    <div className="border border-yellow-500/50 rounded-lg p-4 bg-yellow-500/5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">
                          {isZhTW ? '專業版' : 'Pro Plan'}
                        </h4>
                        <Badge className="bg-yellow-500 text-black">
                          {isZhTW ? '推薦' : 'Recommended'}
                        </Badge>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1 mb-4">
                        {(isZhTW ? plan.proIncludesCht : plan.proIncludes).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-white">{plan.proPrice}</span>
                        <span className="text-sm text-gray-500 line-through">{plan.originalPrice}</span>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {isZhTW ? `節省${plan.savings}` : `Save ${plan.savings}`}
                        </Badge>
                      </div>
                      <Button 
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                        onClick={() => onPlanClick(plan.id, 'pro')}
                        aria-label={`Upgrade to ${isZhTW ? plan.titleCht : plan.title} pro plan`}
                      >
                        {isZhTW ? '升級至專業版' : 'Upgrade to Pro'}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(LearningPlansSection); 