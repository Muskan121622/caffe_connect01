import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI cafe assistant 🤖 I can help you find the perfect cafe based on your preferences. What kind of food or atmosphere are you looking for today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock cafe database with detailed recommendations
  const cafeDatabase = [
    {
      name: "Campus Central Cafe",
      specialty: "Burgers & Fast Food",
      rating: 4.5,
      description: "Perfect for quick bites between classes. Famous for their crispy burgers, loaded fries, and quick service. Great for students on a budget!",
      keywords: ["burger", "fries", "fast", "quick", "budget"]
    },
    {
      name: "Healthy Bites Canteen",
      specialty: "Healthy & Vegetarian",
      rating: 4.3,
      description: "Great for health-conscious students. Offers fresh salads, smoothies, and nutritious meals. Perfect for gym-goers and health enthusiasts.",
      keywords: ["healthy", "salad", "vegetarian", "veg", "gym", "smoothie"]
    },
    {
      name: "Desi Delights",
      specialty: "Indian Cuisine",
      rating: 4.7,
      description: "Authentic Indian flavors with specialties like Pav Bhaji, Chole Bhature, and Masala Dosa. Perfect for when you're craving home-style food!",
      keywords: ["indian", "desi", "spicy", "pav bhaji", "dosa", "bhature", "chole"]
    },
    {
      name: "Coffee Corner",
      specialty: "Coffee & Beverages",
      rating: 4.4,
      description: "The go-to spot for coffee lovers. Serves excellent cold coffee, thick shakes, and light snacks. Perfect study spot with great ambiance.",
      keywords: ["coffee", "beverage", "shake", "cold coffee", "study"]
    },
    {
      name: "Quick Bites Express",
      specialty: "Snacks & Fast Service",
      rating: 4.2,
      description: "When you're in a hurry! Specializes in sandwiches, samosas, and quick snacks. Perfect for between-class munchies.",
      keywords: ["snack", "sandwich", "samosa", "quick", "light"]
    }
  ];

  const findBestCafeMatch = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Find matching cafes based on keywords
    const matchingCafes = cafeDatabase.filter(cafe => 
      cafe.keywords.some(keyword => message.includes(keyword))
    );
    
    if (matchingCafes.length > 0) {
      // Return the cafe with highest rating among matches
      const bestMatch = matchingCafes.reduce((prev, current) => 
        (prev.rating > current.rating) ? prev : current
      );
      
      return `I recommend **${bestMatch.name}** (${bestMatch.rating}/5 ⭐)!\n\n${bestMatch.description}\n\nThis cafe specializes in ${bestMatch.specialty}.`;
    }
    
    // If no specific matches, check for general queries
    if (message.includes('best') || message.includes('top') || message.includes('recommend')) {
      const topCafe = cafeDatabase.reduce((prev, current) => 
        (prev.rating > current.rating) ? prev : current
      );
      return `Our highest-rated cafe is **${topCafe.name}** (${topCafe.rating}/5 ⭐)!\n\n${topCafe.description}\n\nThis cafe specializes in ${topCafe.specialty}.`;
    }
    
    if (message.includes('all') || message.includes('list') || message.includes('options')) {
      return `Here are all our campus cafes:\n\n${cafeDatabase.map(cafe => 
        `🍽️ **${cafe.name}** (${cafe.rating}/5 ⭐)\n   🎯 ${cafe.specialty}\n   ${cafe.description}`
      ).join('\n\n')}`;
    }
    
    if (message.includes('cheap') || message.includes('budget') || message.includes('affordable')) {
      const budgetFriendly = cafeDatabase.filter(cafe => cafe.specialty.includes('Fast') || cafe.specialty.includes('Snacks'));
      return `Budget-friendly options:\n\n${budgetFriendly.map(cafe => 
        `💰 **${cafe.name}** (${cafe.rating}/5 ⭐)\n   ${cafe.description}`
      ).join('\n\n')}\n\nAll our cafes offer student discounts!`;
    }
    
    // Default response
    return "I can help you find the perfect cafe! Try asking me about:\n\n🍔 Fast food & burgers\n🥗 Healthy & vegetarian options\n🍛 Indian cuisine\n☕ Coffee & beverages\n🥪 Quick snacks\n\nOr just tell me what you're craving and I'll find the best match for you!";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: findBestCafeMatch(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaRobot />
              <h3 className="font-bold">Cafe Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <FaTimes />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${message.isBot
                    ? 'bg-white text-gray-800 border border-gray-200'
                    : 'bg-blue-600 text-white'
                    }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4 bg-white">
            <div className="flex items-center">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cafes, food, or recommendations..."
                className="flex-1 border rounded-l-lg p-2 h-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed h-12"
              >
                <FaPaperPlane />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
