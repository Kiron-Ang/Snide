# Snide

**Snide** is a simple real-time chatroom web application built with
**Node.js (v23.5.0)**, **Express (4.21.2)**, and **Socket.IO (4.8.1)**. This
app allows users to join a chatroom, set a username with their first message,
and interact with others in real-time through WebSocket connections. It’s a
lightweight solution for building web-based chat applications.

## Features

- **Real-time messaging;**
- **custom usernames;**
- **a simple user interface;**
- **and a great experience for both desktop and mobile users!**

## Installation

To run this project on your local machine, follow the steps below:

### 1. Clone the repository

```
git clone https://github.com/Kiron-Ang/Snide.git
```

### 2. Install dependencies

Navigate to the project directory and install the required dependencies:

```
cd Snide
npm init -y
npm install express socket.io
```

### 3. Run the application

Start the server with the following command:

```
node server.js
```

This will start the application on http://localhost:3000. Open this URL in
your browser to access the chatroom.

## Usage

Once users access the web applcation, they will be able to send messages
using a simple text box interface. The first message sent will set the
username for the remainder of the session; users can reload the page to
change their username. New users cannot see previous chat messages, though
all messages are recorded in the server's logs. All messages are sent and
received in real-time.

## Project Structure

Here’s an overview of the project structure:

```
Snide/
├── public/
│   ├── index.html        # HTML file for the chatroom interface
│   ├── styles.css        # Styles for the chatroom UI
│   └── script.js         # Client-side JavaScript for chat interactions
├── server.js             # Main server file for handling connections/routing
├── license.txt           # Project licensing information
└── readme.md             # This README file
```

## Contributing

If you’d like to contribute to **Snide**, feel free to fork the repository,
make changes, and submit a pull request. Please make sure to follow the
coding standards and provide appropriate test coverage for new features.

### How to Contribute:

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and test them locally.
5. Commit your changes with clear, concise commit messages.
6. Push your changes to your forked repository.
7. Open a pull request to the main repository.

## License

See the [license](LICENSE.txt) file for details.

## Questions or Comments?

If you have any questions, issues, or suggestions, please feel free to reach out:

- **Email**: [kiron_ang1@baylor.edu](mailto:kiron_ang1@baylor.edu)