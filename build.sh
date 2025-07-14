#!/bin/bash

# Build script for AI Formula project
echo "Building AI Formula project..."

# Navigate to the ai_formula directory
cd ai_formula

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Build completed successfully!"
echo "Output directory: ai_formula/dist" 