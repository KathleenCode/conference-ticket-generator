import React from 'react';
import { FaArrowRight } from "react-icons/fa";

export default function Header() {
  return (
    <div className='headere'>
        <div className='labele'>tics</div>
        <div>
            <span><strong>Events</strong></span>
            <span>My Tickets</span>
            <span>About Projects</span>
        </div>
        <button className='buttone'>My Tickets <FaArrowRight />
        </button>
    </div>
  )
}
