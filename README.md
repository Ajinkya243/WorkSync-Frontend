# Engineering Resource Management App

A full-stack web application for managing engineering resources, task assignments, and team capacity, built with **Node.js**, **Express.js**, **MongoDB**, and **React.js**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure login using **JWT (JSON Web Token)**
- **Role-based access**: Manager and Engineer
- Protected routes for authorized users only

| Role     | Access Permissions                            |
| -------- | --------------------------------------------- |
| Manager  | Manage projects, assign tasks, view engineers |
| Engineer | View and edit profile, see assigned tasks     |


### 👨‍💼 Manager Features
- View all **projects**
- **Assign tasks** to engineers based on required skills
- **Edit** or **delete** assigned tasks
- View list of **engineers** with:
  - Current task load
  - Allocation percentage
- Create new projects

### 👷 Engineer Features
- View all **tasks assigned** to them
- Access personal **profile page**
- **Edit own profile** including skills and email

---

## 🛠️ Tech Stack
Backend Repository - https://github.com/Ajinkya243/WorkSync
### Backend:
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** for authentication
  

### Frontend:
- **React.js**
- **HTML5**
- **CSS3**

---

## 📁 Folder Structure

engineering-resource-management/
│
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── ...
│
├── server/ # Node.js backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── index.js
│ └── ...

🤖 How I Built This App with Help from ChatGPT
While building this Engineering Resource Management App, I explored many concepts and implementation details by asking ChatGPT how things work behind the scenes.
- How does JWT authentication work? How can I protect routes and handle login differently for manager and engineer roles
- How to structure an Express.js backend in a modular way? What should go into routes, controllers, and models
- How to store and update engineer capacity correctly? Can availableCapacity be automatically set based on maxCapacity
- How to calculate remaining capacity dynamically based on assigned tasks


![image](https://github.com/user-attachments/assets/e668fd35-2346-48cc-95f1-6d8702c0aff0)

Create new assignment
![image](https://github.com/user-attachments/assets/d896e190-d902-4719-8d75-7cd179373b78)

![image](https://github.com/user-attachments/assets/ee962044-ba04-481a-8fd8-3989e4baa46e)
![image](https://github.com/user-attachments/assets/2595fa16-0f8c-463c-9ef3-314e414f0d76)







