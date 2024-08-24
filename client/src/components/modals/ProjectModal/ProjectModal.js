import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Form, Input, Modal} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";
import {Context} from "../../../index";
import {createProject, getProject, updateProject} from "../../../http/projectApi";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import useProjectModal from "./useProjectModal";

const ProjectModal = observer((props) => {
    const {
        modalType,
        open,
        onCancel,
        projectId,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        executeErrorHandlers,
        clearBackendErrors,
    } = props;

    const {
        locale,
        handleOk,
        confirmLoading,
        projectName,
        projectNameError,
        setProjectName,
    } = useProjectModal(props);

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Person.Add : locale.locale.Person.Edit}
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
            <ErrorBox error={projectNameError}/>
            <Form
                labelCol={{ span: 7 }}
            >
                <Form.Item label={locale.locale.Project.ProjectName}>
                    <Input
                        value={projectName}
                        onChange={e => {setProjectName(e.target.value)}}
                    ></Input>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default ProjectModal;