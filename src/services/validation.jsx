const isNull = (value) => {
    if (value !== "")
        return true
}
const isMinLength = (index, value) => {
    if (value.length > index) {
        return true
    }
}
const isEmail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

export { isNull, isMinLength, isEmail }