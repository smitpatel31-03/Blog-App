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

  {/* Cap SVG */}
  <img
    src="/svg/cap.svg"
    alt="cap"
    className="absolute top-4 left-4 w-16 sm:w-20 md:w-24 lg:w-28"
/>

  {/* Girl SVG */}
  <img
    src="/svg/girl.svg"
    alt="girl"
    className="absolute top-20 left-8 w-28 sm:w-36 md:w-44 lg:w-52"
/>

  {/* Pencil SVG */}
  <img
    src="/svg/pencil.svg"
    alt="pencil"
    className="absolute bottom-12 left-6 w-14 sm:w-20 md:w-24 lg:w-28"
/>

  {/* Music Note SVG */}
  <img
    src="/svg/music.svg"
    alt="music"
    className="absolute top-20 right-4 w-16 sm:w-24 md:w-32 lg:w-36"
/>

  {/* Book SVG */}
  <img
    src="/svg/book.svg"
    alt="book"
    className="absolute top-4 right-4 w-10 sm:w-14 md:w-16 lg:w-20"
/>

  {/* Boy SVG */}
  <img
    src="/svg/boy.svg"
    alt="boy"
    className="absolute bottom-4 right-4 w-12 sm:w-16 md:w-20 lg:w-24"
/>

  {/* Bottom Girl SVG */}
  <img
    src="/svg/bottom-girl.svg"
    alt="bottom girl"
    className="absolute bottom-4 left-4 w-12 sm:w-16 md:w-20 lg:w-24"
/>

  {/* Background Grid or pattern (if any) */}
  <img
    src="/svg/grid.svg"
    alt="grid"
    className="absolute inset-0 w-full h-full object-cover opacity-10"
/>

  {/* Main Content (Centered) */}
  <div className="flex flex-col items-center justify-center h-full px-4 text-center">
    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 mb-4">
      GET READY!
    </h1>
    <p className="text-sm sm:text-base text-black mb-6">
      Something awesome is coming soon
    </p>

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

    <button className="mt-4 bg-sky-400 hover:bg-sky-500 text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-full">
      SUBSCRIBE
    </button>
  </div>

</div>

  );
}

export default App;
