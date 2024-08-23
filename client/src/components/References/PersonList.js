import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Alert, Button, Input, Popconfirm, Space, Spin, Table} from "antd";
import {ADD_MODAL, EDIT_MODAL} from "../../utils/consts";
import Column from "antd/es/table/Column";
import {archivePerson, deletePerson, getPersonList, sendGreetingMessage} from "../../http/personApi";
import PersonModal from "../modals/PersonModal";
import {observer} from "mobx-react-lite";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";
import LocaleSelector from "../LocaleSelector";
import {badHttpRequestHandler} from "../../utils/badHttpRequestHandler";
import BackEndErrorBox from "../Form/ErrorBox/BackEndErrorBox";

const PersonList = observer(() => {
    const {person, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [httpBadRequestResponseError, setHttpBadRequestResponseError] = useState(null);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        getPersons()
        setIsLoading(false)
    }, [needUpdate])

    function getPersons() {
        getPersonList()
            .then(data => {
                person.setPersons(data)
                setItems(person.persons)
            })
            .catch(e => {
                executeErrorHandlers(e);
            });
    }

    function handleFilterChange(e) {
        setFilterText(e.target.value);
    }

    const executeErrorHandlers = (e) => {
        unauthRedirect(e);
        setHttpBadRequestResponseError(badHttpRequestHandler(e));
        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
    }

    const filteredItems = items.filter(item => item.lastName.toLowerCase().includes(filterText.toLowerCase()));

    function deletePersonHandler(personId) {
        setIsLoading(true);
        deletePerson(personId)
            .then(() => getPersons())
            .catch(e => {
                executeErrorHandlers(e);
            })
            .finally(() => setIsLoading(false))
    }

    function archivePersonHandler(personId) {
        setIsLoading(true);
        archivePerson(personId)
            .then(() => getPersons())
            .catch(e => {
                executeErrorHandlers(e);
            })
            .finally(() => setIsLoading(false));
    }

    function sendingGreetingMessageHandler(personId) {
        setIsLoading(true);
        sendGreetingMessage(personId)
            .catch(e => {
                executeErrorHandlers(e);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                {/*данный блок дикий костыль, переделать на серверную фильтрацию*/}
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
                <div style={{marginLeft: 10}}>Фильтр по фамилии:</div>
                <Input
                    type="text"
                    placeholder="Filter by Last Name"
                    value={filterText}
                    style={{width: 300, marginLeft: 10}}
                    onChange={handleFilterChange}
                />
            </div>
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={filteredItems} rowKey={(record) => record.personId } style={{marginTop: 20}}>
                    <Column title={locale.locale.Person.LastName} dataIndex="lastName" key="lastName"/>
                    <Column title={locale.locale.Person.FirstName} dataIndex="firstName" key="firstName"/>
                    <Column title={locale.locale.Person.SurName} dataIndex="surName" key="surName"/>
                    <Column title={locale.locale.Person.Email} dataIndex="email" key="email"/>
                    <Column
                        title={locale.locale.Person.Grade}
                        dataIndex="grade"
                        key="grade"
                        render={(grade) => (
                            <a>{grade.gradeName}</a>
                        )}
                    />
                    <Column title={"isArchive"} dataIndex="isArchive" key="isArchive" render={(isArchive) => (
                        <a>{isArchive ? "Yes" : "No"}</a>
                    )}/>
                    <Column
                        title={locale.locale.Action}
                        key="action"
                        render={(record) => (
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
                                    title={locale.locale.Person.ArchiveTitle}
                                    description={locale.locale.Person.ArchiveConfirmation}
                                    onConfirm={() => archivePersonHandler(record.personId)}
                                    okText={locale.locale.OK}
                                    cancelText={locale.locale.NO}
                                >
                                    <a>
                                        {locale.locale.Archive}
                                    </a>
                                </Popconfirm>
                                <Popconfirm
                                    title={locale.locale.Person.DeleteTitle}
                                    description={locale.locale.Person.DeleteConfirmation}
                                    onConfirm={() => deletePersonHandler(record.personId)}
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
                    <Column title={locale.locale.Person.GreetingMail} key="testMeil" render={(record) => (
                        <a>
                            <Button
                                type={"primary"}
                                style={{backgroundColor: "green"}}
                                onClick={() => {sendingGreetingMessageHandler(record.personId)}}
                            >
                                {locale.locale.Person.SendGreetingMail}
                            </Button>
                        </a>
                    )}/>
                </Table>
            </Spin>
            {modalVisible &&
                <PersonModal
                    modalType={modalType}
                    open={modalVisible}
                    onCancel={() => {
                        setNeedUpdate(!needUpdate);
                        setIsLoading(false);
                        setModalVisible(false);
                    }}
                    personId={modalVisible ? selectedPerson : null}
                />
            }
        </div>
    );
});

export default PersonList;