import React, { useState } from 'react';
import '../styles/Modal.scss'; // Import your CSS file for styling

function Modal() {
  const [showModal, setShowModal] = useState(true); // Initialize state to true

  return (
    <div className="modal-backdrop" style={{ display: showModal ? 'flex' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
        <p>Our Club is currently at its membership capacity, and we are unfortunately not taking new applications at this time.</p>
        <p>We would, however, like to welcome you into the Club when a spot opens up, so please send an email to <a href="mailto:membership@seatonvalleyrc.club">membership@seatonvalleyrc.club</a> with your name and contact information and we will put you on our waitlist for new member</p>
      </div>
    </div>
  );
}

export default Modal;