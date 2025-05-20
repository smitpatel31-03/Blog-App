import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Services from './services/services.js'

function App() {
  const [email, setEmail] = useState("");

  const subscribe = async() => {
    if (email.trim() === "") {
      toast.error("Please enter an email address"); 
    } else {
      const sendMail = await Services.addEmail({email})

      if(sendMail){

        toast.success("Subscribed Successfully");
        setEmail("");
      }
      else{
        toast.error("Something Went Wrong While Add Email"); 
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/svg/bg.svg')] bg-cover bg-center flex flex-col items-center justify-center px-4">
      
      {/* Decorations */}
      <img src="/svg/cap.svg" className="absolute top-4 left-40 w-40 sm:w-10px" alt="cap" />
      <img src="/svg/pencil1.svg" className="absolute top-10 right-[450px] w-35 sm:w-10px" alt="pencil" />
      <img src="/svg/notebook.svg" className="absolute top-1 right-[100px] w-60 sm:w-10px" alt="notebook" />
      <img src="/svg/kids1.svg" className="absolute top-[130px] left-0 w-70 sm:w-10px" alt="kids1" />
      <img src="/svg/pencil2.svg" className="absolute top-50 right-[30px] w-50 sm:w-10px" alt="pencil2" />
      <img src="/svg/pencil3.svg" className="absolute top-80 left-[30px] w-60 sm:w-10px" alt="pencil3" />
      <img src="/svg/fyingNotebook.svg" className="absolute top-90 right-[30px] w-20 scale-x-[-1] sm:w-10px" alt="fyingNotebook" />
      <img src="/svg/kids2.svg" className="absolute bottom-2 left-4 w-90 sm:w-1" alt="kid girl" />
      <img src="/svg/kids3.svg" className="absolute bottom-4 right-4 w-90 sm:w-1" alt="kids2" />
      <img src="/svg/comaps.svg" className="absolute bottom-40 left-200 w-40  sm:w-1" alt="kids2" />
      <img src="/svg/brush.svg" className="absolute bottom-10 left-210 w-40 sm:w-1" alt="kids2" />
      <img src="/svg/hands.svg" className="absolute bottom-15 left-130 w-40 sm:w-1" alt="kids2" />

      {/* Main Content */}
      <div className="mt-[-150px]">
      <div>
        <img src="/svg/heading.svg" alt="" srcset="" className="h-100 mb-[-150px]"/>
      </div>

      {/* Email Input */}
      <div className="flex items-center  shadow-md px-4 py-2 w-[90%] max-w-md mb-4">
        <img src="/svg/mail.svg" alt="mail" className="w-5 h-5 mr-2" />
        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          className="w-full outline-none border-none text-sm"
        />
      </div>
      </div>

      {/* Button */}
      <button onClick={subscribe} className="bg-[#4dbdcf] text-white font-bold px-8 py-2 rounded-full hover:bg-[#3caebf] transition duration-200">
        SUBSCRIBE
      </button>

      <ToastContainer />
    </div>
  );
}

export default App