import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Services from './services/services.js';

function App() {
  const [email, setEmail] = useState("");

  const subscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    const sendMail = await Services.addEmail({ email });

    if (sendMail) {
      toast.success("Subscribed Successfully");
      setEmail("");
    } else {
      toast.error("Something went wrong while adding email");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden">

      {/* Background image */}
      <img
        src="/svg/bg.svg"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0 pointer-events-none"
      />

      {/* Top left */}
      <img src="/svg/cap.svg" className="absolute top-4 left-4 w-8 sm:w-10" />
      <img src="/svg/hands.svg" className="absolute top-16 left-6 w-10 sm:w-12" />

      {/* Top right */}
      <img src="/svg/kids3.svg" className="absolute top-4 right-4 w-8 sm:w-10" />
      <img src="/svg/pencil1.svg" className="absolute top-20 right-6 w-8 sm:w-10" />

      {/* Bottom left */}
      <img src="/svg/notebook.svg" className="absolute bottom-24 left-6 w-8 sm:w-10" />
      <img src="/svg/kids1.svg" className="absolute bottom-6 left-4 w-10 sm:w-12" />

      {/* Bottom right */}
      <img src="/svg/kids2.svg" className="absolute bottom-6 right-4 w-10 sm:w-12" />
      <img src="/svg/pencil3.svg" className="absolute bottom-24 right-12 w-8 sm:w-10" />
      <img src="/svg/comaps.svg" className="absolute bottom-40 right-6 w-8 sm:w-10" />

      {/* Center Content */}
      <div className="relative z-10 text-center w-full max-w-md px-4">
        <h1 className="text-4xl font-extrabold text-red-600">GET READY!</h1>
        <p className="mt-2 text-gray-600 text-base sm:text-lg">
          Something amazing is coming soon
        </p>

        <div className="mt-6">
          <div className="flex items-center bg-white shadow-lg rounded-full px-4 py-2">
            <i className="fas fa-envelope text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-sm"
            />
          </div>
          <button
            onClick={subscribe}
            className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 text-sm rounded-full"
          >
            SUBSCRIBE
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
