import {observer} from "mobx-react-lite";
import {Alert, Popconfirm, Space, Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import useTaskList from "./useTaskList";

const TaskList = (props) => {
    const {personId, showPersonField = true, currentMeetingId = null} = props;

    const {
        locale,
        httpNotFoundRequestResponseError,
        setHttpNotFoundRequestResponseError,
        isLoading,
        tasks,
        completeTaskHandler,
    } = useTaskList(props);

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