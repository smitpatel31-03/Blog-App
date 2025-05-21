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
        setEmail("/");
      } else {
        toast.error("Something Went Wrong While Adding Email");
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">

  {/* Background texture */}
  <img
    src="/svg/bg.svg"
    alt="background"
    className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
  />

  {/* Floating SVG elements from your original design */}
  {/* Top Left */}
  <img src="/svg/cap.svg" className="absolute top-4 left-4 w-12 sm:w-16" />
  <img src="/svg/hands.svg" className="absolute top-20 left-6 w-14 sm:w-20" />

  {/* Top Right */}
  <img src="/svg/kids3.svg" className="absolute top-4 right-10 w-14 sm:w-20" />
  <img src="/svg/pencil1.svg" className="absolute top-28 right-6 w-10 sm:w-14" />

  {/* Bottom Left */}
  <img src="/svg/notebook.svg" className="absolute bottom-24 left-6 w-12 sm:w-16" />
  <img src="/svg/kids1.svg" className="absolute bottom-6 left-4 w-14 sm:w-20" />

  {/* Bottom Right */}
  <img src="/svg/kids2.svg" className="absolute bottom-4 right-4 w-14 sm:w-20" />
  <img src="/svg/pencil3.svg" className="absolute bottom-20 right-16 w-10 sm:w-14" />
  <img src="/svg/comaps.svg" className="absolute bottom-40 right-4 w-10 sm:w-14" />

  {/* Center Content */}
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-600">
      GET READY!
    </h1>
    <p className="mt-2 text-sm sm:text-base text-gray-600">
      Something amazing is coming soon
    </p>

    <div className="mt-6 w-full max-w-md">
      <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2">
        <i className="fas fa-envelope text-gray-400 mr-2" />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full focus:outline-none text-sm sm:text-base"
        />
      </div>
      <button className="mt-4 bg-sky-400 hover:bg-sky-500 text-white font-semibold text-sm sm:text-base px-6 py-2 rounded-full" onClick={subscribe}>
        SUBSCRIBE
      </button>
    </div>
  </div>
  
<ToastContainer/>
</div>


  );
}

export default App;