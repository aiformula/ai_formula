import React from 'react';
import { Button } from '@/components/ui/button';
import { CategoryFiltersProps } from '@/types/courseTypes';

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isZhTW
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8 mb-8">
      {categories.map((category) => (
        <Button
          key={category.key}
          onClick={() => onCategoryChange(category.key)}
          className={`${
            selectedCategory === category.key
              ? `${category.color} text-white`
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
          } transition-all duration-200`}
          aria-label={`Filter by ${isZhTW ? category.labelCht : category.label}`}
          aria-pressed={selectedCategory === category.key}
        >
          {category.emoji} {isZhTW ? category.labelCht : category.label}
        </Button>
      ))}
    </div>
  );
};

export default React.memo(CategoryFilters); 