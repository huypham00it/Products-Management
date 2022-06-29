import React from 'react';
import {Link} from 'react-router-dom';

import Wrapper from '../assets/wrappers/Error.js'
import img from '../assets/images/not-found.svg'

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>OOPS! Page Not Found</h3>
        <Link to="/">Back to Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error