import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Popconfirm, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../utils/consts";
import Column from "antd/es/table/Column";
import {deletePerson, getPersonList} from "../http/personApi";
import PersonModal from "./modals/PersonModal";
import {observer} from "mobx-react-lite";

const PersonList = observer(() => {
    const {person, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log('rerender')
        getPersonList()
            .then(data => {
                person.setPersons(data)
                setItems(person.persons)
            })
            .catch()
            .finally(() => setIsLoading(false));
    }, [needUpdate])

    return (
        <div>
            <Button
                type={"primary"}
                onClick={() => {
                    setModalType(ADD_MODAL);
                    setModalVisible(true);
                    setSelectedPerson(null);
                    setIsLoading(true);
                }}
            >
                {locale.locale.Person.Add}
            </Button>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={items} style={{marginTop: 20}}>
                    <Column title={locale.locale.Person.LastName} dataIndex="lastName" key="lastName"/>
                    <Column title={locale.locale.Person.FirstName} dataIndex="firstName" key="firstName"/>
                    <Column title={locale.locale.Person.SurName} dataIndex="surName" key="surName"/>
                    <Column
                        title={locale.locale.Person.Grade}
                        dataIndex="grade"
                        key="grade"
                        render={(grade) => (
                            <a>{grade.gradeName}</a>
                        )}
                    />
                    <Column
                        title={locale.locale.Action}
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalType(EDIT_MODAL);
                                    setSelectedPerson(record.personId);
                                    setIsLoading(true);
                                    setModalVisible(true);
                                }}>
                                    {locale.locale.Edit}
                                </a>
                                <Popconfirm
                                    title={locale.locale.Person.DeleteTitle}
                                    description={locale.locale.Person.DeleteConfirmation}
                                    onConfirm={() => {
                                        deletePerson(record.personId).then(() => {
                                            setIsLoading(true);
                                            getPersonList()
                                                .then(data => {person.setPersons(data);})
                                                .catch()
                                                .finally(() => {
                                                    setNeedUpdate(!needUpdate);
                                                    setIsLoading(false);
                                                });
                                        })
                                    }}
                                    okText={locale.locale.OK}
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
            </Spin>
            <PersonModal
                modalType={modalType}
                open={modalVisible}
                onCancel={() => {
                    setNeedUpdate(!needUpdate);
                    setIsLoading(false);
                    setModalVisible(false);
                }}
                personId={selectedPerson}
            />
        </div>

    );
});

export default PersonList;