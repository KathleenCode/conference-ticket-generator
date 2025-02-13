import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import qrCode from "../assets/barcode.jpg";
import { IoPinOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";

const Ticket = ({ fullName, email, avatar, onReset, ticketType, ticketQuantity, specialRequest }) => {
    const handleDownload = () => {
        const ticketElement = document.getElementById("ticket");
    
        html2canvas(ticketElement).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
          pdf.save("Conference_Ticket.pdf");
        });
      };

    return (
      <div className="ready">
          <div className="top">
              <h1>Ready</h1>
              <span>Step 3/3</span>
          </div>
          <hr className="ticket-dividere" />

          <h2>Your  Ticket is Booked!</h2>
          <p>Check your email for a copy  you can <strong>download</strong></p>
        <div className="containere">

          <div className="ticket" id="ticket">
          <div className="event-details">
                  <h3>Techember Fest ''25</h3>
                  <h4><IoPinOutline color="red"/>
                   04 Rumens Road,Ikoyi,Lagos</h4>
                  <p>
                  <FaRegCalendarAlt color="white"/>
                   March 15,2025 | 7:00pm
                  </p>
              </div>
            <div className="tickette">
                <img src={avatar} alt="Avatar" className="avatar" />
                  <div className="ticke">   
                    <div><span>Name:</span><span>{fullName}</span></div>
                    <div><span>Email: </span><span> {email}</span></div>
                    <div><span>Ticket Type: </span><span>{ticketType}</span></div>
                    <div><span>Number: </span><span>{ticketQuantity}</span></div>
                  </div>
                  <p><strong>Special request: </strong>{specialRequest}</p>
                </div>
          </div>
          <div className="code">
                <img src={qrCode} alt="Avatar" className="qrcode" />
                <p className="see"><span>1</span><span>234567</span><span>891026</span></p>
          </div>
        </div>
          <div className="ticket-buttons">
          <button className="book-again" 
          // onClick={onReset}
          >Book Another Ticket</button>
          <button className="download-ticket" 
          onClick={handleDownload}
          >Download Ticket</button>
        </div>
      </div>
    );
  };
  
  export default Ticket;
  