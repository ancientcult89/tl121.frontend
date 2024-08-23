import React from 'react';
import useHttpErrorHandling from '../hooks/useHttpErrorHandling';

const withHttpErrorHandling = (WrappedComponent) => {
    return function EnhancedComponent(props) {
        const {
            httpBadRequestResponseError,
            httpNotFoundRequestResponseError,
            clearBackendErrors,
            executeErrorHandlers
        } = useHttpErrorHandling();

        return (
            <WrappedComponent
                {...props}
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
                clearBackendErrors={clearBackendErrors}
                executeErrorHandlers={executeErrorHandlers}
            />
        );
    };
};

export default withHttpErrorHandling;
