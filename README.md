# AI-Powered Q&A Agent

## Setup Instructions

### Backend

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Create a virtual environment:

   ```sh
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

4. Install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory and add your OpenAI API key:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

6. Start the backend server:
   ```sh
   python app.py
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

- Flask
- OpenAI
- python-dotenv

### Frontend

- React
- React-DOM
- React-Scripts

## How the AI Agent Works

The AI agent uses OpenAI's GPT model to generate responses based on user queries. The conversation history is maintained in memory and passed along with each query to provide context for better answers.

### Backend

- The backend is built using Flask.
- It provides an API endpoint `/api/query` to accept user queries.
- The query is forwarded to the OpenAI GPT model, and the response is returned along with the conversation history.
- The conversation history is stored in memory using Python dictionaries.

### Frontend

- The frontend is built using React.
- It provides a simple user interface with an input box for the user to type a query and a submit button to send the query.
- The AI's responses and the query history are displayed in a user-friendly format.
- The UI updates dynamically without requiring a page reload.

## Challenges Faced

### Integration Between Frontend and Backend

- **Challenge:** Ensuring smooth integration between the frontend and backend.
- **Solution:** Used CORS middleware in the backend to handle cross-origin requests and ensured consistent API endpoints.

### Managing Conversation History

- **Challenge:** Maintaining conversation history to provide context-aware responses.
- **Solution:** Stored conversation history in memory using Python dictionaries and passed the history along with each query to the OpenAI API.

### Handling API Errors

- **Challenge:** Handling API errors and providing meaningful feedback to the user.
- **Solution:** Implemented error handling in the backend to catch and log errors, and provided user-friendly error messages in the frontend.

## Future Improvements

- Implement persistent storage for conversation history.
- Add user authentication to personalize the experience.
- Enhance the UI for better user interaction.

## Running the Project

To run the project locally, follow the setup instructions for both the backend and frontend. Ensure that the backend server is running before starting the frontend development server. Open your browser and navigate to `http://localhost:3000` to use the AI-Powered Q&A Agent.

## Contact

For any questions or issues, please contact "Abdul Moiz" at "amoiz0468@gmail.com".
