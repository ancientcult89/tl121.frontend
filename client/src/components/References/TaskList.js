import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {completeTask, getTaskList} from "../../http/meetingApi";
import {Alert, Popconfirm, Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import {unauthRedirect} from "../../utils/unauthRedirect";
import {notFoundHttpRequestHandler} from "../../utils/notFoundHttpRequestHandler";

const TaskList = ({personId, showPersonField = true}) => {
    const {locale, person} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);

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
                getTasks(personId);
            })
            .catch(e => {
                unauthRedirect(e);
                setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            {httpNotFoundRequestResponseError &&
                <div style={{marginTop:5}}>
                    <Alert
                        message={httpNotFoundRequestResponseError}
                        type="error"
                        closable={true}
                        onClick={() => setHttpNotFoundRequestResponseError(null)}
                        showIcon
                    />
                    <p></p>
                </div>
            }
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={tasks} rowKey={(task) => task.meetingGoalId } style={{marginTop:20}}>
                    {showPersonField &&
                        <Column
                            title={locale.locale.Task.Person}
                            dataIndex="personName"
                            key="1"
                        />
                    }

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