const DIGITS = 6;
const HOURS = 48;

const makeCode = () => {
  var code = "";
  for (var i = 0; i < DIGITS; i++) {
    code = code + String(Math.floor(Math.random() * 9));
  }
  return code;
};

const makeExpiry = () => Date.now() + 1000 * 60 * 60 * HOURS;

export const getCodeAndExpiry = () => ({
  code: makeCode(),
  expiry: makeExpiry()
});
