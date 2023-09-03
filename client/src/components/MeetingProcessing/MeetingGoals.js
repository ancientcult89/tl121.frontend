import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import TextArea from "antd/es/input/TextArea";
import {Button, Space, Table} from "antd";
import {getMeetingGoals} from "../../http/meetingApi";
import Column from "antd/es/table/Column";

const MeetingGoals = ({meetingId}) => {
    const {locale} = useContext(Context);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        getMeetingGoals(meetingId)
            .then(data => setGoals(data));
    }, [])

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
                            <a>{locale.locale.Edit}</a>
                            <a>{locale.locale.Delete}</a>
                        </Space>
                    )}
                />
            </Table>
            <div style={{marginTop:5}}/>
            <TextArea rows={2} />
            <Button type={"primary"} style={{marginTop: 5, backgroundColor:"green"}}>
                {locale.locale.Meeting.Goals.AddGoal}
            </Button>
        </div>
    );
};

export default observer(MeetingGoals);