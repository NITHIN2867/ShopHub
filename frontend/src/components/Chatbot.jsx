import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';

export default function Chatbot() {
  const { isChatOpen, openChat, closeChat } = useChat();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to ShopHub. How can we help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const commonResponses = {
    'hello': 'Hi there! 👋 How can I assist you with your shopping today?',
    'help': 'I can help you with:\n• Product information\n• Order tracking\n• Returns & refunds\n• Shipping details\n• Account issues\n\nWhat would you like help with?',
    'order': 'To track your order, please provide your order ID. You can find it in your "My Orders" section.',
    'return': 'Our return policy allows returns within 30 days. Please visit the Returns section in your account or contact our support team.',
    'shipping': 'We offer standard (5-7 days) and express (1-2 days) shipping. Shipping costs are calculated at checkout.',
    'payment': 'We accept all major credit cards, debit cards, UPI, and digital wallets. Your payment is secure and encrypted.',
    'account': 'You can manage your account from the profile section. If you\'re having issues, please let us know!',
    'thank': 'You\'re welcome! 😊 Is there anything else I can help you with?',
    'bye': 'Thank you for chatting with us! Have a great day! 👋'
  };

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(commonResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return "Thanks for your message! 😊 For more detailed assistance, please contact our support team or visit the Help section.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={isChatOpen ? closeChat : openChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all z-40 flex items-center justify-center transform hover:scale-110"
        aria-label="Open chat"
      >
        {isChatOpen ? (
          <FiX className="text-2xl" />
        ) : (
          <FiMessageCircle className="text-2xl" />
        )}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl flex flex-col z-40 max-h-96 border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl">
            <h3 className="text-lg font-bold">ShopHub Customer Care</h3>
            <p className="text-sm text-blue-100">Available 24x7 to help you</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                <FiSend className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
