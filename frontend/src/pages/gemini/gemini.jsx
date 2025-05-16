// import React, { useState } from 'react';
// import './Gemini.css'; // We'll update this

// const Gemini = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
    
//     // Add user message
//     setMessages(prev => [...prev, { text: input, sender: 'user' }]);
//     setIsLoading(true);
//     const userInput = input;
//     setInput(''); // Clear input immediately
    
//     try {
//       const res = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: userInput }] }]
//           })
//         }
//       );

//       const data = await res.json();
//       const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
      
//       // Add AI response
//       setMessages(prev => [...prev, { text: responseText, sender: 'ai' }]);
      
//     } catch (error) {
//       setMessages(prev => [...prev, { 
//         text: `Error: ${error.message}`, 
//         sender: 'ai',
//         isError: true 
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="gemini-container">
//       <div className="gemini-header">
//         <h2>Note-Flux x Gemini Chat</h2>
//         <div className="model-badge">1.5 Flash</div>
//       </div>
      
//       <div className="chat-container">
//         <div className="messages-area">
//           {messages.map((msg, index) => (
//             <div 
//               key={index} 
//               className={`message-bubble ${msg.sender}-bubble ${msg.isError ? 'error-bubble' : ''}`}
//             >
//               {msg.text}
//             </div>
//           ))}
//           {isLoading && (
//             <div className="message-bubble ai-bubble">
//               <div className="typing-indicator">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           )}
//         </div>
        
//         <form onSubmit={handleSubmit} className="input-area">
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             disabled={isLoading}
//             className="prompt-input"
//             rows="3"
//           />
//           <button 
//             type="submit" 
//             disabled={isLoading || !input.trim()}
//             className="submit-button"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Gemini;
import React, { useState } from 'react';
import './Gemini.css';

const Gemini = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setIsLoading(true);
    const userInput = input;
    setInput(''); // Clear input immediately
    
    try {
      const res = await fetch(
        //`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC20HFWZcau07gfbAA7B-STlkNMEgJZtME`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userInput }] }]
          })
        }
      );

      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
      
      // Add AI response
      setMessages(prev => [...prev, { text: responseText, sender: 'ai' }]);
      
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: `Error: ${error.message}`, 
        sender: 'ai',
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // You could add a temporary "Copied!" indicator here if you want
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="gemini-container">
      <div className="gemini-header">
        <h2>Note-Flux x Gemini Chat</h2>
        <div className="model-badge">1.5 Flash</div>
      </div>
      
      <div className="chat-container">
        <div className="messages-area">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message-bubble ${msg.sender}-bubble ${msg.isError ? 'error-bubble' : ''}`}
            >
              {msg.sender === 'ai' && !msg.isError && (
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard(msg.text)}
                  title="Copy to clipboard"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.24264C20 6.44772 19.6839 5.68514 19.1213 5.12256L16.8774 2.87868C16.3149 2.31607 15.5523 2 14.7574 2H10C8.89543 2 8 2.89543 8 4Z" fill="currentColor"/>
                    <path d="M4 8V20C4 21.1046 4.89543 22 6 22H14C15.1046 22 16 21.1046 16 20V19H10C7.79086 19 6 17.2091 6 15V8H4Z" fill="currentColor"/>
                  </svg>
                </button>
              )}
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="message-bubble ai-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="prompt-input"
            rows="3"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="submit-button"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gemini;