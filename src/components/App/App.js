import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ScrollContext, ScrollContainer } from 'react-router-scroll-4';
import { Helmet } from 'react-helmet';
import { inject } from 'mobx-react';
import PrimarySidebar from '../SidebarMenu/PrimarySidebar';
import PrimaryNavbar from '../Navbar/PrimaryNavbar';
import Router from '../Router/Router';
import '../../styles/index.css';

@inject('commonStore', 'authStore')
class App extends Component {
  render() {
    const { pageTitle } = this.props.commonStore;
    return (
      <BrowserRouter>
        <ScrollContext>
          <div>
            <Helmet>
              <title>{pageTitle}</title>
            </Helmet>
            <div>
              <PrimaryNavbar
                authStore={this.props.authStore}
              />
              <div className="flex h-screen">
                <PrimarySidebar />
                <ScrollContainer scrollKey="contentMain">
                  <div className="w-full">
                    <Router />
                  </div>
                </ScrollContainer>
              </div>
            </div>
          </div>
        </ScrollContext>
      </BrowserRouter>
    );
  }
}

export default App;
