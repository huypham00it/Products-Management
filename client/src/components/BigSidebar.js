import React from 'react';

import Wrapper from '../assets/wrappers/BigSidebar.js'
import NavLinks from './NavLinks';
import Logo from "./Logo";
import { useStateValue } from "../context/StateContext";

const BigSidebar = () => {
  const { showSidebar} = useStateValue();
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}>
        <header>
          <Logo />
        </header>
        <div className="content">
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar