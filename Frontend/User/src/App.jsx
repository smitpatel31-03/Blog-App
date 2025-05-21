import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Services from './services/services.js';

function App() {
  const [email, setEmail] = useState("");

  const subscribe = async () => {
    if (email.trim() === "") {
      toast.error("Please enter an email address");
    } else {
      const sendMail = await Services.addEmail({ email });
      if (sendMail) {
        toast.success("Subscribed Successfully");
        setEmail("");
      } else {
        toast.error("Something Went Wrong While Adding Email");
      }
    }
  };

  return (
<div className="relative w-full h-screen overflow-hidden font-sans">
      {/* Background Icons */}
      <img src="/svg/bg.svg" className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" alt="bg" />

      {/* Decorative Elements */}
      <img src="/images/kid-left.png" className="absolute left-0 bottom-20 w-40 z-10" alt="kid left" />
      <img src="/images/kid-right.png" className="absolute right-0 bottom-20 w-40 z-10" alt="kid right" />

      <img src="/images/girl-top-left.png" className="absolute top-6 left-10 w-24 z-10" alt="top left girl" />
      <img src="/images/pencil-top.png" className="absolute top-0 right-10 w-16 z-10" alt="top pencil" />
      <img src="/images/book-top-right.png" className="absolute top-6 right-4 w-28 z-10" alt="book kids" />
      <img src="/images/hat.png" className="absolute top-2 left-[45%] w-14 z-10" alt="hat" />

      <img src="/images/paint-hand.png" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 z-10" alt="hand prints" />
      <img src="/images/brush.png" className="absolute bottom-10 left-1/3 w-6 z-10" alt="brush" />
      <img src="/images/calculator.png" className="absolute bottom-8 right-6 w-10 z-10" alt="calculator" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-[#ff5733] mb-4">GET READY !</h1>
        <p className="text-lg md:text-2xl text-gray-800 font-medium mb-6 tracking-wide">
          SOMETHING AWESOME IS COMING SOON
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-lg w-80">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>
          <button className="relative bg-gradient-to-b from-sky-400 to-sky-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:scale-105 transition-transform">
            SUBSCRIBE
            <span className="absolute -right-6 -bottom-3">
              <img src="/images/arrow-cursor.png" alt="arrow" className="w-10" />
            </span>
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
