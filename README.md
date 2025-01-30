# AI-Powered Q&A Agent

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the backend directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm start
   ```

### Access the Application

Open your browser and navigate to `http://localhost:3000` to use the AI-Powered Q&A Agent.

## Dependencies

### Backend

- Node.js
- Express
- OpenAI
- CORS
- Dotenv

### Frontend

- React
- React-DOM
- React-Scripts

## How the AI Agent Works

The AI agent uses OpenAI's GPT model to generate responses based on user queries. The conversation history is maintained in memory and passed along with each query to provide context for better answers.

### Backend

- The backend is built using Node.js and Express.
- It provides an API endpoint `/api/query` to accept user queries.
- The query is forwarded to the OpenAI GPT model, and the response is returned along with the conversation history.
- The conversation history is stored in memory using JavaScript objects.

### Frontend

- The frontend is built using React.
- It provides a simple user interface with an input box for the user to type a query and a submit button to send the query.
- The AI's responses and the query history are displayed in a user-friendly format.
- The UI updates dynamically without requiring a page reload.

## Challenges Faced

- Ensuring smooth integration between the frontend and backend.
- Managing conversation history to provide context-aware responses.
- Handling API errors and providing meaningful feedback to the user.

## Future Improvements

- Implement persistent storage for conversation history.
- Add user authentication to personalize the experience.
- Enhance the UI for better user interaction.

## Running the Project

To run the project locally, follow the setup instructions for both the backend and frontend. Ensure that the backend server is running before starting the frontend development server. Open your browser and navigate to `http://localhost:3000` to use the AI-Powered Q&A Agent.

## Contact

For any questions or issues, please contact "Abdul Moiz" at "amoiz0468@gmail.com".
