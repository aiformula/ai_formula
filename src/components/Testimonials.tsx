
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "AI Formula transformed our business operations. Their automation solutions saved us 15 hours per week and eliminated human errors completely.",
      author: "Sarah Chen",
      title: "Operations Director",
      company: "TechFlow Solutions",
      rating: 5
    },
    {
      quote: "The learning materials are exceptional. Our team went from automation novices to power users in just 2 months. Highly recommended!",
      author: "Marcus Rodriguez",
      title: "CTO",
      company: "InnovateLab",
      rating: 5
    },
    {
      quote: "Professional, knowledgeable, and results-driven. AI Formula delivered exactly what we needed and provided ongoing support that exceeded expectations.",
      author: "Lisa Thompson",
      title: "VP of Marketing",
      company: "GrowthCorp",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            What Our <span className="text-green-500">Clients Say</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Join hundreds of businesses that have transformed their operations with AI Formula
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <Card className="bg-[#1a1a1a] border-gray-800 hover:border-green-500/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-green-500/10 h-full">
                <CardContent className="p-8">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.2 + 0.3, 
                      duration: 0.6,
                      staggerChildren: 0.1
                    }}
                    viewport={{ once: true }}
                    className="flex mb-4"
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.2 + 0.4 + i * 0.1, 
                          duration: 0.4,
                          type: "spring"
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.3, 
                          rotate: 10,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Star className="w-5 h-5 text-green-500 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.blockquote 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-gray-300 mb-6 text-lg leading-relaxed italic"
                  >
                    "{testimonial.quote}"
                  </motion.blockquote>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="border-t border-gray-700 pt-4"
                  >
                    <motion.div 
                      whileHover={{ color: "#10B981" }}
                      className="font-semibold text-white text-lg mb-1 transition-colors duration-300"
                    >
                      {testimonial.author}
                    </motion.div>
                    <div className="text-green-500 font-medium mb-1">
                      {testimonial.title}
                    </div>
                    <div className="text-gray-400">
                      {testimonial.company}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
