import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import { Form, Modal, Row, Switch} from "antd";
import UserPasswordSettings from "../UserSettings/UserPasswordSettings";
import UserCommonSettings from "../UserSettings/UserCommonSettings";
import UserMailSettings from "../UserSettings/UserMailSettings";

const UserModal = ({modalType, open, onCancel, userId}) => {
    const [changePasswordFlag, setChangePasswordFlag] = useState(false);
    const {locale} = useContext(Context);


    const onChange = (checked) => {
        setChangePasswordFlag(checked);
    };

    return (
        <Modal
            title={modalType === locale.locale.User.Edit}
            open={open}
            destroyOnClose={true}
            footer={null}
            onCancel={onCancel}
        >
            <Row>
                <Form.Item label={locale.locale.User.ChangePassword}>
                    <Switch onChange={onChange}  checked={changePasswordFlag}/>
                </Form.Item>
            </Row>
            {!changePasswordFlag &&
                <div>
                    <UserCommonSettings
                        userId={userId}
                        onCancel={onCancel}
                    />
                    <UserMailSettings
                        userId={userId}
                        onCancel={onCancel}
                    />
                </div>
            }
            {changePasswordFlag &&
                <UserPasswordSettings
                    userId={userId}
                    onCancel={onCancel}
                />
            }
        </Modal>
    );
};

export default observer(UserModal);