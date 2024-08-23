import React from 'react';
import useHttpErrorHandling from '../hooks/useHttpErrorHandling';

const withHttpErrorHandling = (WrappedComponent) => {
    return function EnhancedComponent(props) {
        const {
            httpBadRequestResponseError,
            httpNotFoundRequestResponseError,
            clearBackendErrors,
            executeErrorHandlers,
            setHttpBadRequestResponseError,
            setHttpNotFoundRequestResponseError,
        } = useHttpErrorHandling();

        return (
            <WrappedComponent
                {...props}
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
                clearBackendErrors={clearBackendErrors}
                executeErrorHandlers={executeErrorHandlers}
                setHttpBadRequestResponseError={setHttpBadRequestResponseError}
                setHttpNotFoundRequestResponseError={setHttpNotFoundRequestResponseError}
            />
        );
    };
};

export default withHttpErrorHandling;
