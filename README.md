# Shopify Merchant Support Agent - Frontend

A modern React chat interface for the Shopify Merchant Support Agent with AI-powered assistance.

## Features

- 🤖 **AI Chat Interface**: Interactive chat with the Shopify Merchant Support Agent
- 📚 **Source Citations**: Expandable source panel showing relevant documentation
- 📋 **Code Copy**: One-click copy buttons for code snippets with syntax highlighting
- 👍 **Feedback System**: Thumbs up/down feedback for responses
- 💾 **Conversation History**: Persistent conversation storage with MongoDB
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Optimized for mobile and desktop devices

## Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **React Syntax Highlighter** - Code syntax highlighting

## Prerequisites

- Node.js 18+
- Backend API server running on port 3000
- MongoDB connection configured in backend

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Backend Setup

Make sure the backend API server is running:

```bash
cd ../backend
npm install
npm run api
```

The API server should be running on `http://localhost:3000`

## Environment Variables

The frontend connects to the backend API at `http://localhost:3000/api` by default. To change this, update the `API_BASE_URL` constant in `src/App.jsx`.

## Usage

1. Open the frontend in your browser
2. Start chatting with the AI assistant
3. Ask questions about Shopify APIs, store management, or merchant tools
4. View source citations by clicking "Sources" button
5. Copy code snippets using the copy button
6. Provide feedback using thumbs up/down buttons

## API Endpoints

The frontend communicates with these backend endpoints:

- `POST /api/chat` - Send a message and get AI response
- `GET /api/history/:sessionId` - Retrieve conversation history

## Features in Detail

### Chat Interface

- Real-time messaging with typing indicators
- Message history persistence
- Session-based conversations
- Error handling and retry logic

### Source Citations

- Expandable source panel
- Relevance scores and search types
- Direct links to documentation
- Category and metadata display

### Code Highlighting

- Syntax highlighting for multiple languages
- Copy-to-clipboard functionality
- Inline code formatting
- Code block styling

### Feedback System

- Thumbs up/down voting
- Visual feedback confirmation
- Persistent feedback state

## Development

### Project Structure

```
src/
├── App.jsx          # Main chat component
├── App.css          # Chat interface styles
├── main.jsx         # React entry point
├── index.css        # Global styles
└── utils/
    └── markdown.js  # Markdown parsing utility
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Styling

The interface uses custom CSS with a modern design system. Key styling files:

- `src/App.css` - Main chat interface styles
- `src/index.css` - Global styles and resets

### API Configuration

Update the `API_BASE_URL` constant in `src/App.jsx` to point to your backend server.

### Theme Customization

The color scheme can be customized by modifying CSS custom properties in `src/App.css`.

## Troubleshooting

### Common Issues

1. **API Connection Errors**

   - Ensure backend server is running on port 3000
   - Check CORS configuration in backend
   - Verify API endpoints are accessible

2. **Styling Issues**

   - Clear browser cache
   - Check for CSS conflicts
   - Verify Tailwind CSS is properly configured

3. **Build Errors**
   - Run `npm install` to ensure dependencies are installed
   - Check Node.js version compatibility
   - Clear node_modules and reinstall if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Shopify Merchant Support Agent system.
