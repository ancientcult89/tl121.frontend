import React from 'react';
import {Alert} from "antd";

const ErrorBox = ({error, errorType, closable}) => {
    return (
        <div>
            {error &&
                <div>
                    <Alert
                        message={error}
                        type={errorType ?? "error"}
                        showIcon
                        closable={closable}
                    />
                    <p></p>
                </div>
            }
        </div>
    );
};

export default ErrorBox;