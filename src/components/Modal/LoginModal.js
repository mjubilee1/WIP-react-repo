import React from 'react';
import LoginForm from '../Form/LoginForm';
import RegisterForm from '../Form/RegisterForm';

export default function LoginModal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [showModalView, setModalView] = React.useState(false);

  return (
    <>
      <a onClick={() => setShowModal(true)} name="nav-login" className="px-3 py-2 flex cursor-pointer items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
        <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
        <span className="ml-2">Login/Register</span>
      </a>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="relative p-6 flex-auto">
                  <div>
                    <div className="flex items-start justify-center p-4">
                      <h3 className="text-2xl font-semibold">Sleepless Gamer&apos;s</h3>
                      <button
                        className="p-1 bg-transparent border-0 text-black opacity-5 absolute right-0 text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                      </button>
                    </div>
                  </div>
                  {/* body */}
                  <div>
                    <ul className="flex border-b">
                      <li className="-mb-px mr-1">
                        <button
                          onClick={() => setModalView(false)}
                          className="bg-white inline-block py-2 px-4 text-blue-700 font-semibold text-right hover:bg-blue-700 hover:text-white"
                        >
                          LOGIN
                        </button>
                      </li>
                      <li className="mr-1">
                        <button onClick={() => setModalView(true)} className="bg-white inline-block py-2 px-4 text-blue-500 font-semibold hover:bg-blue-700 hover:text-white">
                          SIGN UP
                        </button>
                      </li>
                    </ul>
                  </div>
                  {showModalView ? <RegisterForm {...props} /> : <LoginForm {...props} />}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
}
