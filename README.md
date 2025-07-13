# AI Japanese Language Teacher

An interactive 3D AI Japanese language teacher built with Next.js, React Three Fiber, and Google Gemini AI.


## Features

- 🤖 **AI-powered responses** using Google Gemini API
- 🗣️ **Free text-to-speech** using Web Speech API
- 🎌 **Japanese language learning** with grammar breakdowns
- 🎯 **3D animated teachers** (Nanami & Naoki)
- 📚 **Formal and casual speech modes**
- 🎨 **Beautiful 3D classroom environment**

## Recent Changes

This application has been updated to use cost-effective alternatives:

- ✅ **Migrated from OpenAI GPT to Google Gemini API** - Lower cost, better value
- ✅ **Replaced Microsoft Azure TTS with Web Speech API** - Completely free, browser-based
- ✅ **Maintained all core functionality** while reducing operating costs

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-teacher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your free Gemini API key from: https://makersuite.google.com/app/apikey

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Keys Setup

### Google Gemini API (Required)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file as `GEMINI_API_KEY`

### Text-to-Speech (No Setup Required)
The application now uses the browser's built-in Web Speech API, which is completely free and requires no additional setup or API keys.

## Technologies Used

- **Frontend**: Next.js 14, React, Tailwind CSS
- **3D Graphics**: React Three Fiber, Three.js, React Three Drei
- **AI**: Google Gemini API
- **TTS**: Web Speech API
- **State Management**: Zustand
- **Animation**: GLTF models with animations

## Browser Compatibility

The Web Speech API is supported in modern browsers:
- ✅ Chrome/Chromium-based browsers
- ✅ Safari
- ✅ Firefox
- ⚠️ Edge (limited Japanese voice support)

For the best Japanese voice experience, we recommend using Chrome or Safari.

## Deploy on Elestio

The easiest way to deploy your Next.js app is to use the [Elestio Platform](https://ellest.io).

