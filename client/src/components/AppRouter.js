import React, {useContext, useEffect} from 'react';
import {GRADE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import GradeList from "./GradeList";
import Auth from "../pages/Auth";
import {Route, Routes} from "react-router-dom";
import {Context} from "../index";

const AppRouter = () => {
    const { user } = useContext(Context);
    useEffect(() => console.log('user is auth 2:' + user.isAuth), [user])

    return (
        <Routes>
            {user.isAuth && (
                <React.Fragment>
                    <Route
                        key={GRADE_ROUTE}
                        path={GRADE_ROUTE}
                        element={<GradeList />}
                        exact
                    />
                </React.Fragment>
            )}
            {
                <React.Fragment>
                    <Route
                        key={LOGIN_ROUTE}
                        path={LOGIN_ROUTE}
                        element={<Auth />}
                        exact
                    />
                    <Route
                        key={REGISTRATION_ROUTE}
                        path={REGISTRATION_ROUTE}
                        element={<Auth />}
                        exact
                    />
                </React.Fragment>
            }
            {/* автоматически редирект на главную страницу */}
            <Route path="*" element={<Auth />} />
        </Routes>
    );
};

export default AppRouter;