import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Services from './services/services.js';

function App() {
  const [email, setEmail] = useState("");

  const subscribe = async (e) => {
  e.preventDefault();

  if (email.trim() === "") {
    toast.error("Please enter an email address");
    return;
  }

  const response = await Services.addEmail({ email });

  if (response.status === 200) {
    toast.success("Subscribed Successfully");
    setEmail("");
  } else if (response.status === 409) {
    toast.info(response.data.message); // "Email already subscribed"
  } else {
    toast.error("Something went wrong");
  }
};


  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Background */}
      <img src="/svg/bg.svg" alt="background" className="absolute inset-0 w-full h-full object-cover" />

      {/* Floating SVG elements */}
      <img src="/svg/cap.svg" className="absolute top-4 left-10 w-20 sm:w-75 sm:top-4 sm:left-80" />
      <img src="/svg/pencil1.svg" className="absolute top-4 left-35 w-25 sm:w-70 sm:top-10 sm:left-175" />
      <img src="/svg/notebook.svg" className="absolute top-2 left-60 w-30 sm:w-80 sm:top-2 sm:left-250" />
      <img src="/svg/pencil2.svg" className="absolute top-5 left-85 w-25 sm:w-70 sm:top-10 sm:left-310" />
      <img src="/svg/kids1.svg" className="absolute top-30 w-30 sm:w-75 sm:top-30 sm:left-5" />
      <img src="/svg/pencil3.svg" className="absolute top-100 left-8 w-25 sm:w-40 sm:left-85 sm:top-110" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <img src="/svg/heading.svg" className="flex justify-center w-50 sm:w-150" />

        {/* First input box */}
        <div className="mt-6 w-80 sm:max-w-md">
          <div className="flex mt-[-60px] items-center justify-center px-4 py-2 sm:mt-[-100px]">
            <i className="fas fa-envelope text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm sm:text-base sm:w-full"
            />
          </div>
          <button
          type='submit'
          className="mt-5 bg-sky-400 hover:bg-sky-500 text-white font-semibold text-sm sm:text-base px-6 py-2 rounded-full" 
          onClick={subscribe} 
          >
            SUBSCRIBE
          </button>
        </div>

        
      </div>

      {/* Bottom SVGs */}
      <img src="/svg/fyingNotebook.svg" className="absolute top-100 right-1 w-30 sm:w-60 sm:top-70" />
      <img src="/svg/kids2.svg" className="absolute bottom-30 left-[-60px] w-50 sm:w-130 sm:left-[-150px]" />
      <img src="/svg/hands.svg" className="absolute bottom-40 left-25 w-25 sm:w-50 sm:left-70" />
      <img src="/svg/brush.svg" className="absolute bottom-30 left-45 w-25 sm:w-50 sm:left-150" />
      <img src="/svg/comaps.svg" className="absolute bottom-80 z-1 left-50 w-25 sm:w-50 sm:left-210" />
      <img src="/svg/kids3.svg" className="absolute bottom-30 right-[-50px] w-50 sm:w-130 sm:right-[-110px]" />

      <ToastContainer />
    </div>
  );
}

export default App;
