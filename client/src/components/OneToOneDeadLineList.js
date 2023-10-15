import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getOneTwoOne} from "../http/oneToOneDeadLineApi";
import {Spin, Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import {Context} from "../index";
import {unauthRedirect} from "../utils/unauthRedirect";

const OneToOneDeadLineList = observer(() => {
    const [isLoading, setIsLoading] = useState(true);
    const {locale} = useContext(Context);
    const [data, setData] = useState([]);

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
            lastMeeting: new Date(item.lastOneToOneMeetingDate).toLocaleDateString(),
            deadLine: new Date(item.deadLine).toLocaleDateString(),
            dayToDeadLine: item.dayToDeadline,
        })
    });

    return (
        <div>
            <Spin tip={locale.locale.Loading} spinning={isLoading}>
                <Table dataSource={tableData} rowKey={(record) => record.personId } style={{marginTop:20}}>
                    <Column title={locale.locale.OneTwoOne.Person} dataIndex="fullname" key="1" />
                    <Column title={locale.locale.OneTwoOne.Grade} dataIndex="gradeName" key="2" />
                    <Column title={locale.locale.OneTwoOne.LastMeeting} dataIndex="lastMeeting" key="3" />
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
                </Table>
            </Spin>
        </div>

    );
});

export default OneToOneDeadLineList;