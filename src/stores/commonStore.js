import { observable, action } from 'mobx';

/**
 * Store for authentication logic
 */

class CommonStore {
  @observable
  pageTitle = null;

  @observable
  sideNavDisplay = true; // Determine whether to display side nav

  // Logic to show or hide side nav
  @action
  showSideNav() {
    return this.sideNavDisplay;
  }

  @action
  setPageTitle(pageTitle) {
    this.pageTitle = pageTitle || 'Sleepless Gamer&apos';
  }
}

export default new CommonStore();
