import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button, Dropdown, Form, Space, Spin} from "antd";
import {getGradeList} from "../../http/gradeApi";
import {unauthRedirect} from "../../utils/unauthRedirect";

const GradeSelector = ({onSelect, selectedGradeName}) => {
    const {grade, locale} = useContext(Context);
    const [gradeLoaded, setGradeLoaded] = useState(false);
    const [gradeDropdownItems,setGradeDropdownItems] = useState([]);

    useEffect(() => {
        getGradeList()
            .then(data => {
                grade.setGrades(data);
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                const items = [];
                grade.grades.map((grade) => {
                    items.push({
                        label: (
                            <div onClick={() => onSelect(grade.gradeId)}>
                                {grade.gradeName}
                            </div>
                        ),
                        key: grade.gradeId
                    });
                });
                setGradeDropdownItems(items);
                setGradeLoaded(true);
            });
    }, []);

    return (
        <Spin tip={locale.locale.Loading} spinning={!gradeLoaded}>
            <Dropdown menu={{
                items: gradeDropdownItems
            }}>
                <Button>
                    <Space>
                        {selectedGradeName || locale.locale.GradeSelector.SelectGradeQuery}
                    </Space>
                </Button>
            </Dropdown>
        </Spin>
    );
};

export default observer(GradeSelector);