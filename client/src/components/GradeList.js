import React, {useContext, useEffect} from 'react';
import { Space, Table, Tag } from 'antd';
import {Context} from "../index";
import {getGradeList} from "../http/gradeApi";
const { Column } = Table;
const dataNew = [
    {
        key: '1',
        gradeName: 'Junior',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        gradeName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        gradeName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const GradeList = () => {
    const {grade} = useContext(Context);
    useEffect(() => {
        getGradeList().then(data => {
            grade.setGrades(data);
        });
    }, [grade])
    return (
        <Table dataSource={grade.grades}>

            <Column title="Grade Name" dataIndex="gradeName" key="key" />
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <a>Edit {/*record.gradeName*/}</a>
                        <a>Delete</a>
                    </Space>
                )}
            />
        </Table>
    );
};

export default GradeList;