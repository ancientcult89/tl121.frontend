import {observer} from "mobx-react-lite";
import TextArea from "antd/es/input/TextArea";
import {Button, Popconfirm, Space, Table} from "antd";
import Column from "antd/es/table/Column";
import useMeetingGoals from "./useMeetingGoals";

const MeetingGoals = ({meetingId}) => {
    const {
        locale,
        goals,
        onSelectEditedGoalHandle,
        setGoalText,
        goalText,
        isEditedGoal,
        addNoteHandle,
        editGoalHandle,
        deleteGoalHandle,
    } = useMeetingGoals(meetingId);

    return (
        <div>
            <Table dataSource={goals} rowKey={(record) => record.meetingGoalId} pagination={false}>
                <Column
                    title={locale.locale.Meeting.Goals.Goal}
                    key={"1"}
                    render={(record) => (
                        <div>{record.meetingGoalDescription}</div>
                    )}
                />
                <Column
                    title={locale.locale.Action}
                    key={"2"}
                    render={(record) => (
                        <Space size="middle">
                            <a onClick={() => onSelectEditedGoalHandle(record.meetingGoalId, record.meetingGoalDescription, record.completeDescription)}>
                                {locale.locale.Edit}
                            </a>
                            <Popconfirm
                                title={locale.locale.Meeting.Goals.DeleteTitle}
                                description={locale.locale.Meeting.Goals.DeleteConfirmation}
                                onConfirm={() => deleteGoalHandle(record.meetingId, record.meetingGoalId)}
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
            <div style={{marginTop:5}}/>
            <TextArea rows={2} onChange={(e) => {setGoalText(e.target.value)}} value={goalText}/>
            {!isEditedGoal &&
                <Button type={"primary"} style={{marginTop: 5}} onClick={() => addNoteHandle()}>
                    {locale.locale.Meeting.Goals.AddGoal}
                </Button>
            }
            {isEditedGoal &&
                <Button type={"primary"} style={{marginTop: 5, backgroundColor:"green"}} onClick={() => editGoalHandle()}>
                    {locale.locale.Meeting.Goals.EditGoal}
                </Button>
            }
        </div>
    );
};

export default observer(MeetingGoals);