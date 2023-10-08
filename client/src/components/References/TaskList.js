import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {completeTask, getTaskList} from "../../http/meetingApi";
import {Popconfirm, Row, Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import PersonSelector from "../ReferenceSelectors/PersonSelector";
import {unauthRedirect} from "../../utils/unauthRedirect";

const TaskList = () => {
    const {locale, person} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks(person.selectedPerson.personId);
        setIsLoading(false);
    }, [person.selectedPerson.personId]);

    const selectedPersonHandler = (personId) => {
        person.persons.map(item => {
            if(item.personId === personId)
            {
                person.setSelectedPerson({
                    personId: item.personId,
                    personName: item.lastName + ' ' + item.firstName + ' ' + item.surName
                });
            }
        })
    }

    const getTasks = (personId) => {
        getTaskList(personId)
            .then(data => {
                setTasks(data);
            })
            .catch(e => unauthRedirect(e))
    }

    const clearFilteringTaskList = () => {
        person.setSelectedPerson({
            personId: null,
            personName: ''
        });
    }

    function completeTaskHandler(meetingGoalId) {
        setIsLoading(true);
        let formData = {
            "goalId": meetingGoalId,
        }
        completeTask(formData)
            .then(() => {
                getTasks(person.selectedPerson.personId);
            })
            .catch(e => unauthRedirect(e))
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Row>
                <PersonSelector
                    onSelect={selectedPersonHandler}
                    selectedPersonName={person.selectedPerson.personName}
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
                                    onConfirm={() => completeTaskHandler(record.meetingGoalId)}
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