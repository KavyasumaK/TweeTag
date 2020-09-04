const checkValidity = (value, rules) =>{
  let isValid = true;
  if (rules.required) {
    isValid = isValid && value.trim() !== '';
  }
  if (rules.minLength) {
    isValid = isValid && value.length >= rules.minLength;
  }
  if (rules.maxLength) {
    isValid = isValid && value.length <= rules.maxLength;
  }
  if(rules.isEmail){
    let reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    isValid = isValid && reg.test(String(value).toLowerCase());
  }
  if(rules.isDate){
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!value.match(regEx)) return false;  // Invalid format
    let d = new Date(value);
    let dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    isValid=isValid && d.toISOString().slice(0,10) === value;
  }
  return isValid;
}

export default checkValidity;