import React, {useState} from 'react';
import {AiOutlineMenu, AiOutlineLogout} from 'react-icons/ai';

import { useStateValue } from '../context/StateContext.js';
import Wrapper from '../assets/wrappers/Navbar.js';
import Logo from './Logo.js';

const Navbar = () => {
  const {toggleSidebar, user, logoutUser} = useStateValue();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn">
          <AiOutlineMenu 
            onClick={toggleSidebar}
          />
        </button>
        <div>
          <Logo />
        </div>
        <div className="user-info">
          <div className="user-name">{user?.name}</div>
          <div className="user-action">
            <img src={user.image} alt="userimage" 
              onClick={() => setShowLogout(!showLogout)}
            />
            {showLogout && <div className="drop-down"
              onClick={logoutUser}
            >
              <AiOutlineLogout />
              Logout
            </div>}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar