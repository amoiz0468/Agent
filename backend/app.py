import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# In-memory conversation history
conversation_history = []

@app.route('/api/query', methods=['POST'])
def handle_query():
    # Get query from request
    data = request.json
    query = data.get('query', '').strip()

    # Validate the query
    if not query:
        return jsonify({"error": "Query is required"}), 400

    try:
        # Check if query relates to previous conversation
        context_message = find_relevant_context(query)

        # Prepare messages for OpenAI API
        messages = [
            {"role": "assistant" if msg['type'] == "bot" else msg['type'], 
             "content": msg['text']} 
            for msg in conversation_history
        ]

        # Add context message if found
        if context_message:
            messages.append({
                "role": "system", 
                "content": f"Relevant context from previous conversation: {context_message}"
            })

        # Add current user query
        messages.append({"role": "user", "content": query})

        # Send the query to OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        # Extract AI response
        ai_response = response.choices[0].message.content

        # Update conversation history
        conversation_history.append({"text": query, "type": "user"})
        conversation_history.append({"text": ai_response, "type": "assistant"})
        print(conversation_history)
        # Send the response back
        return jsonify({
            "reply": ai_response, 
            "history": conversation_history
        })

    except Exception as error:
        print(f"Error: {error}")
        return jsonify({"error": "Failed to get response from AI"}), 500

def find_relevant_context(query):
    """
    Find relevant context from previous conversation based on query similarity.
    Simple implementation using basic text matching.
    """
    # Convert query to lowercase for case-insensitive matching
    query_lower = query.lower()

    # Look for relevant context in the last few messages
    for i in range(len(conversation_history) - 1, -1, -1):
        prev_msg = conversation_history[i]['text'].lower()
        
        # Check for keyword matches or similarity
        if (query_lower in prev_msg or 
            any(keyword in query_lower for keyword in prev_msg.split())):
            return conversation_history[i]['text']
    
    return None

if __name__ == '__main__':
    app.run(port=5000, debug=True)