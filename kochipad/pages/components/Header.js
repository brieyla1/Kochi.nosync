import React, { useContext, useState } from 'react';
import { connectWallet } from '../WebThree/WebThree';
import { SidebarContext } from '/pages/context/SidebarContext';
import logo from '../assets/img/kochiken-logo.svg';
import MetamaskLogo from '../assets/img/metamask.svg';
import { MoonIcon, SunIcon, MenuIcon, OutlinePersonIcon, OutlineCogIcon, OutlineLogoutIcon } from '../icons';
import { Avatar, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui';

function Header() {
  console.log(WindmillContext, SidebarContext);
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  function handleConnectWallet() {
    connectWallet();
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <div>
          <a className="text-lg font-bold text-gray-800 dark:text-gray-200" href="/">
            <img src={logo} alt="KochiKen Logo" width="100" className="block lg:hidden" />
          </a>
        </div>
        <div>
          <ul className="flex items-center flex-shrink-0 space-x-3">
            {/* <!-- Connect Wallet Button --> */}
            <li>
              <button
                onClick={handleConnectWallet}
                className="bg-transparent dark:hover:text-white dark:text-gray-400 font-semibold md:py-2 md:px-4 md:border dark:border-grey-500 dark:hover:border-white rounded mt-1"
              >
                <span className="inline-block">
                  <img src={MetamaskLogo} alt="Metamask" width="20" className="md:inline-block hidden mr-2" />
                  <img src={MetamaskLogo} alt="Metamask" width="25" className="md:hidden block" />
                </span>
                <span className="md:inline-block hidden">Connect Wallet</span>
              </button>
            </li>
            {/* <!-- Theme toggler --> */}
            <li className="flex">
              <button
                className="rounded-md focus:outline-none focus:shadow-outline-purple"
                onClick={toggleMode}
                aria-label="Toggle color mode"
              >
                {mode === 'dark' ? (
                  <SunIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <MoonIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </li>
            {/* <!-- Profile menu --> */}
            <li className="relative">
              <button
                className="rounded-full focus:shadow-outline-purple focus:outline-none"
                onClick={handleProfileClick}
                aria-label="Account"
                aria-haspopup="true"
              >
                <Avatar className="align-middle" src="https://i.imgur.com/YRAJKSd.png" alt="" aria-hidden="true" />
              </button>
              <Dropdown align="right" isOpen={isProfileMenuOpen} onClose={() => setIsProfileMenuOpen(false)}>
                <DropdownItem tag="a" href="#">
                  <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Profile</span>
                </DropdownItem>
                <DropdownItem tag="a" href="#">
                  <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem onClick={() => alert('Log out!')}>
                  <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Log out</span>
                </DropdownItem>
              </Dropdown>
            </li>
            {/* <!-- Mobile hamburger --> */}
            <li>
              <button
                className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                onClick={toggleSidebar}
                aria-label="Menu"
              >
                <MenuIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
