import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { EmailContext, UserContext } from "../..";
import EmailPage from "../../pages/EmailPage";
import GuestPage from "../../pages/GuestPage";
import UserPage from "../../pages/UserPage";

function AppRouter() {
    const { emailStore } = useContext(EmailContext)
    emailStore.setLoading(true)
    const { userStore } = useContext(UserContext);
    {
        if (userStore.isAuth) {
            return <Routes>
                <Route key={'user'} path={'/'} element={<UserPage />} exact />
                <Route key={'email'} path={'/:id'} element={<EmailPage />} exact />
            </Routes>
        }
        return <Routes>
            <Route key={'guest'} path={'/'} element={<GuestPage />} exact />

        </Routes>

    }
}
export default observer(AppRouter);