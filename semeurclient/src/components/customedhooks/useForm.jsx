import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
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
