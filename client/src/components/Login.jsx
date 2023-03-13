import React, { useContext, useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { Toaster } from 'react-hot-toast';
import { useFormik, useFormikContext } from 'formik';
import { registerValidation } from '../helper/validate';

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [, setCredentails] = useContext(CredentialsContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleErrors = async (response) => {
    if (!response.ok) {
      const { message } = await response.json();

      throw Error(message);
    }
    return response.json();
  };

  const login = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentails({
          email,
          password,
        });
        localStorage.setItem('token-info', JSON.stringify({ email, password }));
        navigate('/todos');
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] fixed flex flex-col items-center justify-center z-[-10]">
      <Toaster position="bottom-center" reverseOrder="false"></Toaster>
      <div className="w-3/5 lg:w-[650px] h-fit  md:border-4 md:border-input rounded-lg md:p-20">
        <h1>{error && error}</h1>
        <h1 className="text-2xl font-bold">Sign In</h1>

        {/* form */}
        <form
          onSubmit={login}
          className="flex flex-col justify-between font-medium"
        >
          <div className="my-3">
            <label>Email</label>
            <div className="my-2 relative rounded-2xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder:text-1xl w-full p-2 bg-primary border-2 border-input rounded-2xl"
                type="email"
              />
              <AiOutlineMail className="absolute right-2 top-3" />
            </div>
          </div>
          <div className="my-4 font-medium">
            <label>Password</label>
            <div className="my-2 relative rounded-2xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-1xl w-full p-2 bg-primary border-2 border-input rounded-2xl"
                type="password"
              />
              <AiFillLock className="absolute right-2 top-3" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-center mx-auto md:w-1/2 text-left my-2 bg-button text-btnText rounded-2xl p-3 shadow-lg"
          >
            Sign In
          </button>
        </form>

        <p className="mx-auto text-center my-2">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
