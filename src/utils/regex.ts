export const regex = {
  // Source: https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
  password: {
    hasACorrectLength: /^.{8,32}$/,
    containAtLeastOneUpperCaseLetterAndOneLowerCaseLetter:
      /(?=.*[a-z])(?=.*[A-Z]).+/,
    containAtLeastOneNumberOrSpecialCharacter:
      /(?=.*[\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+/,
  },
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};
