import React, {useContext} from 'react';
import {Alert} from "antd";
import {Context} from "../../../index";

const AlertSuccess = ({isSuccess, onClose, message}) => {
    const {locale} = useContext(Context);

    return (
        <div>
            {isSuccess &&
                <div>
                    <Alert message={message ?? locale.locale.Saved} type="success" showIcon closable onClose={onClose}/>
                    <p/>
                </div>
            }
        </div>

    );
};

export default AlertSuccess;