import { Form, Input, Modal, Spin} from "antd";
import {ADD_MODAL} from "../../../utils/consts";
import {observer} from "mobx-react-lite";
import GradeSelector from "../../ReferenceSelectors/GradeSelector/GradeSelector";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import ErrorBox from "../../Form/ErrorBox/ErrorBox";
import usePersonModal from "./usePersonModal";

const PersonModal = observer((props) => {
    const {
        modalType,
        open,
        onCancel,
        personId,
    } = props;

    const {
        locale,
        handleOk,
        personDataLoaded,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        nameError,
        firstName,
        setFirstName,
        surName,
        setSurName,
        lastName,
        setLastName,
        emailError,
        personEmail,
        setPersonEmail,
        gradeError,
        selectGradeTypeHandler,
        selectedGradeName,
        shortName,
        setShortName,
    } = usePersonModal(props);

    return (
        <Modal
            title={modalType === ADD_MODAL ? locale.locale.Person.Add : locale.locale.Person.Edit}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form
                labelCol={{ span: 5 }}
            >
                <Spin tip={locale.locale.Loading} spinning={!personDataLoaded}>
                    <BackEndErrorBox
                        httpBadRequestResponseError={httpBadRequestResponseError}
                        httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
                    />
                    <ErrorBox error={nameError}/>
                    <Form.Item label={locale.locale.Person.FirstName}>
                        <Input value={firstName} onChange={e => {setFirstName(e.target.value)

                        }}></Input>
                    </Form.Item>
                    <Form.Item label={locale.locale.Person.SurName}>
                        <Input value={surName} onChange={e => {setSurName(e.target.value)

                        }}></Input>
                    </Form.Item>
                    <Form.Item label={locale.locale.Person.LastName}>
                        <Input value={lastName} onChange={e => {setLastName(e.target.value)

                        }}></Input>
                    </Form.Item>
                    <Form.Item label={locale.locale.Person.ShortName}>
                        <Input value={shortName} onChange={e => {setShortName(e.target.value)

                        }}></Input>
                    </Form.Item>
                    <ErrorBox error={emailError}/>
                    <Form.Item
                        label={locale.locale.Person.Email}
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input value={personEmail} onChange={e => setPersonEmail(e.target.value)}/>
                    </Form.Item>
                </Spin>
                <ErrorBox error={gradeError}/>
                <Form.Item label={locale.locale.GradeSelector.Grade}>
                    <GradeSelector
                        onSelect={selectGradeTypeHandler}
                        selectedGradeName={selectedGradeName}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default PersonModal;