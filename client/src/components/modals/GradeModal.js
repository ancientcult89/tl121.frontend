import React, {useState} from 'react';
import { Button, Modal } from 'antd';

const [open, setOpen] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);
const [modalText, setModalText] = useState('Content of the modal');
const showModal = () => {
    setOpen(true);
};
const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
    }, 2000);
};
const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
};

const GradeModal = () => {
    return (
        <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>{modalText}</p>
        </Modal>
    );
};

export default GradeModal;