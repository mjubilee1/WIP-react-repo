import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject("authStore")
class VerifyModal extends Component {
  state = {
    showModal: true,
  };

  componentDidMount() {
    this.props.authStore.validateVerificationCode()
  }

  hideModal = () => {
    const newState = {
      showModal: false,
    }
    this.setState(newState)
  }

  render() {
    return (
      <>
      {this.state.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="relative p-6 flex-auto">
                  <div>
                    <div className="flex items-start justify-center">
                      <h3 className="text-2xl font-semibold">Sleepless Gamer&apos;s</h3>
                        <button
                          className="p-1 bg-transparent border-0 text-black opacity-5 absolute right-0 text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => this.hideModal()}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                        </button>
                      </div>
                    </div>
                  </div>
                {/*  <div>
                    <p>Verify code</p>
                    <input placeholder="Verify Code" />
                    <button onClick={()=> validateVerificationCode()}>
                    Confirm
                    </button>
                </div> */}
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='verify-email'>
                        Congratulations Your Account has been verified.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
       ) : null}
      </>
    )
  }
}

export default VerifyModal;