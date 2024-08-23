import React, {useContext, useEffect, useState} from 'react';
import { Form, Input, Modal} from 'antd';
import {ADD_MODAL, EDIT_MODAL} from "../../../utils/consts";
import {createGrade, getGrade, updateGrade} from "../../../http/gradeApi";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import withHttpErrorHandling from "../../../utils/withHttpErrorHandling";
import useGradeModal from "./useGradeModal";

const GradeModal = observer((props) => {
    const {
        modalType,
        open,
        onCancel,
        gradeId,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
    } = props;

    const {
        locale,
        setGradeName,
        getGradeData,
        handleOk,
        gradeName,
        gradeNameError,
        confirmLoading,
    } = useGradeModal(props);

    useEffect(() => {
        getGradeData();
    }, [gradeId]);

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Grade.Add : locale.locale.Grade.Edit}
            open={open}
            destroyOnClose={true}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <Form
                labelCol={{ span: 5 }}
            >
                <BackEndErrorBox
                    httpBadRequestResponseError={httpBadRequestResponseError}
                    httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
                />
                <ErrorBox error={gradeNameError}/>
                <Form.Item
                    label={locale.locale.Grade.GradeName}
                >
                    <Input
                        value={gradeName}
                        onChange={e => {setGradeName(e.target.value)}}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default withHttpErrorHandling(GradeModal);