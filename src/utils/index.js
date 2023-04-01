import { validationRules } from "../constants/validationRules";

/**
 * @function
 * @param {string} form // the name of the form
 * @param {object} errors // usually this is the errors object
 * @param {object} values // usually this is the values object
 * @returns {object} // returns an object with the error state and the errors
 */


function validateForm(form, errors, values) {
  const _errors = {};
  const _values = Object.keys(errors);

  _values.forEach((key) => {
      // each field in the form
      const field = validationRules[form].fields[key];

      if (field?.regexPattern) {
          if (!values[key].match(field?.regexPattern)) {
              _errors[key] = field?.regexMessage;
          }
      }

      if (!!field?.pattern && field?.pattern !== values[key]) {
          _errors[key] = field?.message
      }

      if (field?.pattern === 'booleanFalse') {
          if (values[key] !== true) {
              _errors[key] = field?.regexMessage;
          }
      }
  });

  return {
      error: Object.keys(_errors).length > 0 && Object.values(_errors).some(x => (x !== undefined)),
      errors: _errors
  };
}

export {
  validateForm
}