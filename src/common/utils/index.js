export function validateEmail (pValue) {
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const resultVal = pValue.match(validRegex) ? true : false;
    return resultVal;
}