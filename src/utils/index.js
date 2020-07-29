export const validateEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
}

export const validateName = (name, min) => {
  if(name.length < min) {
    return false;
  }

  const names = name.split(' ');

  if(names.length < 2) {
    return false;
  }

  return true;
}

export const strBetween = (str, min, max) => {
  return str.length >= min && str.length <= max;
}
