import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {createRole, getRole, updateRole} from "../../../http/roleApi";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";
import {Form, Input, Modal} from "antd";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import withHttpErrorHandling from "../../../utils/withHttpErrorHandling";
import useRoleModal from "./useRoleModal";

const RoleModal = (props) => {
    const {
        modalType,
        open,
        onCancel,
        roleId,
    } = props;

    const {
        locale,
        handleOk,
        confirmLoading,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        roleName,
        setRoleName,
        roleNameError,
    } = useRoleModal(props);

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Role.Add : locale.locale.Role.Edit}
            open={open}
            destroyOnClose={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
            <ErrorBox error={roleNameError}/>
            <Form
                labelCol={{ span: 8 }}
            >
                <Form.Item label={locale.locale.Role.GradeName}>
                    <Input
                        value={roleName}
                        onChange={e => {setRoleName(e.target.value)}}
                    ></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default observer(RoleModal);