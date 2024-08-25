import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import { Form, Modal, Row, Switch} from "antd";
import UserPasswordSettings from "../../UserSettings/UserPasswordSettings/UserPasswordSettings";
import UserCommonSettings from "../../UserSettings/UserCommonSettings/UserCommonSettings";
import UserMailSettings from "../../UserSettings/UserMailSettings/UserMailSettings";
import useUserModal from "./useUserModal";

const UserModal = ({modalType, open, onCancel, userId}) => {
    const {
        locale,
        onChange,
        changePasswordFlag,
    } = useUserModal();

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