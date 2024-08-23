import React, {useContext} from 'react';
import {Alert} from "antd";
import {Context} from "../../../index";

const AlertSaved = ({isSaved, onClose}) => {
    const {locale} = useContext(Context);

    return (
        <div>
            {isSaved &&
                <div>
                    <Alert message={locale.locale.Saved} type="success" showIcon closable onClose={onClose}/>
                    <p/>
                </div>
            }
        </div>

    );
};

export default AlertSaved;