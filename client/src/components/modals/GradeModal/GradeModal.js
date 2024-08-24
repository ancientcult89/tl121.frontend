import { Form, Input, Modal} from 'antd';
import {ADD_MODAL} from "../../../utils/consts";
import {observer} from "mobx-react-lite";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import useGradeModal from "./useGradeModal";

const GradeModal = observer((props) => {
    const {
        modalType,
        open,
        onCancel,
        gradeId,
    } = props;

    const {
        locale,
        setGradeName,
        handleOk,
        gradeName,
        gradeNameError,
        confirmLoading,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
    } = useGradeModal(props);

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

export default GradeModal;