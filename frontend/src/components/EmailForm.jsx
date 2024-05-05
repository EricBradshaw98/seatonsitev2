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
        <p className="description">Have a question or feedback? We'd love to hear from you! Please feel free to contact us using the form below:</p>
      </div>
      <div className="contact-us-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="input-field"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
        <div className="contact-info">
          <div className="contact-directly">
            <h3>Reach Out Directly</h3>
            <ul>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <a href="mailto:contact@stockmarketmagnet.com">contact@stockmarketmagnet.com</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} /> +1 (123) 456-7890
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