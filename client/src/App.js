import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { EmailContext, UserContext } from '.';
import { BrowserRouter } from "react-router-dom"
import AppRouter from './components/AppRouter/AppRouter';
import LoadingPage from './pages/LoadingPage';

function App() {
  const { userStore } = useContext(UserContext);
  const { emailStore } = useContext(EmailContext);

  useEffect(() => {
    async function checkAuth() {
      await userStore.checkAuth()
    }
    if (localStorage.getItem('token')) {
      checkAuth()
    }
  }, [userStore, userStore.colorTheme])


  return (
    <BrowserRouter>
      {userStore.isLoading
        ? <LoadingPage />
        : <AppRouter />
      }
    </BrowserRouter>
  )
}

export default observer(App);
