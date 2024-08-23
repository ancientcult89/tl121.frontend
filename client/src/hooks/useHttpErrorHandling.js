import { useState } from 'react';
import {unauthRedirect} from "../utils/unauthRedirect";
import {badHttpRequestHandler} from "../utils/badHttpRequestHandler";
import {notFoundHttpRequestHandler} from "../utils/notFoundHttpRequestHandler";

const useHttpErrorHandling = () => {
    const [httpBadRequestResponseError, setHttpBadRequestResponseError] = useState(null);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

    const clearBackendErrors = () => {
        setHttpBadRequestResponseError(null);
        setHttpNotFoundRequestResponseError(null);
    };

    const executeErrorHandlers = (e) => {
        unauthRedirect(e);
        setHttpBadRequestResponseError(badHttpRequestHandler(e));
        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
    };

    return {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        clearBackendErrors,
        executeErrorHandlers,
        setHttpBadRequestResponseError,
        setHttpNotFoundRequestResponseError,
    };
};

export default useHttpErrorHandling;