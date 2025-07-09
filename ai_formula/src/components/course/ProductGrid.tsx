import React from 'react';
import { motion } from 'framer-motion';
import { ProductGridProps } from '@/types/courseTypes';
import ProductCard from './ProductCard';
import CategoryFilters from './CategoryFilters';

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isZhTW,
  selectedCategory,
  onCategoryChange,
  onProductClick
}) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {isZhTW ? '精選數位產品類別' : 'Featured Digital Product Categories'}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {isZhTW 
              ? '高質素筆記同影片教學，即刻下載就用得。'
              : 'High-quality notes and video tutorials, instant download and access.'
            }
          </p>
          
          <CategoryFilters
            categories={[
              { key: 'all', label: 'All', labelCht: '全部', emoji: '📋', color: 'bg-blue-500 hover:bg-blue-600' },
              { key: 'design', label: 'Creative Design', labelCht: '創意設計', emoji: '🎨', color: 'bg-purple-500 hover:bg-purple-600' },
              { key: 'ai', label: 'AI Applications', labelCht: 'AI應用', emoji: '🤖', color: 'bg-blue-500 hover:bg-blue-600' },
              { key: 'automation', label: 'Automation', labelCht: '自動化', emoji: '⚡', color: 'bg-green-500 hover:bg-green-600' },
              { key: 'analytics', label: 'Data Analytics', labelCht: '數據分析', emoji: '📊', color: 'bg-yellow-500 hover:bg-yellow-600' },
              { key: 'prompt-engineering', label: 'Prompt Engineering', labelCht: '提示工程', emoji: '💬', color: 'bg-pink-500 hover:bg-pink-600' }
            ]}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            isZhTW={isZhTW}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isZhTW={isZhTW}
              onProductClick={onProductClick}
              index={index}
            />
          ))}
        </div>

        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              {isZhTW ? '此類別暫無產品' : 'No products found in this category'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProductGrid); 