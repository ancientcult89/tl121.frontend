import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Popconfirm, Space, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../utils/consts";
import Column from "antd/es/table/Column";
import {deletePerson, getPersonList} from "../http/personApi";
import PersonModal from "./modals/PersonModal";

const PersonList = () => {
    const {person} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        getPersonList().then(data => {
            person.setPersons(data);
        });
    }, [person])


    return (
        <div>
            <Button
                type={"primary"}
                onClick={() => {
                    setModalType(ADD_MODAL);
                    setModalVisible(true);
                    setSelectedPerson(null);
                }}
            >
                Add Person
            </Button>
            <Table dataSource={person.persons} style={{marginTop: 20}}>
                <Column title="LastName" dataIndex="lastName" key="lastName"/>
                <Column title="FirstName" dataIndex="firstName" key="firstName"/>
                <Column title="SurName" dataIndex="surName" key="surName"/>
                <Column
                    title="Grade"
                    dataIndex="grade"
                    key="grade"
                    render={(grade) => (
                        <a>{grade.gradeName}</a>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => {
                                setModalType(EDIT_MODAL);
                                setModalVisible(true);
                                setSelectedPerson(record.gradeId);
                            }}>
                                Edit
                            </a>
                            <Popconfirm
                                title="Delete the Person"
                                description="Are you sure to delete this Person?"
                                onConfirm={() => {
                                    deletePerson(record.personId).then(() => {
                                        getPersonList().then(data => {
                                            person.setPersons(data);
                                        });
                                    })
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a>
                                    Delete</a>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
            <PersonModal
                modalType={modalType}
                open={modalVisible} onCancel={() => setModalVisible(false)}
                personId={selectedPerson}
            />
        </div>

    );
};

export default PersonList;