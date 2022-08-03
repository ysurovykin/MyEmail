import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import EmailStore from './store/EmailStore';

const userStore = new UserStore();
const emailStore = new EmailStore();

export const UserContext = createContext({ userStore })
export const EmailContext = createContext({ emailStore })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <UserContext.Provider value={{ userStore }} >
    <EmailContext.Provider value={{ emailStore }}>
      <App />
    </EmailContext.Provider>
  </UserContext.Provider>
);
