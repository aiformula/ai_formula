/**
 * Course System Validation
 * @fileoverview Validation utility to verify the refactored course system
 * @author AI Formula Team
 * @version 2.0.0
 */

import { 
  getCourseById, 
  getCourseWithErrorHandling, 
  getAvailableCourseIds,
  healthCheck,
  initializeCourseSystem,
  preloadCourse,
  clearCourseCache
} from '../courseDetails';

import { loadCourseById, getAllCourseMetadata } from '../courses/index';

/**
 * Validation result interface
 */
interface ValidationResult {
  passed: boolean;
  message: string;
  error?: any;
}

/**
 * Simple assertion helper
 */
function assert(condition: boolean, message: string): ValidationResult {
  return {
    passed: condition,
    message: condition ? `??${message}` : `??${message}`
  };
}

/**
 * Basic functionality validation
 */
export async function validateBasicFunctionality(): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  
  try {
    // Test 1: List available course IDs
    const courseIds = getAvailableCourseIds();
    results.push(assert(
      courseIds.includes('ai-image-video-creation') && 
      courseIds.includes('prompt-engineering') && 
      courseIds.length > 0,
      'Should list available course IDs'
    ));

    // Test 2: Load course by ID
    const course = await getCourseById('ai-image-video-creation');
    results.push(assert(
      course !== null && 
      course?.id === 'ai-image-video-creation' && 
      course?.title.en !== undefined && 
      course?.title['zh-HK'] !== undefined,
      'Should load course by ID'
    ));

    // Test 3: Return null for non-existent course
    const nonExistentCourse = await getCourseById('non-existent-course');
    results.push(assert(
      nonExistentCourse === null,
      'Should return null for non-existent course'
    ));

    // Test 4: Handle error responses correctly
    const errorResponse = await getCourseWithErrorHandling('non-existent-course');
    results.push(assert(
      errorResponse.success === false && errorResponse.error !== undefined,
      'Should handle error responses correctly'
    ));

  } catch (error) {
    results.push({
      passed: false,
      message: `??Basic functionality validation failed: ${error}`,
      error
    });
  }

  return results;
}

/**
 * Performance features validation
 */
export async function validatePerformanceFeatures(): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  
  try {
    // Test 1: Preload courses
    await preloadCourse('ai-image-video-creation');
    results.push(assert(true, 'Should preload courses successfully'));

    // Test 2: Initialize course system
    const initResult = await initializeCourseSystem();
    results.push(assert(
      initResult !== undefined && 
      Array.isArray(initResult.loadedCourses) && 
      Array.isArray(initResult.errors),
      'Should initialize course system'
    ));

    // Test 3: Health check
    const health = await healthCheck();
    results.push(assert(
      health !== undefined && 
      ['healthy', 'degraded', 'unhealthy'].includes(health.status) && 
      health.details !== undefined && 
      health.details.coursesAvailable > 0,
      'Should perform health check'
    ));

  } catch (error) {
    results.push({
      passed: false,
      message: `??Performance features validation failed: ${error}`,
      error
    });
  }

  return results;
}

/**
 * Data integrity validation
 */
export async function validateDataIntegrity(): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  
  try {
    // Test 1: Course structure validation
    const course = await getCourseById('ai-image-video-creation');
    const hasValidStructure = course !== null &&
      course.id !== undefined &&
      course.title !== undefined &&
      course.description !== undefined &&
      course.category !== undefined &&
      course.difficulty !== undefined &&
      course.title.en !== undefined &&
      course.title['zh-HK'] !== undefined &&
      course.description.en !== undefined &&
      course.description['zh-HK'] !== undefined &&
      Array.isArray(course.proModules);

    results.push(assert(hasValidStructure, 'Should have valid course structure'));

    // Test 2: Metadata validation
    const metadata = getAllCourseMetadata();
    const hasValidMetadata = Array.isArray(metadata) && 
      metadata.length > 0 &&
      metadata.every(meta => 
        meta.id !== undefined &&
        meta.title.en !== undefined &&
        meta.title['zh-HK'] !== undefined &&
        meta.category !== undefined &&
        meta.difficulty !== undefined
      );

    results.push(assert(hasValidMetadata, 'Should have valid metadata'));

  } catch (error) {
    results.push({
      passed: false,
      message: `??Data integrity validation failed: ${error}`,
      error
    });
  }

  return results;
}

/**
 * Error handling validation
 */
export async function validateErrorHandling(): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  
  try {
    // Test 1: Course loading errors
    const response = await getCourseWithErrorHandling('invalid-course');
    results.push(assert(
      response.success === false && 
      response.error !== undefined && 
      response.timestamp !== undefined,
      'Should handle course loading errors gracefully'
    ));

    // Test 2: API structure validation
    results.push(assert(
      typeof getCourseWithErrorHandling === 'function',
      'Should have proper error handling API structure'
    ));

  } catch (error) {
    results.push({
      passed: false,
      message: `??Error handling validation failed: ${error}`,
      error
    });
  }

  return results;
}

/**
 * Backward compatibility validation
 */
export async function validateBackwardCompatibility(): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  
  try {
    // Test legacy API compatibility
    const { courseDetails } = await import('../courseDetails');
    results.push(assert(
      courseDetails !== undefined &&
      courseDetails['ai-image-video-creation'] !== undefined &&
      courseDetails['prompt-engineering'] !== undefined,
      'Should maintain legacy API compatibility'
    ));

  } catch (error) {
    results.push({
      passed: false,
      message: `??Backward compatibility validation failed: ${error}`,
      error
    });
  }

  return results;
}

