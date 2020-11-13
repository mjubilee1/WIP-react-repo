import React from 'react';
import LoginModal from '../Modal/LoginModal';

export default function PrimaryNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-300 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white" href="/">
              Sleepless Gamers
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars" />
            </button>
          </div>
          <div className={`lg:flex flex-grow`}>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item" id="nav-home">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/" name="nav-home">
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
                  <span className="ml-2">Home</span>
                </a>
              </li>
              <li className="nav-item" id="nav-profile">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/profile" name="nav-profile">
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
                  <span className="ml-2">Profile</span>
                </a>
              </li>
              {!props.authStore.userLoggedIn() ?
                <li className="nav-item" id="nav-login">
                  <LoginModal {...props} />
                </li> : null}
              {props.authStore.userLoggedIn() ?
                <li className="nav-item" id="nav-logout">
                  <a
                    className="px-3 py-2 cursor-pointer flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    onClick={() => props.authStore.logout()}
                    name="nav-logout"
                  >
                    <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
                    <span className="ml-2">Logout</span>
                  </a>
              </li> : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
