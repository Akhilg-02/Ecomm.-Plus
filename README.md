# 🛒 E-Commerce Application

This project is a **full-stack e-commerce application** with a **ReactJS frontend** and a **Node.js + Express + MongoDB backend**. Below are the setup instructions for each part.

---

## 📌 Table of Contents
1. [Backend Setup](#-backend-setup-nodejs--express--mongodb)
2. [Frontend Setup](#-frontend-setup-reactjs--material-ui)
3. [API Documentation (Swagger)](#-api-documentation-swagger)
4. [Testing APIs (Postman / Thunder Client)](#-testing-apis-postman--thunder-client)

---

## 🚀 Backend Setup (Node.js + Express + MongoDB)

### **1️⃣ Install Dependencies**
Navigate to the `backend` directory and install required dependencies:
```sh
cd backend
npm install

### **2️⃣ Setup Environment Variables**
Create a .env file inside the backend directory and add the following:
```sh
PORT=any_port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


### **3️⃣ Start the Backend Server**
```sh
npm start

## 🎨 Frontend Setup (ReactJS + Material-UI)

### **1️⃣ Install Dependencies**
Navigate to the frontend directory and install dependencies:
```sh
cd frontend
npm install

### **2️⃣ Start the Frontend**
```sh
npm start


## 📄 API Documentation (Swagger)

### **1️⃣ Install Dependencies**
Ensure swagger-jsdoc and swagger-ui-express are installed:
```sh
npm install swagger-jsdoc swagger-ui-express

### **2️⃣ Open Swagger UI**
Once the backend is running, open your browser and visit:
```sh
http://localhost:PORT_NUMBER/api-docs