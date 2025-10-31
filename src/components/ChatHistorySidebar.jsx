import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Plus,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trash2,
  MoreVertical,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = "/api";

const ChatHistorySidebar = ({
  isOpen,
  onToggle,
  currentSessionId,
  onSessionChange,
  onNewChat,
}) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load chat history on component mount and when sidebar opens
  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen]);

  const loadChatHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setConversations(response.data.conversations || []);
    } catch (err) {
      console.error("Error loading chat history:", err);
      setError("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  };

  const handleSessionSelect = (sessionId) => {
    if (sessionId !== currentSessionId) {
      onSessionChange(sessionId);
    }
  };

  const handleNewChat = () => {
    onNewChat();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const getLastMessagePreview = (conversation) => {
    if (!conversation.lastMessage) return "No messages yet";

    const { content, role } = conversation.lastMessage;
    const preview = truncateText(content);
    return role === "user" ? `You: ${preview}` : `AI: ${preview}`;
  };

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      {/* Sidebar */}
      <div className={`chat-history-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <MessageSquare size={20} />
            <span>Chat History</span>
          </div>
          <button className="sidebar-close" onClick={onToggle}>
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="sidebar-content">
          {/* New Chat Button */}
          <button className="new-chat-button" onClick={handleNewChat}>
            <Plus size={16} />
            <span>New Chat</span>
          </button>

          {/* Chat History List */}
          <div className="conversations-list">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner" />
                <span>Loading conversations...</span>
              </div>
            ) : error ? (
              <div className="error-state">
                <span>{error}</span>
                <button className="retry-button" onClick={loadChatHistory}>
                  Retry
                </button>
              </div>
            ) : conversations.length === 0 ? (
              <div className="empty-state">
                <MessageSquare size={32} />
                <span>No conversations yet</span>
                <p>Start a new chat to see your history here</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.sessionId}
                  className={`conversation-item ${
                    conversation.sessionId === currentSessionId ? "active" : ""
                  }`}
                  onClick={() => handleSessionSelect(conversation.sessionId)}
                >
                  <div className="conversation-header">
                    <div className="conversation-title">
                      {truncateText(conversation.title, 30)}
                    </div>
                    <div className="conversation-time">
                      <Clock size={12} />
                      <span>{formatTime(conversation.updatedAt)}</span>
                    </div>
                  </div>

                  <div className="conversation-preview">
                    {getLastMessagePreview(conversation)}
                  </div>

                  <div className="conversation-meta">
                    <span className="message-count">
                      {conversation.messageCount} message
                      {conversation.messageCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="footer-info">
            <span>Last 8 conversations</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHistorySidebar;
