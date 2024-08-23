import React from 'react';
import {Alert} from "antd";

const BackEndErrorBox = ({httpNotFoundRequestResponseError, httpBadRequestResponseError}) => {
    return (
        <div>
            {httpNotFoundRequestResponseError &&
                <div>
                    <Alert
                        message={httpNotFoundRequestResponseError}
                        type="error"
                        showIcon
                    />
                    <p></p>
                </div>
            }
            {httpBadRequestResponseError &&
                <div>
                    <Alert
                        message={httpBadRequestResponseError}
                        type="error"
                        showIcon
                    />
                    <p></p>
                </div>
            }
        </div>
    );
};

export default BackEndErrorBox;