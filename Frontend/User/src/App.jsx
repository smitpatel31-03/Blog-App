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
    <div className="relative min-h-screen bg-[url('/svg/bg.svg')] bg-cover bg-center flex flex-col items-center justify-center px-4 py-12 sm:py-8">

      {/* Decorative Images (Responsive with vw units) */}
      <img src="/svg/cap.svg" alt="cap"
        className="absolute top-4 left-4"
        style={{ width: '20vw', minWidth: '24px', maxWidth: '48px' }} />

      <img src="/svg/kids1.svg" alt="boy with sun"
        className="absolute top-12 left-16"
        style={{ width: '8vw', minWidth: '32px', maxWidth: '60px' }} />

      <img src="/svg/notebook.svg" alt="ruler color"
        className="absolute top-2 right-4"
        style={{ width: '8vw', minWidth: '32px', maxWidth: '60px' }} />

      <img src="/svg/pencil2.svg" alt="glasses pencil"
        className="absolute top-28 left-6"
        style={{ width: '6vw', minWidth: '24px', maxWidth: '50px' }} />

      <img src="/svg/pencil1.svg" alt="pencil"
        className="absolute top-20 right-10"
        style={{ width: '5vw', minWidth: '20px', maxWidth: '40px' }} />

      <img src="/svg/fyingNotebook.svg" alt="kids in book"
        className="absolute top-36 right-4"
        style={{ width: '10vw', minWidth: '40px', maxWidth: '70px' }} />

      <img src="/svg/kids2.svg" alt="kid left"
        className="absolute bottom-4 left-4"
        style={{ width: '12vw', minWidth: '48px', maxWidth: '80px' }} />

      <img src="/svg/hands.svg" alt="paint hands"
        className="absolute bottom-4 left-32"
        style={{ width: '6vw', minWidth: '24px', maxWidth: '50px' }} />

      <img src="/svg/brush.svg" alt="basket"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        style={{ width: '6vw', minWidth: '24px', maxWidth: '50px' }} />

      <img src="/svg/kids3.svg" alt="girl with backpack"
        className="absolute bottom-4 right-4"
        style={{ width: '12vw', minWidth: '48px', maxWidth: '80px' }} />

      {/* Main Content */}
      <div className="w-full max-w-md text-center z-10">

        {/* Heading */}
        <img src="/svg/heading.svg" alt="Get Ready" className="mx-auto mb-4" style={{ width: '40vw', maxWidth: '200px', minWidth: '120px' }} />

        {/* Email Input */}
        <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 mb-4 w-full">
          <img src="/svg/mail.svg" alt="mail" className="w-4 h-4 mr-2" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none border-none text-sm sm:text-xs"
          />
        </div>

        {/* Subscribe Button */}
        <button
          onClick={subscribe}
          className="bg-[#4dbdcf] text-white font-bold px-8 py-2 text-sm rounded-full hover:bg-[#3caebf] transition duration-200 w-full sm:w-auto"
        >
          SUBSCRIBE
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
