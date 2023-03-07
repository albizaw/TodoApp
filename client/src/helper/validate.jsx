import { toast } from 'react-hot-toast';

// validation
function emailValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

export function registerValidation(values) {
  const errors = emailVerify({}, values);
  passwordVerify(errors, values);
  return errors;
}

// varifying
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error('Email is required!');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Wrong email!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error('Invalid email adress!');
  }

  return error;
}

const specialChars = /[`!@#$%^&*()_+\-=\[\]{},';"\\|,.<>\/?~]/;

function passwordVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error('Password is required!');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Invalid password');
  } else if (values.password.length < 4) {
    error.password = toast.error('Password is too short!');
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error('Password must have special chars.');
  }

  return error;
}
