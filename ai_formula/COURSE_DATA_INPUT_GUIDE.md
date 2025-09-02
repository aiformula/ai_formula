# 📚 Course Data Input Guide - How to Provide Course Information

This guide explains how to efficiently provide course data to me for creating new courses or updating existing ones.

## 🎯 Overview

The course system consists of several key components:
1. **Course Outline** - Basic course information and structure
2. **Course Units/Lessons** - Detailed lesson content
3. **Quiz Data** - Questions and answers for each chapter
4. **Theme/Visual Settings** - Colors and styling preferences

---

## 📋 Part 1: Course Outline Data

### **Prompt Template:**
```
I want to create a new course called "[COURSE_NAME]". Here's the course outline data:

**Basic Info:**
- Course Title: [Title in English and Chinese]
- Duration: [Total duration]
- Instructor: [Instructor name]
- Description: [Course description]
- Target Audience: [Who this course is for]

**Course Structure:**
Chapter 1: [Chapter Title]
- 1.1 [Unit Title] - [Duration]
- 1.2 [Unit Title] - [Duration]
- 1.3 [Unit Title] - [Duration]

Chapter 2: [Chapter Title]
- 2.1 [Unit Title] - [Duration]
- 2.2 [Unit Title] - [Duration]

[Continue for all chapters...]

**Theme Settings:**
- Primary Color: [Hex color code]
- Accent Color: [Hex color code]
- Course Icon: [Emoji or description]

Please create the course structure and outline page.
```

### **Example:**
```
I want to create a new course called "AI Video Creation Mastery". Here's the course outline data:

**Basic Info:**
- Course Title: AI Video Creation Mastery / AI 影片創作大師課程
- Duration: 8 hours
- Instructor: Sarah Chen
- Description: Master AI-powered video creation tools and techniques
- Target Audience: Content creators, marketers, video enthusiasts

**Course Structure:**
Chapter 1: AI Video Fundamentals
- 1.1 Introduction to AI Video Tools - 20 mins
- 1.2 Setting Up Your Workflow - 25 mins
- 1.3 Understanding AI Video Generation - 30 mins

Chapter 2: Advanced Techniques
- 2.1 Prompt Engineering for Videos - 35 mins
- 2.2 Style Transfer and Effects - 40 mins

**Theme Settings:**
- Primary Color: #8B5CF6
- Accent Color: #A78BFA
- Course Icon: 🎬

Please create the course structure and outline page.
```

---

## 📝 Part 2: Detailed Unit Content

### **Prompt Template for Each Unit:**
```
Here's the detailed content for Unit [X.Y]:

**Unit [X.Y]: [Unit Title]**
- Duration: [Duration]
- Type: interactive/video/reading
- Description: [Brief description]

**Transcript/Content:**
[Detailed lesson content - paragraphs of educational material]

**Key Points:**
- [Key point 1]
- [Key point 2]
- [Key point 3]
- [Key point 4]

**Learning Objectives:**
- [What students will learn]
- [Skills they will gain]

Please update the course data with this unit content.
```

### **Example:**
```
Here's the detailed content for Unit 1.1:

**Unit 1.1: Introduction to AI Video Tools**
- Duration: 20 minutes
- Type: interactive
- Description: Comprehensive overview of current AI video generation landscape

**Transcript/Content:**
The world of AI video creation has evolved rapidly in recent years. Tools like Runway ML, Pika Labs, and Stable Video Diffusion have democratized video production, allowing creators without traditional video editing skills to produce professional-quality content.

AI video generation works through diffusion models that have been trained on millions of video clips. These models understand motion, temporal consistency, and visual coherence, enabling them to generate realistic video sequences from text prompts or still images.

The key advantage of AI video tools is their ability to iterate quickly. Traditional video production might take days or weeks to complete, while AI tools can generate initial concepts in minutes, allowing for rapid prototyping and creative exploration.

**Key Points:**
- AI video tools have democratized video production for non-experts
- Diffusion models power most modern AI video generation systems
- Rapid iteration is the primary advantage over traditional methods
- Current tools include Runway ML, Pika Labs, and Stable Video Diffusion

**Learning Objectives:**
- Understand the current AI video landscape
- Identify the best tools for different use cases
- Recognize the advantages and limitations of AI video generation

Please update the course data with this unit content.
```

---

## ❓ Part 3: Quiz Data

