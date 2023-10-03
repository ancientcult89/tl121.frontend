import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {completeTask, deleteMeeting, getTaskList} from "../../http/meetingApi";
import {getPersonList} from "../../http/personApi";
import {Button, Dropdown, Popconfirm, Row, Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import PersonSelector from "../ReferenceSelectors/PersonSelector";
import {unauthRedirect} from "../../utils/unauthRedirect";

const TaskList = () => {
    const {locale, person} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPersonId, setSelectedPersonId] = useState(null);
    const [selectedPersonFullName, setSelectedPersonFullName] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTaskList(selectedPersonId)
            .then(data => {
                setTasks(data);
            })
            .then(() => {
                const items = [];
                getPersonList()
                    .then(persons => {
                        person.setPersons(persons)
                    })
                    .catch(e => {
                        unauthRedirect(e);
                    });
            })
            .catch(e => {
                unauthRedirect(e);
            });
        setIsLoading(false);
    }, []);

    const selectedPersonHandler = (personId) => {
        person.persons.map(item => {
            if(item.personId === personId)
            {
                setSelectedPersonFullName(item.lastName + ' ' + item.firstName + ' ' + item.surName);
                setSelectedPersonId(item.personId);
            }
            filteringTaskList(personId);
        })
    }

    const filteringTaskList = (personId) => {
        getTaskList(personId)
            .then(data => {
                setTasks(data);
            })
            .catch(e => unauthRedirect(e))
    }

    const clearFilteringTaskList = () => {
        getTaskList()
            .then(data => {
                setTasks(data);
            })
            .catch(e => unauthRedirect(e))
        setSelectedPersonFullName(null);
        setSelectedPersonId(null);
    }

    return (
        <div>
            <Row>
                <PersonSelector
                    onSelect={selectedPersonHandler}
                    selectedPersonName={selectedPersonFullName}
                    onClear={clearFilteringTaskList}
                    isClearable={true}
                />
            </Row>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={tasks} rowKey={(task) => task.meetingGoalId } style={{marginTop:20}}>
                    <Column
                        title={locale.locale.Task.Person}
                        dataIndex="personName"
                        key="1"
                    />
                    <Column
                        title={locale.locale.Task.Description}
                        dataIndex="meetingGoalDescription"
                        key="2"
                    />
                    <Column
                        title={locale.locale.Task.MeetingDate}
                        render={(record) => (
                            <a>{new Date(record.factDate).toLocaleDateString()}</a>
                        )}
                        key="3"
                    />
                    <Column
                        title={locale.locale.Action}
                        key="4"
                        render={(record) => (
                            <Space size="middle">
                                <Popconfirm
                                    title={locale.locale.Task.CompleteTask}
                                    description={locale.locale.Task.CompleteTaskConfirmation}
                                    onConfirm={() => {
                                        setIsLoading(true);
                                        let formData = {
                                            "goalId": record.meetingGoalId,
                                        }
                                        completeTask(formData)
                                            .then(() => {
                                                getTaskList(selectedPersonId)
                                                    .then(data => {
                                                        setTasks(data);
                                                    })
                                                    .catch(e => unauthRedirect(e))
                                                    .finally(() => setIsLoading(false));
                                            })
                                            .catch(e => unauthRedirect(e))
                                    }}
                                    okText={locale.locale.Ok}
                                    cancelText={locale.locale.NO}
                                >
                                    <a>
                                        {locale.locale.Task.MarkAsCompleted}
                                    </a>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
        </div>
    );
};

export default observer(TaskList);