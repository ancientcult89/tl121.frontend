import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {completeTask, getTaskList} from "../../http/meetingApi";
import {Popconfirm, Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import {unauthRedirect} from "../../utils/unauthRedirect";

const TaskList = ({personId}) => {
    const {locale, person} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks(personId);
        setIsLoading(false);
    }, [personId]);

    const getTasks = (personId) => {
        getTaskList(personId)
            .then(data => {
                setTasks(data);
            })
            .catch(e => unauthRedirect(e))
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