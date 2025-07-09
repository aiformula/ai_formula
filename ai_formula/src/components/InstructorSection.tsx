import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BookOpen, Users, Code2, TrendingUp, Brain, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const InstructorSection = () => {
  const { t } = useLanguage();
  
  // Add futuristic styles
  const futuristicStyles = `
    @keyframes pulse-bg {
      0% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 0.7; transform: scale(1); }
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    .card-header-glow:before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(transparent, rgba(0, 255, 255, 0.5), transparent 30%);
      animation: rotate 6s linear infinite;
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 1;
    }
    
    .card-header-glow.pink-glow:before {
      background: conic-gradient(transparent, rgba(236, 72, 153, 0.6), transparent 30%);
    }
    
    .card-header-glow.blue-glow:before {
      background: conic-gradient(transparent, rgba(59, 130, 246, 0.6), transparent 30%);
    }
    
    .card-header-glow.yellow-glow:before {
      background: conic-gradient(transparent, rgba(234, 179, 8, 0.6), transparent 30%);
    }
    
    .card-header-glow.purple-glow:before {
      background: conic-gradient(transparent, rgba(147, 51, 234, 0.6), transparent 30%);
    }
    
    .teacher-card:hover .card-header-glow:before {
      opacity: 1;
    }

    .glow-text {
      text-shadow: 0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.4);
    }

    .section-header {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const instructors = [
    {
      id: 1,
      nameKey: "instructors.sarah.name",
      titleKey: "instructors.sarah.title",
      image: "https://images.unsplash.com/photo-1494790108755-2616b68b8c3b?w=300&h=300&fit=crop&crop=face",
      biographyKey: "instructors.sarah.biography",
      philosophyKey: "instructors.sarah.philosophy",
      qualificationKeys: [
        "instructors.sarah.qual1",
        "instructors.sarah.qual2",
        "instructors.sarah.qual3",
        "instructors.sarah.qual4"
      ],
      experienceKey: "instructors.sarah.experience",
      specialtyKey: "instructors.sarah.specialty",
      color: "from-pink-500 to-rose-600",
      borderColor: "border-pink-500/50",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      id: 2,
      nameKey: "instructors.david.name",
      titleKey: "instructors.david.title",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      biographyKey: "instructors.david.biography",
      philosophyKey: "instructors.david.philosophy",
      qualificationKeys: [
        "instructors.david.qual1",
        "instructors.david.qual2",
        "instructors.david.qual3",
        "instructors.david.qual4"
      ],
      experienceKey: "instructors.david.experience",
      specialtyKey: "instructors.david.specialty",
      color: "from-blue-500 to-cyan-600",
      borderColor: "border-blue-500/50",
      icon: <Code2 className="h-6 w-6" />
    },
    {
      id: 3,
      nameKey: "instructors.emily.name",
      titleKey: "instructors.emily.title",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      biographyKey: "instructors.emily.biography",
      philosophyKey: "instructors.emily.philosophy",
      qualificationKeys: [
        "instructors.emily.qual1",
        "instructors.emily.qual2",
        "instructors.emily.qual3",
        "instructors.emily.qual4"
      ],
      experienceKey: "instructors.emily.experience",
      specialtyKey: "instructors.emily.specialty",
      color: "from-yellow-500 to-orange-600",
      borderColor: "border-yellow-500/50",
      icon: <Code2 className="h-6 w-6" />
    },
    {
      id: 4,
      nameKey: "instructors.michael.name",
      titleKey: "instructors.michael.title",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      biographyKey: "instructors.michael.biography",
      philosophyKey: "instructors.michael.philosophy",
      qualificationKeys: [
        "instructors.michael.qual1",
        "instructors.michael.qual2",
        "instructors.michael.qual3",
        "instructors.michael.qual4"
      ],
      experienceKey: "instructors.michael.experience",
      specialtyKey: "instructors.michael.specialty",
      color: "from-purple-500 to-indigo-600",
      borderColor: "border-purple-500/50",
      icon: <Brain className="h-6 w-6" />
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: futuristicStyles }} />
      <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(13, 110, 253, 0.15), transparent 60%),
              radial-gradient(ellipse at 20% 30%, rgba(214, 40, 255, 0.15), transparent 70%),
              radial-gradient(ellipse at 80% 40%, rgba(0, 255, 255, 0.15), transparent 70%)
            `,
            animation: 'pulse-bg 15s infinite ease-in-out'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 section-header"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              textShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.4)'
            }}
          >
            {t('instructors.title')} <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent glow-text">{t('instructors.titleHighlight')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-4xl mx-auto"
          >
            {t('instructors.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.4 }
              }}
              className="group cursor-pointer h-full"
            >
              <Card 
                className={`teacher-card bg-gray-900/20 border-2 hover:border-opacity-100 transition-all duration-400 overflow-hidden h-full flex flex-col relative`}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${instructor.color.includes('pink') ? 'rgba(236, 72, 153, 0.3)' : 
                                     instructor.color.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : 
                                     instructor.color.includes('yellow') ? 'rgba(234, 179, 8, 0.3)' : 
                                     'rgba(147, 51, 234, 0.3)'}`
                }}
              >
                {/* Header with gradient background and rotating border effect */}
                <div className={`bg-gradient-to-r ${instructor.color} p-6 text-white relative overflow-hidden card-header-glow ${instructor.color.includes('pink') ? 'pink-glow' : 
                                          instructor.color.includes('blue') ? 'blue-glow' : 
                                          instructor.color.includes('yellow') ? 'yellow-glow' : 
                                          'purple-glow'}`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30"
                    >
                      <img 
                        src={instructor.image} 
                        alt={t(instructor.nameKey)}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold text-center mb-1">{t(instructor.nameKey)}</h3>
                    <p className="text-center text-white/90 text-sm font-medium">{t(instructor.titleKey)}</p>
                    <div className="flex items-center justify-center mt-3 gap-2">
                      {instructor.icon}
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {t(instructor.specialtyKey)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col">
                  {/* Biography */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {t('instructors.professionalJourney')}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                      {t(instructor.biographyKey)}
                    </p>
                  </div>

                  {/* Teaching Philosophy */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {t('instructors.teachingPhilosophy')}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                      {t(instructor.philosophyKey)}
                    </p>
                  </div>

                  {/* Experience Badge */}
                  <div className="mb-4">
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      <Award className="h-3 w-3 mr-1" />
                      {t(instructor.experienceKey)} {t('instructors.experience')}
                    </Badge>
                  </div>

                  {/* Qualifications */}
                  <div className="mb-6 flex-1">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">{t('instructors.keyQualifications')}</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {instructor.qualificationKeys.slice(0, 2).map((qualKey, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                          {t(qualKey)}
                        </li>
                      ))}
                      <li className="text-gray-500 text-xs">+{instructor.qualificationKeys.length - 2} {t('instructors.more')}</li>
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-auto"
                  >
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`w-full ${instructor.borderColor} hover:bg-gradient-to-r hover:${instructor.color} hover:text-white transition-all duration-300`}
                    >
                      {t('instructors.viewProfile')}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            {t('instructors.cta')}
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 glow-text"
            style={{
              boxShadow: '0 0 25px rgba(0, 255, 255, 0.4)',
              textShadow: '0 0 8px rgba(0, 255, 255, 0.6)'
            }}
          >
            {t('instructors.ctaButton')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default React.memo(InstructorSection); 