import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import Logo from "./Logo";
import { useStateValue } from "../context/StateContext";
import Wrapper from "../assets/wrappers/SmallSidebar.js";
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useStateValue();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <AiOutlineClose />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
