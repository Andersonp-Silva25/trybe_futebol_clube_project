const validateEmail = (email: string): boolean => {
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  return emailRegex.test(email);
};

export default validateEmail;
