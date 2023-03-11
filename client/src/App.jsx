import React, { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// import routes
import Homepage from './routes/Homepage';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import Todo from './routes/Todo';
import PageNotFound from './routes/PageNotFound';

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/todos', element: <Todo /> },
  { path: '/*', element: <PageNotFound /> },
]);

// credentials context
export const CredentialsContext = createContext();

function App() {
  const credentialsState = useState({ email: 'ada' });

  return (
    <CredentialsContext.Provider value={credentialsState}>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </CredentialsContext.Provider>
  );
}

export default App;