/**
 * Run all validation tests
 */
export async function runAllValidations(): Promise<{
  summary: {
    total: number;
    passed: number;
    failed: number;
    success: boolean;
  };
  details: {
    basicFunctionality: ValidationResult[];
    performanceFeatures: ValidationResult[];
    dataIntegrity: ValidationResult[];
    errorHandling: ValidationResult[];
    backwardCompatibility: ValidationResult[];
  };
}> {
  console.log('?§ª Running course system validation...');
  
  // Clear cache before validation
  clearCourseCache();
  
  // Run all validation suites
  const [
    basicFunctionality,
    performanceFeatures,
    dataIntegrity,
    errorHandling,
    backwardCompatibility
  ] = await Promise.all([
    validateBasicFunctionality(),
    validatePerformanceFeatures(),
    validateDataIntegrity(),
    validateErrorHandling(),
    validateBackwardCompatibility()
  ]);
  
  // Collect all results
  const allResults = [
    ...basicFunctionality,
    ...performanceFeatures,
    ...dataIntegrity,
    ...errorHandling,
    ...backwardCompatibility
  ];
  
  // Calculate summary
  const total = allResults.length;
  const passed = allResults.filter(r => r.passed).length;
  const failed = total - passed;
  const success = failed === 0;
  
  // Display results
  console.log('\n?? Validation Results:');
  console.log('========================');
  console.log(`Basic Functionality: ${basicFunctionality.filter(r => r.passed).length}/${basicFunctionality.length} passed`);
  console.log(`Performance Features: ${performanceFeatures.filter(r => r.passed).length}/${performanceFeatures.length} passed`);
  console.log(`Data Integrity: ${dataIntegrity.filter(r => r.passed).length}/${dataIntegrity.length} passed`);
  console.log(`Error Handling: ${errorHandling.filter(r => r.passed).length}/${errorHandling.length} passed`);
  console.log(`Backward Compatibility: ${backwardCompatibility.filter(r => r.passed).length}/${backwardCompatibility.length} passed`);
  console.log('========================');
  console.log(`Total: ${passed}/${total} passed`);
  console.log(`Status: ${success ? '??ALL TESTS PASSED' : '??SOME TESTS FAILED'}`);
  
  // Display detailed results
  console.log('\n?? Detailed Results:');
  allResults.forEach(result => {
    console.log(result.message);
    if (!result.passed && result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  return {
    summary: { total, passed, failed, success },
    details: {
      basicFunctionality,
      performanceFeatures,
      dataIntegrity,
      errorHandling,
      backwardCompatibility
    }
  };
}

/**
 * Manual test runner for development
 */
export const runManualTests = async () => {
  console.log('?§ª Running manual course system tests...');
  
  try {
    // Test 1: Basic loading
    console.log('1. Testing basic course loading...');
    const course = await getCourseById('ai-image-video-creation');
    console.log('??Course loaded:', course?.title.en);
    
    // Test 2: Error handling
    console.log('2. Testing error handling...');
    const response = await getCourseWithErrorHandling('invalid-course');
    console.log('??Error handled:', response.success ? 'FAIL' : 'PASS');
    
    // Test 3: Health check
    console.log('3. Testing health check...');
    const health = await healthCheck();
    console.log('??Health status:', health.status);
    
    // Test 4: Performance
    console.log('4. Testing performance...');
    const start = performance.now();
    await preloadCourse('prompt-engineering');
    const end = performance.now();
    console.log('??Preload time:', `${end - start}ms`);
    
    // Test 5: Metadata
    console.log('5. Testing metadata...');
    const metadata = getAllCourseMetadata();
    console.log('??Available courses:', metadata.length);
    
    console.log('?? All manual tests passed!');
    
  } catch (error) {
    console.error('??Manual test failed:', error);
  }
};

/**
 * Performance benchmark
 */
export const runPerformanceBenchmark = async () => {
  console.log('??Running performance benchmark...');
  
  const iterations = 10;
  const courseId = 'ai-image-video-creation';
  
  // Benchmark cold loading
  console.log('Testing cold loading...');
  clearCourseCache();
  const coldStart = performance.now();
  await getCourseById(courseId);
  const coldEnd = performance.now();
  console.log(`Cold load: ${coldEnd - coldStart}ms`);
  
  // Benchmark cached loading
  console.log('Testing cached loading...');
  const cachedTimes: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await getCourseById(courseId);
    const end = performance.now();
    cachedTimes.push(end - start);
  }
  
  const avgCached = cachedTimes.reduce((a, b) => a + b, 0) / cachedTimes.length;
  console.log(`Cached load average: ${avgCached.toFixed(2)}ms`);
  console.log(`Cache improvement: ${((coldEnd - coldStart) / avgCached).toFixed(2)}x faster`);
  
  console.log('??Benchmark completed!');
};

// Export for easy testing in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).courseSystemTests = {
    runManualTests,
    runPerformanceBenchmark,
    runAllValidations,
    validateBasicFunctionality,
    validatePerformanceFeatures,
    validateDataIntegrity,
    validateErrorHandling,
    validateBackwardCompatibility
  };
  
  console.log('?”§ Course System Validation Tools loaded!');
  console.log('Available commands:');
  console.log('  - courseSystemTests.runAllValidations()');
  console.log('  - courseSystemTests.runManualTests()');
  console.log('  - courseSystemTests.runPerformanceBenchmark()');
} 
