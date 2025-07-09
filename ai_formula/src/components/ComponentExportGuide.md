# Component Export Standards Guide

## Overview
This guide establishes consistent patterns for component exports across the AI Formula application.

## Standard Export Patterns

### 1. Basic Component Export
```typescript
// For simple components without complex props
const ComponentName: React.FC = () => {
  return <div>Component content</div>;
};

export default ComponentName;
```

### 2. Component with Props
```typescript
interface ComponentNameProps {
  prop1: string;
  prop2?: boolean;
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  return <div>Component content</div>;
};

export default ComponentName;
```

### 3. Memoized Component (for performance-critical components)
```typescript
interface ComponentNameProps {
  prop1: string;
  prop2?: boolean;
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  return <div>Component content</div>;
};

export default React.memo(ComponentName);
```

### 4. Component with Named Exports
```typescript
// Export both named and default
export const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  return <div>Component content</div>;
};

export default ComponentName;
```

## When to Use Each Pattern

### Use Basic Export When:
- Component has no props or very simple props
- Component doesn't re-render frequently
- Performance is not a critical concern

### Use Memoization When:
- Component receives complex props
- Component re-renders frequently
- Parent component re-renders often
- Performance optimization is needed

### Use Named Exports When:
- Component needs to be imported in different ways
- Creating utility components
- Building component libraries

## Examples from Our Codebase

### Good Examples:
```typescript
// pages/ProPlanLearning.tsx
const ProPlanLearning: React.FC = () => {
  // Component logic
};

export default ProPlanLearning;
```

### Better Examples (with optimization):
```typescript
// components/course/ContentRenderer.tsx
const ContentRenderer: React.FC<ContentRendererProps> = ({ content, language }) => {
  // Component logic with memoization
};

export default React.memo(ContentRenderer);
```

## Migration Guidelines

### Before:
```typescript
export default memo(ComponentName)  // Inconsistent spacing
```

### After:
```typescript
export default React.memo(ComponentName);  // Consistent with React.memo
```

## Component Categories

### 1. Page Components
- Use basic export pattern
- No memoization needed (single instance)
- Example: `pages/Course.tsx`

### 2. Reusable UI Components
- Use memoization for performance
- Clear prop interfaces
- Example: `components/ui/LoadingSpinner.tsx`

### 3. Complex Business Components
- Use memoization
- Complex prop validation
- Example: `components/course/VideoTemplate.tsx`

### 4. Utility Components
- Use named exports
- Multiple export patterns
- Example: `components/ui/index.ts`

## Implementation Checklist

- [ ] All components have consistent export patterns
- [ ] Performance-critical components use React.memo
- [ ] All prop interfaces are properly typed
- [ ] Export statements are consistent
- [ ] Component documentation is updated 