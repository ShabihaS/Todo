# Todo App

A full-stack Todo application built as part of my _nology software development training.

The project consists of a **React + TypeScript frontend** and a **Java + Spring Boot backend** connected to a **MySQL database**. The application allows users to create and manage Todo tasks, organise them by category, and interact with the data through a RESTful API.

## Project Overview

The goal of the project was to create an API that integrates with a Todo frontend and allows tasks and categories to be stored and retrieved from a database.

The application includes:

* Todo task management
* Category management
* RESTful API
* MySQL database persistence
* Category-based Todo filtering
* Soft deletion of Todo tasks
* Frontend and backend separation

## Features

### Todo Management

* Add new Todo tasks
* Assign a category to each Todo
* View Todo tasks
* Update Todo task names and categories
* Delete Todo tasks using soft deletion
* Filter Todos by category

### Category Management

* Add categories
* View categories
* Update categories
* Delete categories

### Database

Todos and categories are stored in **separate database tables**.

Deleting a Todo does not permanently remove it from the database. Instead, the Todo is marked using an `isArchived` flag.

## Technologies

### Frontend

* React
* TypeScript
* Vite
* React Hook Form
* Zod
* React Query
* CSS

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Maven
* REST API

### Database

* MySQL

### Tools

* Git
* GitHub
* VS Code
* Postman

## Project Structure

```text
Todo/
│
├── todo_backend/
│   └── Java + Spring Boot REST API
│
└── todo_frontend/
    └── React + TypeScript application
```

## API Endpoints

### Categories

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/categories`     | Get all categories    |
| POST   | `/categories`     | Create a new category |
| PUT    | `/categories/:id` | Update a category     |
| DELETE | `/categories/:id` | Delete a category     |

### Todos

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| GET    | `/todos`             | Get all active Todos           |
| GET    | `/todos?category={}` | Get Todos filtered by category |
| POST   | `/todos`             | Create a new Todo              |
| PUT    | `/todos/:id`         | Update a Todo                  |
| DELETE | `/todos/:id`         | Archive a Todo                 |

## Database Design

The application stores **Todos and Categories in separate tables**.

Each Todo is associated with a category, allowing the frontend to filter tasks by category.

Todo deletion is implemented as a **soft delete**. Instead of removing the database record, the `isArchived` field is updated.

This allows archived tasks to remain in the database while keeping them out of the normal Todo list.

## Getting Started

### Prerequisites

You will need:

* Java
* Maven
* Node.js
* npm
* MySQL

### Clone the Repository

```bash
git clone https://github.com/ShabihaS/Todo.git
cd Todo
```

### Database Setup

Create the MySQL database:

```sql
CREATE DATABASE todos_db;
```

Configure the database connection in the Spring Boot application with your local MySQL credentials.

For example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todos_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Do not commit passwords or other sensitive credentials to GitHub.

### Run the Backend

```bash
cd todo_backend
mvn spring-boot:run
```

### Run the Frontend

Open another terminal:

```bash
cd todo_frontend
npm install
npm run dev
```

The Vite development server will provide the local frontend URL in the terminal.

## Project Requirements

The project was developed based on the following requirements.

### MVP

* Add categories
* Add new tasks with a category
* Update tasks by changing the task name and category
* Delete tasks
* Store Todos and Categories in separate database tables
* Implement soft deletion using an `isArchived` flag
* Filter tasks by category
* Create a REST API for the frontend

### Additional Features

The project also includes functionality for managing categories, including updating and deleting categories.

## What I Practised

Through this project I practised:

* Building a RESTful API with Spring Boot
* Creating controllers, services and repositories
* Working with Java and Spring Data JPA
* Designing relationships between database entities
* Connecting a React frontend to a Spring Boot backend
* Using TypeScript with React
* Managing forms and validation
* Working with React Query
* Implementing CRUD operations
* Implementing soft deletion
* Filtering data using query parameters
* Handling API errors and validation
* Working with MySQL
* Using Git and GitHub for version control

## Future Improvements

Possible future improvements include:

* User authentication
* Todo priorities
* Due dates
* Search and sorting
* Pagination
* Automated tests
* Deployment to a cloud platform

## Author

**Shabiha Sultana**

GitHub: [ShabihaS](https://github.com/ShabihaS)
