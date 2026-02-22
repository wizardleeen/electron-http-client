# Electron HTTP Client

A simple desktop HTTP client built with Electron and React.

## Features

- 🚀 Support for all HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)
- 📝 Custom headers support
- 📤 Request body editor for POST/PUT/PATCH requests
- 📊 Response viewer with status, headers, and formatted JSON
- ⏱️ Response time tracking
- 🎨 Clean and intuitive interface
- 💻 Cross-platform desktop application

## Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/wizardleeen/electron-http-client.git
   cd electron-http-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run electron-dev
   ```
   This will start both the React development server and the Electron app.

### Building

To build the application for production:

```bash
npm run electron-pack
```

This will create a `dist` folder with the packaged application for your platform.

### Scripts

- `npm start` - Start React development server
- `npm run build` - Build React app for production
- `npm run electron` - Start Electron (requires built React app)
- `npm run electron-dev` - Start both React dev server and Electron in development mode
- `npm run electron-pack` - Build and package the Electron app

## Usage

1. **Enter URL**: Type your API endpoint URL in the URL field
2. **Select Method**: Choose the HTTP method from the dropdown
3. **Add Headers**: Add custom headers in the format `Key: Value` (one per line)
4. **Add Body**: For POST/PUT/PATCH requests, add your request body (JSON or text)
5. **Send Request**: Click the "Send" button to execute the request
6. **View Response**: The response will be displayed with status, headers, and body

### Example Requests

**GET Request:**
- URL: `https://jsonplaceholder.typicode.com/posts/1`
- Method: GET
- Click Send

**POST Request:**
- URL: `https://jsonplaceholder.typicode.com/posts`
- Method: POST
- Headers:
  ```
  Content-Type: application/json
  ```
- Body:
  ```json
  {
    "title": "My New Post",
    "body": "This is the content of my post",
    "userId": 1
  }
  ```

## Technology Stack

- **Electron**: Cross-platform desktop app framework
- **React**: UI library for building the interface
- **Axios**: HTTP client for making requests
- **CSS**: Custom styling for the interface

## License

MIT License - feel free to use this project for your own purposes.
