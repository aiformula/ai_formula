import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Users, Star, Play, Award, TrendingUp } from 'lucide-react';
import Atropos from 'atropos/react';
import { ProductCardProps } from '@/data/courses/courseData';
import { calculateSavingsPercentage } from '@/data/courses/courseData';

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isZhTW, 
  onProductClick, 
  index 
}) => {
  const handleClick = () => {
    onProductClick(product);
  };

  const savingsPercentage = product.originalPrice 
    ? calculateSavingsPercentage(product.originalPrice, product.price)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
    >
      <Atropos
        className="w-full h-full"
        activeOffset={40}
        shadowScale={1.05}
      >
        <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-blue-500 transition-colors">
          <CardHeader>
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl" role="img" aria-label={`${product.type} icon`}>
                {product.image}
              </div>
              <div className="flex flex-col gap-2">
                <Badge 
                  variant={
                    product.level === 'Beginner' ? 'default' : 
                    product.level === 'Intermediate' ? 'secondary' : 
                    'destructive'
                  }
                  aria-label={`Difficulty level: ${product.level}`}
                >
                  {isZhTW ? product.levelCht : product.level}
                </Badge>
                {product.bestseller && (
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    <Award className="h-3 w-3 mr-1" />
                    {isZhTW ? '暢銷' : 'Bestseller'}
                  </Badge>
                )}
                {product.newProduct && (
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {isZhTW ? '新產品' : 'New'}
                  </Badge>
                )}
                {product.hotSelling && (
                  <Badge variant="outline" className="text-red-400 border-red-400">
                    🔥 {isZhTW ? '熱賣' : 'Hot'}
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="text-xl mb-2 text-white">
              {isZhTW ? product.titleCht : product.title}
            </CardTitle>
            <CardDescription className="text-gray-200">
              {isZhTW ? product.descriptionCht : product.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-300" />
                    <span aria-label={`Duration: ${isZhTW ? product.durationCht : product.duration}`}>
                      {isZhTW ? product.durationCht : product.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-300" />
                    <span aria-label={`Downloads: ${product.downloads.toLocaleString()}`}>
                      <span className="text-gray-300">
                        {product.downloads.toLocaleString()} {isZhTW ? '下載' : 'downloads'}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white" aria-label={`Rating: ${product.rating} stars`}>
                    {product.rating}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-white">
                  {isZhTW ? '包含內容:' : 'What\'s Included:'}
                </h4>
                <ul className="text-sm text-gray-200 space-y-1" role="list">
                  {(isZhTW ? product.includesCht : product.includes).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2" role="listitem">
                      <Play className="h-3 w-3 text-blue-400" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-white">{product.price}</div>
                    {product.originalPrice && (
                      <div className="text-lg text-gray-400 line-through">
                        {product.originalPrice}
                      </div>
                    )}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-green-400">
                      {isZhTW ? '節省' : 'Save '}
                      {savingsPercentage}%
                    </div>
                  )}
                </div>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={handleClick}
                  aria-label={`Buy ${isZhTW ? product.titleCht : product.title} for ${product.price}`}
                >
                  {isZhTW ? '立即購買' : 'Buy Now'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Atropos>
    </motion.div>
  );
};

export default React.memo(ProductCard); 
