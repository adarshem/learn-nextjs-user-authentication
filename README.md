# Learn Next.js User Authentication

Welcome to the **Learn Next.js User Authentication** project! This is a study project aimed at understanding and implementing **user authentication and authorization** in a Next.js application. The project uses **Lucia Auth** for authentication logic and **better-sqlite3** as the database for storing user details.

![Screenshot 2025-02-01 at 3 29 55 PM](https://github.com/user-attachments/assets/32320b54-ba8d-4fd4-97cc-111134a0add0)



---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Authentication Flow](#authentication-flow)
6. [Contributing](#contributing)

---

## Project Overview
This project is a hands-on learning experience to understand how to implement **user authentication** and **authorization** in a Next.js application. The goal is to explore:
- User registration and login.
- Session management.
- Protected routes.
- Role-based access control (if applicable).

The project uses **Lucia Auth**, a lightweight and flexible authentication library, and **better-sqlite3** for database storage.

---

## Features
- **User Registration**: Users can create an account with an email and password.
- **User Login**: Registered users can log in to their accounts.
- **Session Management**: Persistent user sessions using cookies.
- **Protected Routes**: Certain routes are only accessible to authenticated users.
- **Database Integration**: User details are stored in a SQLite database using `better-sqlite3`.

---

## Technologies Used
- **Next.js**: A React framework for building server-rendered applications.
- **Lucia Auth**: A lightweight authentication library for handling user sessions and authentication logic.
- **better-sqlite3**: A fast and lightweight SQLite database for storing user details.
- **TypeScript**: For type-safe development.

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn or pnpm

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/learn-nextjs-user-authentication.git
   cd learn-nextjs-user-authentication
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   # or
   yarn install
   ```

5. **Run the Application**:
   ```bash
   pnpm run dev
   # or
   yarn dev
   ```

6. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

---


## Authentication Flow
1. **User Registration**:
   - The user submits their email and password via the registration form.
   - The credentials are validated and stored in the SQLite database.
   - A new session is created, and the user is logged in.

2. **User Login**:
   - The user submits their email and password via the login form.
   - The credentials are verified against the database.
   - If valid, a session is created, and the user is logged in.

3. **Session Management**:
   - Sessions are stored in cookies and validated on each request.
   - Protected routes check for a valid session before allowing access.

4. **Logout**:
   - The user's session is destroyed, and they are logged out.

---

## Contributing
This is a study project, but contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

Happy coding! If you have any questions or feedback, feel free to open an issue or reach out. 🚀
