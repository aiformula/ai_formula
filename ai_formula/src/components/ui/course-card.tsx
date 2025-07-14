import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LearningButton } from "./learning-button"
import { cn } from "@/lib/utils"
import { Clock, Users, Star, Download, Heart, Share2 } from "lucide-react"

interface CourseCardProps {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  duration: string
  level: string
  rating?: number
  studentCount?: number
  price?: {
    current: number
    original?: number
    currency?: string
  }
  onEnroll?: () => void
  onPreview?: () => void
  onAddToCart?: () => void
  onSave?: () => void
  onShare?: () => void
  className?: string
  index?: number
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
  tags,
  duration,
  level,
  rating,
  studentCount,
  price,
  onEnroll,
  onPreview,
  onAddToCart,
  onSave,
  onShare,
  className,
  index = 0
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={cn("group cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className="bg-[#1a1a1a] border-gray-800 hover:border-[#FFC700]/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-[#FFC700]/10 h-full"
        role="article"
        aria-labelledby={`course-title-${id}`}
      >
        {/* Course Image */}
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={`${title} course thumbnail`}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Duration Badge */}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-[#FFC700] text-black font-semibold">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </Badge>
          </div>
          
          {/* Level Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="border-gray-600 bg-gray-900/80 text-white">
              {level}
            </Badge>
          </div>
          
          {/* Hover Overlay Actions */}
          <div className={cn(
            "absolute inset-0 bg-black/70 flex items-center justify-center gap-3 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {onPreview && (
              <LearningButton
                intent="accent"
                size="sm"
                onClick={onPreview}
                aria-label={`Preview ${title} course`}
              >
                Preview
              </LearningButton>
            )}
            {onSave && (
              <button
                onClick={onSave}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                aria-label={`Save ${title} course`}
              >
                <Heart className="w-4 h-4 text-white" />
              </button>
            )}
            {onShare && (
              <button
                onClick={onShare}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                aria-label={`Share ${title} course`}
              >
                <Share2 className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </div>
        
        <CardHeader className="pb-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, tagIndex) => (
              <Badge 
                key={tagIndex} 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:border-[#FFC700] hover:text-[#FFC700] transition-colors duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Title */}
          <CardTitle 
            id={`course-title-${id}`}
            className="text-white group-hover:text-[#FFC700] transition-colors duration-300 line-clamp-2"
          >
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Description */}
          <CardDescription className="text-gray-300 mb-4 line-clamp-3">
            {description}
          </CardDescription>
          
          {/* Course Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
            )}
            {studentCount && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{studentCount.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          {/* Price */}
          {price && (
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">
                  {price.currency || '$'}{price.current}
                </span>
                {price.original && price.original > price.current && (
                  <span className="text-sm text-gray-500 line-through">
                    {price.currency || '$'}{price.original}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="space-y-2">
            {onEnroll && (
              <LearningButton
                intent="primary"
                size="md"
                fullWidth
                onClick={onEnroll}
                aria-label={`Enroll in ${title} course`}
              >
                {price ? 'Enroll Now' : 'Start Learning'}
              </LearningButton>
            )}
            
            {onAddToCart && price && (
              <LearningButton
                intent="outline"
                size="md"
                fullWidth
                onClick={onAddToCart}
                aria-label={`Add ${title} course to cart`}
              >
                Add to Cart
              </LearningButton>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export { CourseCard } 
