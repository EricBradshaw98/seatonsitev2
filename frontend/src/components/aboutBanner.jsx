import React from 'react';
import '../styles/aboutBanner.scss'; // Import CSS for styling

const aboutBanner = () => {
  return (
    <div className="banner">
      <div className="blank"></div>
      <div className="content">
      <h1 className="banner-header"><div>History</div><div>of the</div><div>Club</div>  </h1>
      
      <p className="banner-paragraph">The club was formed in 1983 by 12 members who became the initial shareholders in the new corporation and who put the money into developing the first field at Green River adjacent to the Seaton Hiking Trail. When the 407 was built 10 years later we had to find a new location since the highway went right through the middle of the original runways. The new field located to the west of Claremont was leased on a long term basis in 1995 and continues to be the location used today. The club has grown from this small beginning to about 90 members today and many of the flyers have been with the club throughout this timeframe.</p>
      </div>
    </div>
  );
};

export default aboutBanner;
