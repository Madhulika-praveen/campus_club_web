const isValidEmail = (email) => {
  return (
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
};

const isValidPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 4
  );
};

const isRequired = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim().length > 0
  );
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isRequired,
};