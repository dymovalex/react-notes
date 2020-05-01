import React from 'react';

import './footer.styles.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <span>Made by Alex Dymov</span>
      <span>
        <a href='https://twitter.com/a8savu'><i className="fab fa-twitter"></i></a>
      </span>
      <span>
        <a href='https://github.com/dymovalex'><i className="fab fa-github"></i></a>
      </span>
    </div>
  );
};

export default Footer;