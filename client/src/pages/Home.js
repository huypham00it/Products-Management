import React from 'react';
import { Link } from 'react-router-dom';

import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Home.js'
import {Logo} from '../components'

const Home = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className="container page">
            <div className="info">
                <p className="title">Business Management</p>
                <h1>Kababs</h1>
                <p>Restaurant style Yogurt Mint Sauce is delicious dip which is quick
                and easy to ... This is a standard Indian mint chutney served with
                poppadums along with mint and lemon.</p>
                <Link to="/register" className="btn btn-hero">Login/Register</Link>
            </div>
            <img src={main} alt="product manage" />
        </div>
    </Wrapper>
  )
}


export default Home