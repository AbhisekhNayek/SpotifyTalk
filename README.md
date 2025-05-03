<h1 align="center">🎵 Spotify Clone</h1>
<p align="center">
  A full-stack music streaming platform with real-time chat, admin control, and live user tracking!
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Vite-blue?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Backend-Express.js-green?style=flat-square&logo=express" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square&logo=mongodb" />
  <img src="https://img.shields.io/badge/Auth-Clerk-orange?style=flat-square&logo=clerk" />
  <img src="https://img.shields.io/badge/Cloudinary-Media Hosting-blueviolet?style=flat-square&logo=cloudinary" />
</p>

---

## ✨ Key Features

| 🌟 Feature | 🔍 Description |
|-----------|----------------|
| 🎧 Music Player | Play, pause, skip songs seamlessly |
| 🔈 Volume Control | Smooth slider for volume adjustment |
| 👨‍💼 Admin Dashboard | Create/manage albums & songs |
| 💬 Real-Time Chat | Instant messaging across users |
| 🟢 Online Presence | Track who's online/offline |
| 👀 User Listening Status | Know what others are listening to |
| 📊 Analytics Dashboard | Get insight into platform usage |
| ☁️ Cloudinary Uploads | Store album/songs media in the cloud |
| 🔐 Clerk Auth | Easy and secure user authentication |

---

## 🧰 Tech Stack

**Frontend:**  
> ⚡ Vite + React + TypeScript + TailwindCSS + Clerk

**Backend:**  
> 🚀 Node.js + Express + MongoDB + Cloudinary + Socket.IO

---

## 📁 Folder Structure

```

spotify-clone/
│
├── backend/             # Express API + MongoDB + Sockets
│   ├── config/          # Env & Cloudinary setup
│   ├── controllers/     # All logic handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # REST APIs
│   └── server.js
│
├── frontend/            # Vite React App
│   ├── components/      # UI Components
│   ├── pages/           # Views & Routes
│   └── main.tsx

````

---

## ⚙️ Environment Variables Setup

### 🔐 Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
ADMIN_EMAIL=admin@example.com
NODE_ENV=development

CORS_ORIGIN=http://localhost:5173

CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
````

### 🌐 Frontend `.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:4000
VITE_MODE=development
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AbhisekhNayek/SpotifyTalk.git
cd SpotifyTalk
```

### 2. Setup Backend

```bash
cd Backend
npm install
npm run dev
```

### 3. Setup Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

Access the app at **[http://localhost:5173](http://localhost:5173)**

---



## 🤝 Contributing

Got ideas or improvements? Fork this repo, make your changes, and submit a PR 🙌
Let's make this the coolest open-source music app together!

---

## 📜 License

**MIT License** © 2025 Abhisekh Nayek

---



