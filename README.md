# 📒 LEdge Pro

**LEdge Pro** is a single-admin credit management web application built for local shopkeepers to manage customer udhar (credit), track payments, and send reminders digitally.

It replaces traditional notebook-based ledgers with a secure, automated, and structured system.

---

## 🚀 Core Features

- 🔐 Secure Admin Authentication (JWT Based)
- 👤 Customer Search (Check if exists before creating new)
- ➕ Add Udhar Entries
- 💰 Automatic Pending Amount Calculation
- 💳 Record Payments (Online / Offline)
- 🔔 7-Day Automated Reminder System
- 🔒 Password Hashing using bcrypt
- 🗄 MongoDB Database Integration

---

## 🛠 Tech Stack

### Frontend
- React 
- React Router
- React Hook Form
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt
- dotenv


## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Ayodhya-Rode/Ledger-Pro-POC.git
``


## 🔐 Authentication Flow

1. Admin registers
2. Password is hashed using bcrypt
3. JWT token is generated on login
4. Protected routes are secured using middleware


## 🔔 Reminder System

- Tracks 7-day credit cycle
- Sends automatic reminder notification
- Stops reminder once payment is recorded

---

## 🎯 Use Case

Designed specifically for small shopkeepers who manage credit transactions manually and want a simple digital ledger without requiring customers to install any app.

---

## 👩‍💻 Author

**Ayodhya Rode**

---

## 📄 License

This project is created for educational and portfolio purposes.