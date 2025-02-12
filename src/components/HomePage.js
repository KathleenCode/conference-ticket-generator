import React, {useEffect} from "react";
import { IoPinOutline } from "react-icons/io5";

const HomePage = ({ setStep, ticketType, setTicketType, ticketQuantity, setTicketQuantity }) => {
  const ticketOptions = [
    {type: "REGULAR ACCESS", label: "Free",much: "20 left" },
    {type: "VIP ACCESS", label: "$50",much: "20 left"},
    {type: "VVIP ACCESS", label:"$150",much: "20 left"}, 
];

  useEffect(() => {
    const storedType = localStorage.getItem("ticketType");
    const storedQuantity = localStorage.getItem("ticketQuantity");
    if (storedType) setTicketType(storedType);
    if (storedQuantity) setTicketQuantity(storedQuantity);
  }, [setTicketType, setTicketQuantity]);

  const handleSelectTicket = (type) => {
    setTicketType(type);
    localStorage.setItem("ticketType", type);
  };

  const handleQuantityChange = (event) => {
    setTicketQuantity(event.target.value);
    localStorage.setItem("ticketQuantity", event.target.value);
  };

  return (
    <div className="container">
        <div className="top">
            <h1>Ticket Selection</h1>
            <span>Step 1/3</span>
        </div>
        <hr className="ticket-divider" />
    <div className="home">
        <h3>Techember Fest ''25</h3>
        <h4>Join us for an unforgettable experience at <br></br> [Event Name] Secure your spot now</h4>
        <p>
         <IoPinOutline color="red"/>
         [Event Location] || March 15,2025 | 7:00pm
        </p>
    </div>

      <hr className="ticket-divider1" />
      <h1 className="tope">Select Ticket Type:</h1>

      {/* Ticket Type Selection */}
      <div className="ticbox">
        {ticketOptions.map(({type, label, much}) => (
           <div key={type} className="bubox">
            <button className="group">
                <p className="ela">{label}</p>
                <p className="buo1"
                    onClick={() => handleSelectTicket(type)}
                    >
                    {type} 
                </p>
                <p className="buo2">{much}</p>
            </button>

           {/* Small pricing button */}
           </div>
        ))}
      </div>

      {/* Ticket Quantity Dropdown */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="quantity">Number of Tickets: </label>
        <select id="quantity" value={ticketQuantity} onChange={handleQuantityChange}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Buttons */}
      <div className="homebuos">
        <button className="next" onClick={() => setStep(2)} disabled={!ticketType}>
          Next
        </button>
        <button className="cancel" onClick={() => console.log("Cancel clicked")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HomePage;
