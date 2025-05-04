# 🌐 Client Frontend – Content Management System

This is the **client-facing frontend** of the Content Management System, built with **React**, **TypeScript**, and **TailwindCSS**. It allows regular users to browse and interact with published content in realtime.

---

## 🚀 Features

- View all published contents
- View published content detail by ID
- Login as a client
- Responsive UI with TailwindCSS
- REST API integration with backend
- Session storage for authentication
- Realtime content through socket.io

---

## 🧩 Technologies Used

- **React** (with Hooks)
- **Vite** – lightning-fast build tool
- **TypeScript**
- **TailwindCSS**
- **React Router**
- **Axios** for API calls

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/client-frontend.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root directory and add:

```bash
VITE_SOCKET_URL=http://localhost:3000
```

Replace localhost:3000 with your actual backend URL if needed.

### 💻 Running the App

```bash
npm run dev
```

The app will be available at http://localhost:5173 by default.

### 🧠 Notes

All requests requiring authentication should include the Bearer token in headers.

Login is required to unlock certain features (e.g., private content, user info).

### 🛠 Workflow File: `.github/workflows/client-ci.yml`

```yaml
name: Client Frontend CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run build
        run: npm run build
```

## 📹 Video Demo

Watch the demo video here:  
▶️ [Click to watch on YouTube](https://www.youtube.com/watch?v=2qURYZtp5g8)

## 👨‍💻 Maintainer

Tran Nhat Huy

Email: huy37204@gmail.com

<!-- Test -->
