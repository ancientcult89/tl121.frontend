import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {login, recoveryPassword, registration} from "../../http/userApi";
import {Context} from "../../index";
import useHttpErrorHandling from "../../hooks/useHttpErrorHandling";
import {emailValidator} from "../../utils/emailValidator";
import {localeConverter} from "../../utils/localeConverter";
import {ONE_TWO_ONE_DEADLINES_ROUTE} from "../../utils/consts";


const useAuth = (isLogin) => {
    const {user, locale} = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoginState, setIsLoginState] = useState(isLogin);
    const [loginError, setLoginError] = useState(null);
    const [recoveryError, setRecoveryError] = useState(null);
    const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);

    const {
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = useHttpErrorHandling();

    useEffect(() => {
        user.setIsAuth(false);
    }, [])

    function completeTaskHandler(email) {
        recoveryPassword(email)
            .then(() => { setLoginError(null)})
            .catch(e => {
                setRecoveryError(e.response.data);
                setLoginError(null);
            });
    }

    const click = async () => {
        let emailIsValid = emailValidator(email);
        if(password === '' || !emailIsValid)
        {
            return;
        }
        if(isLoginState) {
            login(email, password)
                .then(loginResponse => {
                    console.log(loginResponse)
                    user.setUser(loginResponse.user);
                    let usersLocale = localeConverter.idToString(loginResponse.user.locale);
                    locale.setLocale(usersLocale);
                    user.setRole(loginResponse.role?.roleName);
                    localStorage.setItem('role', loginResponse.role?.roleName);
                    user.setIsAuth(true);
                    navigate(ONE_TWO_ONE_DEADLINES_ROUTE);
                })
                .catch(e => {
                    executeErrorHandlers(e);
                    if(httpBadRequestResponseError){
                        setLoginError(httpBadRequestResponseError);
                        clearBackendErrors();
                    }
                });
        }
        else {
            let emailIsValid = emailValidator(email);
            if(userName === '' || !emailIsValid || password === '' || confirmPassword === '' || password !== confirmPassword)
            {
                return;
            }

            const formData = {
                email: email,
                userName: userName,
                password: password,
                confirmPassword: confirmPassword,
            }
            registration(formData)
                .then(() => {
                    clearBackendErrors();
                    setIsLoginState(!isLoginState);
                    setIsSuccessRegistration(true);
                })
                .catch(e => executeErrorHandlers(e))
        }
    }

    return {
        locale,
        loginError,
        completeTaskHandler,
        email,
        password,
        user,
        navigate,
        executeErrorHandlers,
        confirmPassword,
        setIsLoginState,
        isLoginState,
        setIsSuccessRegistration,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        isSuccessRegistration,
        userName,
        recoveryError,
        setConfirmPassword,
        clearBackendErrors,
        setUserName,
        setEmail,
        setPassword,
        click,
    };
};

export default useAuth;