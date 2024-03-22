# iNotedesk

iNotedesk is a web-based note-taking application that allows users to create and store notes online effortlessly. Built with React.js for the frontend and MongoDB for data storage, iNotedesk provides a simple and intuitive platform for managing your notes.

## Features

- **Effortless Note-Taking:** Create, edit, and delete notes seamlessly with a user-friendly interface.
- **Secure Storage:** All your notes are securely stored in MongoDB, ensuring data integrity and accessibility.
- **Responsive Design:** iNotedesk is designed to work smoothly on various devices, providing a consistent experience.

## Technologies Used

- **React.js:** A JavaScript library for building user interfaces.
- **MongoDB:** A NoSQL database for storing and retrieving note data.
- **Node.js:** Used for server-side logic and API integration.
- **Express.js:** A web application framework for Node.js used for building the backend.

## Getting Started

To run iNotedesk locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/iNotedesk.git
cd iNotedesk
```
2. Install dependencies:

```bash
npm install
```

3. Set up MongoDB Database locally or in MongoDB cluster:
4. Create .env file then add MongoDB connection string:
   example ⬇⬇
```
BACKEND_NAME='[Your backend Name]'
BACKEND_PASSWORD='[your backend password]'
PORT = 9000
```
5. Finally start the application:
   
```
npm start
```
