import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import "../styles/contact.scss";
import PhoneIcon from '../components/icon/Phoneicon';
import EmailIcon from '../components/icon/Emailicon';
import FacebookIcon from "../components/icon/Facebookicon";
import TwitterIcon from "../components/icon/Twittericon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faFacebook, faTwitter } from '@fortawesome/free-solid-svg-icons';

const EmailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //EmailJS 
    const serviceId = 'service_dmqchgw';
    const templateId = 'template_6t5wma1';
    const publicKey = 'VbbEmsg2jvp21wFyq';
    // Create a new instance of EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Stocks App',
      message: message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
      
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
       
      });
  };
  return (
    <div>
      <div className="emptydiv"> </div>
      <div className ="content-sectioncontact">
    <div className="contact-section2">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p className="description">Have a question or feedback? We'd love to hear from you! Please feel free to contact us at the email below:</p>
      </div>
      <div className="contact-us-container">
      <div className="board">
  <h2>SEATON VALLEY RC CLUB BOARD MEMBERS</h2>
  <ul>
    
    <li><strong>Secretary Treasurer</strong> - Rick Glencross</li>
    <li><strong>Membership</strong> - Doug Martin</li>
    <li><strong>Website</strong> - Peter Bradshaw</li>
    <li><strong>Special Events</strong> - Howard Goodman, Tom Mills, Aaron Yorke</li>
    <li><strong>President</strong> - Eric Miller</li>
  </ul>
</div>

        <div className="contact-info">
          <div className="contact-directly">
            <h3>Reach Out Directly</h3>
            <ul>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <a href="mailto:membership@seatonvalleyrc.club">membership@seatonvalleyrc.club</a>
              </li>
              
            </ul>
          </div>

          <div className="contact-directly">
            <h3>Connect on Social Media</h3>
            <ul className="social-media-links">
              <li>
                <a href="https://twitter.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon="fa-brands fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://facebook.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default EmailForm;