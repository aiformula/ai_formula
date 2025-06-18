
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-green-500">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join hundreds of businesses that have transformed their operations with AI Formula
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Card className="bg-[#1a1a1a] border-gray-800 hover:border-green-500/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-green-500/10 h-full">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-green-500 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-300 mb-6 text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="border-t border-gray-700 pt-4">
                    <div className="font-semibold text-white text-lg mb-1">
                      {testimonial.author}
                    </div>
                    <div className="text-green-500 font-medium mb-1">
                      {testimonial.title}
                    </div>
                    <div className="text-gray-400">
                      {testimonial.company}
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

export default Testimonials;
