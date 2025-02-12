import React, { useState } from "react";
import HomePage from "./components/HomePage.js";
import FormPage from"./components/FormPage.js";

const App = () => {
  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState(localStorage.getItem("ticketType") || "");
  const [ticketQuantity, setTicketQuantity] = useState(localStorage.getItem("ticketQuantity") || "1");

  return (
    <div>
      {step === 1 ? (
        <HomePage
          setStep={setStep}
          ticketType={ticketType}
          setTicketType={setTicketType}
          ticketQuantity={ticketQuantity}
          setTicketQuantity={setTicketQuantity}
        />
      ) : (
        <FormPage setStep={setStep} 
          // ticketType={ticketType}
          // ticketQuantity={ticketQuantity}
        />
      )}
    </div>
  );
};

export default App;
