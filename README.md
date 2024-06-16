# Installation and Setup Instructions

## Prerequisites
Ensure you have the following installed and in hand:
- Node.js
- npm (Node Package Manager)
- Elasticsearch 7.17.19
- SERP API Key (Place it in the 'FetchGoogleResults.js' file in the 'source_code/frontend/src/apis' directory)
- OpenAI API Key (Place it in the 'FetchAI.js' file in the 'source_code/frontend/src/apis' directory)
- Google MAPS API Key (Place it in the 'Navbar.js' file in the 'source_code/frontend/src' directory)

## Setup

1. **Frontend Setup**

   Navigate to the source_code/frontend directory from the project root, install the required packages, and start the frontend server:
   
   ```bash
   cd frontend
   npm install
   npm start
   ```

   This command will install all dependencies and start the React development server, typically on [http://localhost:3000](http://localhost:3000).

2. **Elasticsearch**

   Ensure that Elasticsearch 7.17.19 is running on your system. You may need to start the Elasticsearch service manually, depending on your installation method.
   
   ```bash
   # Example command to start Elasticsearch; may vary based on your installation
   ./bin/elasticsearch
   ```

3. **Backend Setup**

   Navigate to the backend directory to install backend dependencies:
   
   ```bash
   cd source_code/backend
   npm install
   ```

4. **Initialize Elasticsearch Indices**

   Still within the backend folder, run the `GenerateIndices.js` script to set up your Elasticsearch indices:
   
   ```bash
   node GenerateIndices.js
   ```

5. **Start the Backend Server**

   Start the backend server by running the `DBServer.js`:
   
   ```bash
   node DBServer.js
   ```

6. **Run JSON Server for User Data**

   In a new terminal window or tab, still within the backend folder, start the JSON Server to manage the `users.json` data file:
   
   ```bash
   npx json-server --watch data/users.json --port 8001
   ```

   This command will serve the user data on [http://localhost:8001](http://localhost:8001).

## Usage
Once all services are running, the SportifyAI platform is operational. You can access the frontend on [http://localhost:3000](http://localhost:3000), where you can log in, view, and interact with the application as designed.
