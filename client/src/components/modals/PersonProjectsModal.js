import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Form, Modal, Popconfirm, Space, Table} from "antd";
import GradeSelector from "../ReferenceSelectors/GradeSelector";
import {Context} from "../../index";

import Column from "antd/es/table/Column";

const PersonProjectsModal = ({open, onCancel, person}) => {
    const {grade, locale} = useContext(Context);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [selectedGradeName, setSelectedGradeName] = useState('');

    const selectGradeTypeHandler = (gradeId) => {
        grade.grades.map(item => {
            if(item.gradeId === gradeId)
            {
                setSelectedGradeName(item.gradeName);
                setSelectedGradeId(item.gradeId)
            }
        })
    }

    const handleOk = () => {
        console.log('OK')
        // let formData = {
        //     "firstName": firstName,
        //     "surName": surName,
        //     "lastName": lastName,
        //     "shortName": shortName,
        //     "email": personEmail,
        //     "gradeId": selectedGradeId,
        // }
        //
        // if(modalType === ADD_MODAL)
        // {
        //     createPerson(formData).then((newPerson) =>{
        //         person.setPersons([...person.persons, newPerson])
        //         setSelectedGradeId(null);
        //         setSelectedGradeName(null);
        //         setPersonEmail('');
        //         setFirstName(null);
        //         setShortName(null);
        //         setLastName(null)
        //         setSurName(null)
        //         onCancel();
        //     });
        // }
    };

    return (
        <Modal
            title={locale.locale.Grade.Add}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Table dataSource={grade.grades} rowKey={(record) => record.gradeId } style={{marginTop:20}}>
                <Column title={locale.locale.Grade.GradeName} dataIndex="gradeName" key="1" />
                <Column
                    title={locale.locale.Action}
                    key="2"
                    render={(record) => (
                        <Space size="middle">
                            <Popconfirm
                                title={locale.locale.Grade.DeleteTitle}
                                description={locale.locale.Grade.DeleteConfirmation}
                                onConfirm={() => {
                                    // setIsLoading(true);
                                    // deleteGrade(record.gradeId).then(() => {
                                    //     getGradeList().then(data => {
                                    //         grade.setGrades(data);
                                    //         setNeedUpdate(!needUpdate);
                                    //     })
                                    //         .finally(() => setIsLoading(false));
                                    // })
                                }}
                                okText={locale.locale.Ok}
                                cancelText={locale.locale.NO}
                            >
                                <a>
                                    {locale.locale.Delete}
                                </a>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
            <Form>
                <GradeSelector
                    onSelect={selectGradeTypeHandler}
                    selectedGradeName={selectedGradeName}
                />
            </Form>
        </Modal>
    );
};

export default observer(PersonProjectsModal);