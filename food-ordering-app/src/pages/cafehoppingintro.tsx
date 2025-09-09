import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CafeHoppingIntro = () => {
  const navigate = useNavigate();

  // Check if user has already made a choice
  useEffect(() => {
    const hasChosen = localStorage.getItem('cafeHoppingChoice');
    if (hasChosen) {
      navigate('/menu');
    }
  }, [navigate]);

  const handleChoice = (choice: 'experienced' | 'new') => {
    // Save user's choice to localStorage
    localStorage.setItem('cafeHoppingChoice', choice);
    
    // Navigate to menu page
    navigate('/menu');
    
    // In a real app, you might want to:
    // 1. Send this info to your backend
    // 2. Customize the user experience based on their choice
    // 3. Show different recommendations
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-yellow-500 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Cafe Hopping Experience</h1>
          <p className="text-blue-100 mt-2">Let's personalize your cafe journey!</p>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Are you a cafe hopper?</h2>
            <p className="text-gray-600 mt-2">Help us tailor your experience based on your cafe exploration level.</p>
          </div>
          
          <div className="space-y-6">
            {/* Experienced Cafe Hopper Option */}
            <div 
              className="border-2 border-blue-200 rounded-xl p-6 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer transform hover:scale-105"
              onClick={() => handleChoice('experienced')}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">🌟</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">Experienced Hopper</h3>
                  <p className="text-gray-600 mt-1">I've explored many cafes and know what I like</p>
                </div>
              </div>
              <div className="mt-4 pl-16">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Get advanced recommendations</li>
                  <li>• Discover hidden gems</li>
                  <li>• Compare multiple cafes</li>
                </ul>
              </div>
            </div>
            
            {/* New to Cafe Hopping Option */}
            <div 
              className="border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer transform hover:scale-105"
              onClick={() => handleChoice('new')}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold text-xl">👋</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">New Explorer</h3>
                  <p className="text-gray-600 mt-1">I'm new to cafe hopping and want guidance</p>
                </div>
              </div>
              <div className="mt-4 pl-16">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Get beginner-friendly suggestions</li>
                  <li>• Learn about cafe culture</li>
                  <li>• Start with popular options</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your choice will help us personalize your cafe recommendations.</p>
            <p className="mt-1">You can change this later in settings.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-600 max-w-md">
        <p>By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
      </div>
    </div>
  );
};

export default CafeHoppingIntro;
