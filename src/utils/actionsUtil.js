const siteUrl = `${process.env.REACT_APP_SITE_URL}`;

export default class ActionUtil {
  /**
   * Handle the logic to redirect a user if they are logged in.
   */
  static handleLoggedInRedirect() {
    window.location.href = `${siteUrl}/about`;
  }

  /**
   * Handle the logic to redirect a user if they are not logged in.
   */
  static handleLoggedOutRedirect() {
    window.location.href = `${siteUrl}`;
  }

  /**
   * Handle the logic to redirect a user if they verify their account.
   */
  static handleVerifyRedirect() {
    window.location.href = `${siteUrl}/about`;
  }
}
