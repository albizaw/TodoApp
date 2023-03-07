import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToogle from './ThemeToogle';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full mx-auto flex items-center justify-between h-20  max-w-screen-lg bg-primary px-4">
      <div className="md:text-2xl text-3xl">
        <Link to="/">
          <h1>TodoApp</h1>
        </Link>
      </div>

      <div className="hidden md:block text-2xl">
        <ThemeToogle />
      </div>

      <div className="hidden md:block">
        <Link className="p-4 hover:text-accent text-2xl" to="/signin">
          SignIn
        </Link>

        <Link
          className=" text-2xl bg-button text-btnText px-4 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
          to="/signup"
        >
          Signup
        </Link>
      </div>

      {/* menu for md and sm devices */}
      <div onClick={handleNav} className="md:hidden block cursor-pointer z-10">
        {!nav ? <AiOutlineMenu size={30} /> : <AiOutlineClose size={30} />}
      </div>

      {/* Mobile menu */}
      <div
        className={
          nav
            ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[calc(100vh-80px)] bg-primary duration-500 ease-in'
            : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between duration-500 ease-in'
        }
      >
        <ul className="w-full flex flex-col  p-4 text-2xl">
          <li className="border-b py-6">
            <Link onClick={handleNav} to="/">
              Home
            </Link>
          </li>

          <li className="border-b py-6">
            <ThemeToogle />
          </li>
        </ul>

        <div className="flex flex-col w-full p-4">
          <Link to="/signin">
            <button
              className={`w-full text-2xl my-2 p-3 ${
                theme === 'dark' ? 'bg-emerald-50' : ''
              }  text-btnText bg-button border-2 rounded-2xl shadow-xl`}
            >
              Sign in
            </button>
          </Link>

          <Link to="/signup">
            <button className="w-full text-2xl my-2 p-3 bg-button text-btnText border-2 rounded-2xl shadow-xl">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
