export default class FormatUtil {
  static formatPassword = [
    {
      required: true,
      message: 'Please input your password!',
    },
    {
      min: 8,
      message: 'Password must be at least 8 characters!',
    },
    {
      pattern: /.*[a-z]/,
      message: 'Password must contain at least 1 lowercase alphabetical character',
    },
    {
      pattern: /.*[A-Z]/,
      message: 'Password must contain at least 1 uppercase alphabetical character',
    },
    {
      pattern: /.*[0-9]/,
      message: 'Password must contain at least 1 numeric character',
    },
    {
      pattern: /.*[!@#$%^&*]/,
      message: 'Password must contain at least 1 special character',
    },
  ];
}
