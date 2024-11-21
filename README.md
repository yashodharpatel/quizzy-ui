# Quizzy UI - Frontend for Quiz app

Quizzy Client is a frontend application that allows users to take quizzes, view their scores, and interact with a dynamic quiz system. It communicates with the Quizzy Server backend to fetch quiz data, submit responses, and display results.

## Setup

To run the project locally, follow these steps:

### Prerequisites

- Node.js (v16 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yashodharpatel/quizzy-ui.git
   ```

2. Navigate into the project directory:

   ```bash
   cd quizzy-ui
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Rename a .env.example file to .env and fill the following environment variables:

   ```bash
   NEXT_PUBLIC_SERVER_URL = https://quizzy-server-znv9.onrender.com
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the application in your browser:
   ```bash
   http://localhost:3000
   ```

## Testing

You can test the frontend features by running the development server and interacting with the application in your browser. Additionally, use browser developer tools to debug and inspect the network requests.
