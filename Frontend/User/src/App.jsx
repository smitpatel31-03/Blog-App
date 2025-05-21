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
    <div className="relative w-full h-screen bg-white overflow-hidden">

  {/* Background SVGs */}
  <img src="/svg/bg.svg" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-10 z-0" />

  {/* Decorative SVGs */}
  <img src="/svg/cap.svg" alt="cap" className="absolute top-4 left-4 w-16 sm:w-20 md:w-24 lg:w-28" />
  <img src="/svg/brush.svg" alt="brush" className="absolute top-8 right-8 w-14 sm:w-20 md:w-24 lg:w-28" />
  <img src="/svg/fyingNotebook.svg" alt="flying notebook" className="absolute bottom-10 right-10 w-16 sm:w-24 lg:w-32" />
  <img src="/svg/notebook.svg" alt="notebook" className="absolute bottom-20 left-10 w-14 sm:w-20 md:w-24 lg:w-28" />
  <img src="/svg/kids1.svg" alt="kids1" className="absolute bottom-4 left-4 w-14 sm:w-20 md:w-24 lg:w-28" />
  <img src="/svg/kids2.svg" alt="kids2" className="absolute bottom-4 right-4 w-14 sm:w-20 md:w-24 lg:w-28" />
  <img src="/svg/kids3.svg" alt="kids3" className="absolute top-4 right-20 w-14 sm:w-20 md:w-24 lg:w-28" />
  <img src="/svg/hands.svg" alt="hands" className="absolute top-24 left-6 w-20 sm:w-28 md:w-36 lg:w-44" />
  <img src="/svg/pencil1.svg" alt="pencil1" className="absolute top-40 right-6 w-12 sm:w-16 md:w-20 lg:w-24" />
  <img src="/svg/pencil2.svg" alt="pencil2" className="absolute bottom-40 left-6 w-12 sm:w-16 md:w-20 lg:w-24" />
  <img src="/svg/pencil3.svg" alt="pencil3" className="absolute bottom-10 right-24 w-12 sm:w-16 md:w-20 lg:w-24" />
  <img src="/svg/comaps.svg" alt="compass" className="absolute top-1/2 left-0 w-10 sm:w-14 md:w-16 lg:w-20" />

  {/* Center Heading */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-4">
      GET READY!
    </h1>
    <p className="text-sm sm:text-base text-gray-700 mb-6">
      Something amazing is coming soon
    </p>

    {/* Email input */}
    <div className="flex items-center w-full max-w-md rounded-full bg-white px-4 py-2 shadow-md">
      <span className="mr-2 text-gray-500">
        <i className="fas fa-envelope"></i>
      </span>
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-grow focus:outline-none text-sm sm:text-base"
      />
    </div>

    <button className="mt-4 bg-sky-400 hover:bg-sky-500 text-white font-semibold text-sm sm:text-base px-6 py-2 rounded-full">
      SUBSCRIBE
    </button>
  </div>
  
      <ToastContainer />

</div>


  );
}

export default App;
