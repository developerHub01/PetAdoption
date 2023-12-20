const usePasswordVarification = (text) => {
  const upperCaseCheck = (str) => {
    for (let i in str) {
      if (str[i] >= "A" && str[i] <= "Z") {
        return true;
      }
    }
    return false;
  };

  const containAnySpecialChar = (str) => {
    for (let i in str) {
      const asciiCode = str.charCodeAt(i);
      if (
        (asciiCode < 48 || asciiCode > 57) &&
        (asciiCode < 65 || asciiCode > 90) &&
        (asciiCode < 97 || asciiCode > 122)
      )
        return true;
    }
    return false;
  };

  if (
    text.length < 6 ||
    !upperCaseCheck(text) ||
    !containAnySpecialChar(text)
  ) {
    return false;
  }
  return true;
};

export default usePasswordVarification;
