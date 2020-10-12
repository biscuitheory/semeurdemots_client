import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const useForm = (callback, validate) => {
  const { state: authState } = useContext(AuthContext);
  const initialState = {
    username: '' ? '' : authState.user.username,
    firstname: '' ? '' : authState.user.firstname,
    lastname: '' ? '' : authState.user.lastname,
    email: '' ? '' : authState.user.email,
    password: '',
    // newpassword: '',
    // newpasswordbis: '',
    admin: false,
    isSubmitting: false,
    errorMessage: null,
  };

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      isSubmitting: true,
      errorMessage: null,
    });
    setErrors(validate(values));
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && values.isSubmitting) {
      callback();
    } else {
      setValues({
        ...values,
        isSubmitting: false,
      })
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
  };
};

export default useForm;
