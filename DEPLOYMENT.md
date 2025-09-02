# AI Formula - Deployment Guide

## 🚀 Deployment Fix

### Issue
The project has a nested structure where the main React application is located in the `ai_formula/` subdirectory, which was causing Vercel deployment failures.

### Solution
Created a `vercel.json` configuration file in the root directory that instructs Vercel to:
- Build from the `ai_formula/` subdirectory
- Use the correct output directory (`ai_formula/dist`)
- Install dependencies in the correct location

### Vercel Configuration

```json
{
  "buildCommand": "cd ai_formula && npm install && npm run build",
  "outputDirectory": "ai_formula/dist",
  "installCommand": "cd ai_formula && npm install",
  "devCommand": "cd ai_formula && npm run dev",
  "framework": "vite",
  "regions": ["hkg1"],
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📁 Project Structure

```
ai_formula_repo/
├── vercel.json          # Vercel deployment configuration
├── build.sh             # Manual build script
├── ai_formula/          # Main React application
│   ├── src/            # Source code
│   ├── dist/           # Build output
│   ├── package.json    # Dependencies
│   └── vite.config.ts  # Vite configuration
└── README.md           # Project documentation
```

## 🛠️ Local Development

1. **Navigate to the main project directory:**
   ```bash
   cd ai_formula
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### Vercel (Recommended)
1. The `vercel.json` configuration automatically handles the nested structure
2. Push changes to the main branch
3. Vercel will automatically deploy from the `ai_formula/` subdirectory

### Manual Build
Use the provided build script:
```bash
./build.sh
```

### Alternative Deployment Platforms
For other platforms, ensure to:
- Set build command: `cd ai_formula && npm install && npm run build`
- Set output directory: `ai_formula/dist`
- Set root directory: `ai_formula/` (if supported)

## 🔧 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Ensure you're running commands from the `ai_formula/` directory
   - Check that all dependencies are installed

2. **Build failures**
   - Verify the `vercel.json` configuration is correct
   - Check that the output directory exists after build

3. **Deployment path issues**
   - Ensure the `vercel.json` file is in the repository root
   - Verify the `outputDirectory` path is correct

### Deployment Checklist

- [ ] `vercel.json` exists in repository root
- [ ] Build command includes `cd ai_formula`
- [ ] Output directory is set to `ai_formula/dist`
- [ ] All dependencies are listed in `ai_formula/package.json`
- [ ] Environment variables are configured (if needed)

## 🎯 Next Steps

1. **Monitor deployment** - Check Vercel dashboard for successful deployment
2. **Test functionality** - Verify all features work in production
3. **Domain configuration** - Set up custom domain if needed
4. **Performance optimization** - Monitor and optimize build times

---

**Last Updated**: 2024-01-20  
**Status**: ✅ Deployment Fixed  
**Platform**: Vercel  
**Framework**: Vite + React + TypeScript 