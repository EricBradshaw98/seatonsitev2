import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import '../styles/aboutUsPage.scss';

const AboutUsPage = () => {
  return (

    <div className="about-us-page">
      <div className="about-us-empty"></div>
      <section className="section">
        <h2>WHAT WE FLY</h2>
        <p>You'll see beautiful scale airplanes; nitro, gas, EDF jets and electric helicopters—even drones and micro aircraft. Come out to fly or just come out to watch.</p>
        <p>Want to see more? <Link to="/galleries">Click here</Link> for a look at our photo gallery.</p>
      </section>

      <section className="section">
        <h2>OUR FLYING FIELD</h2>
        <p>The Seaton Valley flying field is located near Claremont, ON, just 30 minutes north of Pickering. Visitors are always welcome to check out the club. Maps and directions to the Seaton Valley model aircraft flying field are in contact us.</p>
        <p>(Seasonal visitation restrictions - Spring and Summer only)</p>
      </section>

      <section className="section">
        <h2>WHY YOU SHOULD JOIN US</h2>
        <p>Seaton Valley RCMC has one of the best RC model aircraft flying fields in the area. You'll have plenty of flying time when you're at the field. We are heli and drone-friendly. Our members are regular guys, always willing to help. Interested?</p>
      </section>
    </div>
  );
};

export default AboutUsPage;