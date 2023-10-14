const isNull = (value) => {
    if (value !== "")
        return true
}
const isEmail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}
const isPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[1-9])(?=.*[_-+=!@#$%^&*])[A-Za-z\d_-+=!@#$%^&*]{8,}$/
    return passwordRegex.test(password);
  };

export { isNull, isPassword, isEmail }