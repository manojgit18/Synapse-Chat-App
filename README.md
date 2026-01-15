# 🧠 Synapse - AI-Powered Chat Application

A modern, real-time chat application built with React, Firebase, and Google Gemini AI. Connect with friends and chat with NeuronAI, your intelligent assistant.

![Synapse Chat App](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.x-FFCA28?logo=firebase)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)

## ✨ Features

- 🔐 **Secure Authentication** - Email/password authentication with Firebase Auth
- 💬 **Real-time Messaging** - Instant message delivery using Firestore
- 🤖 **AI Assistant (NeuronAI)** - Chat with an intelligent AI powered by Google Gemini
- 👥 **User Profiles** - Customizable profiles with name and bio
- 🎨 **Modern UI** - Clean, responsive interface
- 🔍 **User Search** - Find and connect with other users
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Firebase (Authentication, Firestore Database)
- **AI**: Google Gemini API
- **Styling**: CSS3
- **Routing**: React Router v6
- **Notifications**: React Toastify

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- A Firebase account
- A Google AI Studio account (for Gemini API)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/manojgit18/synapse-chat-app.git
cd synapse-chat-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password)
4. Create a **Firestore Database**
5. Copy your Firebase configuration

### 4. Set up Google Gemini API

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 5. Configure environment variables

Create a `.env` file in the project root:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 6. Run the application
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure
```
synapse/
│
├── public/
│   ├── background.png
│   └── chat_app.svg
│
├── src/
│   ├── assets/              # Images and icons
│   ├── components/          # React components
│   │   ├── LeftSidebar/
│   │   ├── ChatBox/
│   │   └── RightSidebar/
│   ├── pages/               # Page components
│   │   ├── Login/
│   │   ├── ProfileUpdate/
│   │   └── Chat/
│   ├── context/             # React Context API
│   │   └── AppContext.jsx
│   ├── config/              # Firebase configuration
│   │   └── firebase.js
│   ├── lib/                 # Utility functions
│   │   └── neuronAI.js      # Gemini AI integration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env                     # Environment variables (not in repo)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Usage

### First Time Setup

1. **Sign Up**
   - Open the app
   - Click "Create an account? Sign Up"
   - Enter username, email, and password
   - Agree to terms and click "Create account"

2. **Complete Profile**
   - Enter MANOJKUMAR R (required)
   - Add a bio (optional)
   - Click "Save"

3. **Start Chatting**
   - Click on any user to start chatting
   - Click on **🤖 NeuronAI** to chat with the AI assistant

### Chat with NeuronAI

NeuronAI is always pinned at the top of your chat list. Simply:
1. Click on "🤖 NeuronAI"
2. Ask anything - from general questions to coding help
3. Get instant AI-powered responses

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your Firebase and Gemini API keys secure
- Firebase security rules should be configured for production use

## 🐛 Troubleshooting

### AI Not Responding

1. Check if `VITE_GEMINI_API_KEY` is set in `.env`
2. Restart dev server after changing `.env`
3. Check browser console for error messages
4. Verify API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Messages Jumping/Reordering

- This should be fixed in the latest version
- If still occurring, clear browser cache and refresh

### Authentication Issues

- Ensure Firebase Authentication is enabled
- Check Firebase console for error logs
- Verify email/password provider is enabled

## 📝 Firebase Firestore Structure
```
users/
  {userId}/
    - uid: string
    - username: string
    - email: string
    - name: string
    - avatar: string
    - bio: string
    - lastSeen: timestamp

chats/
  {chatId}/
    messages/
      {messageId}/
        - text: string
        - image: string
        - senderId: string
        - createdAt: timestamp

ai_chats/
  {userId}/
    messages/
      {messageId}/
        - text: string
        - senderId: string (user uid or "ai")
        - createdAt: timestamp
```

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy the dist/ folder to Netlify
```

**Important**: Add all environment variables in your hosting platform's settings.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MANOJKUMAR R**
- GitHub: [@manojgit18](https://github.com/manojgit18)

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for backend services
- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI capabilities
- [React](https://react.dev/) for the amazing framework
- [Vite](https://vitejs.dev/) for lightning-fast development

## 📧 Support

For support, email manojmaverick96@gmail.com or open an issue in the repository.

---

Made with ❤️ and React
```

---

# 📝 OPTIONAL: Add LICENSE file

Create `LICENSE` file:
```
MIT License

Copyright (c) 2025 MANOJKUMAR R

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