### **Prompt Template for Chapter Quizzes:**
```
Here's the quiz data for Chapter [X]:

**Chapter [X] Quiz: [Quiz Title]**
- Time Limit: [X] minutes
- Passing Score: [X]%
- Description: [Quiz description]

**Questions:**

Q1: [Question text]
A) [Option 1]
B) [Option 2]
C) [Option 3]
D) [Option 4]
Correct Answer: [A/B/C/D]
Explanation: [Why this answer is correct]

Q2: [Question text]
A) [Option 1]
B) [Option 2]
C) [Option 3]
D) [Option 4]
Correct Answer: [A/B/C/D]
Explanation: [Why this answer is correct]

[Continue for all questions...]

Please add this quiz to Chapter [X].
```

### **Example:**
```
Here's the quiz data for Chapter 1:

**Chapter 1 Quiz: AI Video Fundamentals**
- Time Limit: 10 minutes
- Passing Score: 80%
- Description: Test your understanding of AI video generation basics

**Questions:**

Q1: Which technology primarily powers modern AI video generation?
A) Neural networks
B) Diffusion models
C) Genetic algorithms
D) Decision trees
Correct Answer: B
Explanation: Diffusion models are the core technology behind most current AI video generation tools, as they excel at creating temporal consistency and realistic motion.

Q2: What is the main advantage of AI video tools over traditional video production?
A) Better quality
B) Lower cost
C) Rapid iteration and prototyping
D) More realistic results
Correct Answer: C
Explanation: The primary advantage is the ability to quickly iterate and prototype ideas, allowing creators to explore concepts in minutes rather than days.

Please add this quiz to Chapter 1.
```

---

## 🎨 Part 4: Theme and Visual Updates

### **Prompt Template:**
```
I want to update the visual theme for [COURSE_NAME]:

**Color Scheme:**
- Primary Color: [Hex code] (for main elements)
- Accent Color: [Hex code] (for highlights)
- Background: [Hex code or description]

**Visual Style:**
- Course Icon: [Emoji or description]
- Design Style: [modern/classic/minimal/etc.]

**Special Requirements:**
- [Any specific design requirements]
- [Color psychology considerations]

Please update the course theme accordingly.
```

### **Example:**
```
I want to update the visual theme for AI Video Creation course:

**Color Scheme:**
- Primary Color: #8B5CF6 (purple for creativity)
- Accent Color: #A78BFA (lighter purple for highlights)
- Background: Keep dark theme

**Visual Style:**
- Course Icon: 🎬
- Design Style: modern and creative

**Special Requirements:**
- Purple represents creativity and innovation
- Should feel premium and professional
- Maintain good contrast for readability

Please update the course theme accordingly.
```

---

## 🚀 Part 5: Bulk Data Upload

### **Prompt Template for Complete Course:**
```
I have a complete course dataset. Here's all the information:

**COURSE: [Course Name]**

**OUTLINE:**
[Use Part 1 format]

**ALL UNITS:**
Unit 1.1: [Use Part 2 format]
Unit 1.2: [Use Part 2 format]
[Continue for all units...]

**ALL QUIZZES:**
Chapter 1 Quiz: [Use Part 3 format]
Chapter 2 Quiz: [Use Part 3 format]
[Continue for all chapters...]

**THEME:**
[Use Part 4 format]

Please create the complete course with all this data.
```

---

## 📊 Data Structure Reference

### **Required Fields:**
- ✅ **Course Info**: title, titleEn, description, duration, instructor
- ✅ **Modules**: id, title, description, lessons array
- ✅ **Lessons**: id, title, duration, type, description, transcript, keyPoints
- ✅ **Quizzes**: title, timeLimit, passingScore, questions array
- ✅ **Questions**: question, options, correctAnswer, explanation

### **Optional Fields:**
- 📝 **Images**: image paths (will use placeholders if not provided)
- 📝 **Learning Objectives**: specific goals for each unit
- 📝 **Prerequisites**: what students should know before starting

---

## ⚡ Quick Tips

1. **Start Small**: Begin with just the outline, then add units one by one
2. **Be Specific**: More detailed content = better course quality
3. **Consistent Format**: Use the exact prompt templates for best results
4. **Test Early**: Create a few units first to test the structure
5. **Iterate**: You can always update and improve content later

---

## 🔄 Update Existing Courses

### **Prompt Template:**
```
I want to update [COURSE_NAME]. Here's what needs to be changed:

**What to Update:** [outline/units/quiz/theme]
**Specific Changes:** 
- [Change 1]
- [Change 2]

**New Data:**
[Provide the new information using the appropriate format above]

Please update only the specified parts without changing anything else.
```

---

This guide ensures efficient communication and helps me create exactly what you need. Save this file for reference when creating new courses! 