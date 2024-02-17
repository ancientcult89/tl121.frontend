import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getOneTwoOne} from "../http/oneToOneDeadLineApi";
import {Alert, Space, Spin, Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import {Context} from "../index";
import {unauthRedirect} from "../utils/unauthRedirect";
import {createMeetingForProcessing, getMeeting} from "../http/meetingApi";
import {MEETING_PROCESSING_ROUTE} from "../utils/consts";
import {notFoundHttpRequestHandler} from "../utils/notFoundHttpRequestHandler";
import {useNavigate} from "react-router-dom";
import {badHttpRequestHandler} from "../utils/badHttpRequestHandler";

const OneToOneDeadLineList = observer(() => {
    const [isLoading, setIsLoading] = useState(true);
    const {locale} = useContext(Context);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [httpNotFoundRequestResponseError, setHttpNotFoundRequestResponseError] = useState(null);
    const [httpBadRequestResponseError, setHttpBadRequestResponseError] = useState(null);


    function getDeadLineColor(daysToDeadline) {
        if(daysToDeadline < 10 && daysToDeadline >= 5)
            return 'green'
        else if(daysToDeadline < 5 && daysToDeadline > 0)
            return 'yellow'
        else if(daysToDeadline <= 0)
            return 'red'
        return null
    }

    useEffect(() => {
        getOneTwoOne()
            .then(oneTwoOneDeadlines => {
                setData(oneTwoOneDeadlines);
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    let tableData = [];
    data.map(item => {
        tableData.push({
            personId: item.person.personId,
            fullname: item.person.lastName + ' ' + item.person.firstName + ' ' + item.person.surName,
            gradeName: item.person.grade.gradeName,
            lastMeeting: item.lastOneToOneMeetingDate != null
                ? new Date(item.lastOneToOneMeetingDate).toLocaleDateString()
                : item.lastOneToOneMeetingDate,
            deadLine: new Date(item.deadLine).toLocaleDateString(),
            dayToDeadLine: item.dayToDeadline,
        })
    });

    const executeErrorHandlers = (e) => {
        unauthRedirect(e);
        setHttpBadRequestResponseError(badHttpRequestHandler(e));
        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
    }

    function processMeeting(personId) {
        let meetingId;
        createMeetingForProcessing(personId)
            .then((newMeeting) =>{
                meetingId = newMeeting.meetingId;
            })
            .then(() => {
                getMeeting(meetingId)
                    .then(() => {
                        navigate(
                            MEETING_PROCESSING_ROUTE + '/?meetingId=' + meetingId + '&personId=' + personId
                        )
                    })
                    .catch((e) => {
                        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
                    })
            })
            .catch(e => executeErrorHandlers(e));
    }

    return (
        <div>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                {httpNotFoundRequestResponseError &&
                    <div>
                        <Alert
                            message={httpNotFoundRequestResponseError}
                            type="error"
                            showIcon
                        />
                        <p></p>
                    </div>
                }
                {httpBadRequestResponseError &&
                    <div>
                        <Alert
                            message={httpBadRequestResponseError}
                            type="error"
                            showIcon
                        />
                        <p></p>
                    </div>
                }
                <Table
                    dataSource={tableData}
                    rowKey={(record) => record.personId }
                    style={{marginTop:20}}
                    pagination={false}
                >
                    <Column title={locale.locale.OneTwoOne.Person} dataIndex="fullname" key="1" />
                    <Column title={locale.locale.OneTwoOne.Grade} dataIndex="gradeName" key="2" />
                    <Column
                        title={locale.locale.OneTwoOne.LastMeeting}
                        key="3"
                        render={(record) => (
                            <a>
                                {record.lastMeeting != null ? record.lastMeeting : locale.locale.NotSet}
                            </a>

                        )}
                    />
                    <Column title={locale.locale.OneTwoOne.DeadLine} dataIndex="deadLine" key="4" />
                    <Column
                        title={locale.locale.OneTwoOne.DaysForDeadline}
                        dataIndex="dayToDeadLine"
                        key="5"
                        render={(record) =>
                            (<Tag color={getDeadLineColor(record)}>
                                {record}
                            </Tag>)
                        }
                    />
                    <Column
                        title={locale.locale.Meeting.Processing}
                        key="6"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => processMeeting(record.personId)}
                                >
                                    {locale.locale.Meeting.Process}
                                </a>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
        </div>

    );
});

export default OneToOneDeadLineList;