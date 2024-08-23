import React from 'react';
import {Alert} from "antd";

const ErrorBox = ({error}) => {
    return (
        <div>
            {error &&
                <div>
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                    />
                    <p></p>
                </div>
            }
        </div>
    );
};

export default ErrorBox;