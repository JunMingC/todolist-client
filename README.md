# **Todo Management System - Client**

This is the **client-side application** for the Todo Management System, developed using **React**. The application provides an intuitive interface for managing todos, including adding, editing, deleting, sorting, filtering and viewing tasks. It integrates seamlessly with the backend API to perform CRUD operations.

## **Live Demo**
Check out the live version hosted on Google Cloud Platform:

- **Link:** [Todo Management System Client](https://todolist-client-433818.as.r.appspot.com/)


## **Table of Contents**
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Environment Configuration](#environment-configuration)
5. [Technologies Used](#technologies-used)

## **Features**
- **Add Todo:** Easily add new tasks with titles, descriptions, and due dates.
- **Edit Todo:** Modify existing tasks.
- **Delete Todo:** Remove tasks that are no longer needed.
- **Sort Todo List:** Sort tasks according to Due Date, Priority, Status, or Tags Count.
- **Filter Todo List:** Filter tasks by Due Date, Priority, Status, or Tags Count.
- **View Todo List:** Display all tasks with filters for priorities, statuses, and tags.
- **Responsive Design:** Mobile-friendly layout for managing tasks on the go.

## **Installation**
Follow these steps to set up the React client on your local machine:

### Prerequisites
- **Node.js** (version 20.17.0)

### Setup Steps
1. **Clone the repository:**
    ```bash
    git clone https://github.com/JunMingC/todolist-client.git
    cd todolist-client
    ```

2. **Switch to the required Node version (if using nvm):**
    ```bash
    nvm use 20.17.0
    ```

## **Usage**

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Run the application locally:**
    ```bash
    npm start
    ```

    - The application will start and can be accessed in your browser at [http://localhost:3000](http://localhost:3000).

## **Environment Configuration**

To manage environment-specific settings, create and configure `.env` files for different environments (e.g., `.env.local`, `.env.live`). Example configuration for `.env` file:

```plaintext
REACT_APP_API_URL=https://todolist-433816.as.r.appspot.com/api/
REACT_APP_VERSION=0.1.0
REACT_APP_NAME=Todo Management System Client
```

- **API Endpoint:** Update `REACT_APP_API_URL` to point to your backend API hosted on GCP or your local environment.

## **Technologies Used**
- **Frontend:** React, React Hooks
- **State Management:** React Query (for fetching, caching, and synchronizing data)
- **Styling:** SASS
- **Build Tool:** Create React App
- **Hosting:** Google Cloud Platform (GCP)