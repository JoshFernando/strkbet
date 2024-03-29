import React, { useEffect, useState, useContext } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { header } from 'react-bootstrap';
import { Link } from '@reach/router';
import useOnclickOutside from "react-cool-onclickoutside";
import { AccountContext } from '../../state/contexts/AccountContext';

import {
  useContract,
  useStarknet,
  InjectedConnector
} from '@starknet-react/core'

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);


const Header = function () {
  const { account, connect } = useStarknet()
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const { setGlobalAccount } = useContext(AccountContext);

  useEffect(() => {
    if (account) {
      setGlobalAccount(account)
    }
  }, [account])

  const disconnect = () => {
    setGlobalAccount('')
    console.log("disconnect")
    //   argentX.setConnected(false)
    //   argentX.setGlobalAccount('')
  }


  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const [showmenu, btn_icon] = useState(false);
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");

      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      } if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  return (
    <header id="myHeader" className='navbar white'>
      <div className='container'>
        <div className='row w-100-nav'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                
              </NavLink>
            </div>
          </div>

          <div className='search'>
            <input id="quick_search" className="xs-hide" name="quick_search" placeholder="Search for items here..." type="text" />
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu &&
                <div className='menu'>



                  <div className='navbar-item'>
                    <NavLink to="/home" onClick={() => btn_icon(!showmenu)}>
                      HOME
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/profile" onClick={() => btn_icon(!showmenu)}>
                      PROFILE
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/holdings" onClick={() => btn_icon(!showmenu)}>
                      DAO HOLDINGS
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/mint" onClick={() => btn_icon(!showmenu)}>
                      MINT
                    </NavLink>
                  </div>

                </div>
              }
            </Breakpoint>

            <Breakpoint xl>
              <div className='menu'>

                <div className='navbar-item'>
                  <NavLink to="/activity">
                    HOME
                    <span className='lines'></span>
                  </NavLink>
                </div>

                <div className='navbar-item'>
                  <NavLink to="/profile">
                    DEVELOPER
                    <span className='lines'></span>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/holdings">
                    DOCS
                    <span className='lines'></span>
                  </NavLink>
                </div>

                <div className='navbar-item'>
                  <NavLink to="/mint">
                    MINT
                    <span className='lines'></span>
                  </NavLink>
                </div>

              </div>
            </Breakpoint>
          </BreakpointProvider>
          <div className='mainside'>
            {account && <p style={{ color: "navy" }}>Account: {`${account.slice(0,5)}...${account.slice(-4)}`}</p>}
            {account ? null : <button className="btn-main" onClick={() => connect(new InjectedConnector())}style={{ backgroundColor: 'orange', color: 'navy' }}>CONNECT WALLET</button>}
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line black"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

      </div>
    </header>
  );
}
export default Header;