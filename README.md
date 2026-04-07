````markdown
# 🧠 Quiz Game Application

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)
![Routing](https://img.shields.io/badge/Routing-React_Router-green)
![Authentication](https://img.shields.io/badge/Auth-JWT-orange)
![Status](https://img.shields.io/badge/Project-Completed-brightgreen)

A production-ready **Quiz Application** built using **React.js**, implementing secure authentication, protected routing, real-time timer functionality, and detailed performance analytics.

This project demonstrates strong understanding of:

- Component-Based Architecture  
- State Management  
- Routing & Navigation  
- API Integration  
- Authentication Handling  
- Responsive UI Design  

---

## 🚀 Live Demo

> 🔗 https://quizgame2349.ccbp.tech

---

## ✨ Core Features

- 🔐 JWT-Based User Authentication  
- 🛡 Protected Routes using React Router  
- ⏳ 15-Second Countdown Timer per Question  
- 🎯 Real-Time Score Calculation  
- 📊 Detailed Performance Report Page  
- ❌ Unattempted Question Tracking  
- 📱 Fully Responsive Design  
- 🎨 Modern Gradient + Glassmorphism UI  
- ⚡ Dynamic API-Based Question Rendering  

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React.js |
| Language | JavaScript (ES6+) |
| Routing | React Router DOM |
| Authentication | JWT + Cookies |
| Styling | CSS3 (Flexbox, Responsive Design) |
| API | REST API Integration |

---

## 🏗 Application Architecture

- Modular component structure  
- State-driven UI updates  
- Conditional rendering based on API status  
- Authentication flow secured via token validation  
- Timer implemented using `setInterval`  
- Navigation handled using `history.push`  
- Centralized routing configuration  

---

## 🔐 Authentication Flow

1. User logs in with credentials.  
2. JWT token is stored securely in cookies.  
3. `ProtectedRoute` component verifies token.  
4. Unauthorized users are redirected to the Login page.  

---

## 🧠 Quiz Engine Logic

- Questions fetched dynamically from API.  
- Supports multiple question types:
  - Default Multiple Choice  
  - Image-Based Options  
  - Single Select Type  
- Automatic transition when timer expires.  
- Score updates dynamically on answer selection.  
- Final result calculated as percentage.  

---

## 📊 Results & Reporting System

- Total Score Display  
- Percentage Calculation  
- Correct Answers Count  
- Incorrect Answers Count  
- Unattempted Questions  
- Correct Options Revealed for Review  

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Header/
│   ├── Login/
│   ├── Home/
│   ├── QuizGame/
│   ├── GameResults/
│   ├── GameReport/
│   ├── ProtectedRoute/
│   └── NotFound/
│
├── App.js
└── index.js
```

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/Akhilagoud907/Quiz-game
npm install
npm start
```

Application runs at:

```
http://localhost:3000
```

---

## 🔌 APIs Used

- Login API  
- Questions API  

---

## 📱 Responsive Design

- Mobile-Friendly Layout  
- Tablet Optimization  
- Desktop Responsive Grid  
- Smooth Hover Effects  
- Gradient Background UI  

---

## 📈 Performance Highlights

- Efficient state management  
- Clean routing structure  
- Reusable components  
- Optimized rendering logic  
- Clear separation of concerns  

---

## 🚀 Future Enhancements

- 🏆 Leaderboard Integration  
- 📚 Category-Based Quizzes  
- 🎚 Difficulty Levels  
- 🌙 Dark / Light Mode Toggle  
- 🌐 Deployment Integration  
- 📊 Analytics Dashboard  

---

## 👩‍💻 Author

**Akhila**

---

## ⭐ Show Your Support

If you found this project helpful or impressive, please consider giving it a ⭐ on GitHub!
````
