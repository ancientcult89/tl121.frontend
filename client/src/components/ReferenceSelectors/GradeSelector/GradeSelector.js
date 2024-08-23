import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Space, Spin} from "antd";
import useGradeSelector from "./useGradeSelector";

const GradeSelector = ({onSelect, selectedGradeName}) => {
    const {
        gradeDropdownItems,
        gradeLoaded,
        locale,
        getData
    } = useGradeSelector(onSelect);

    useEffect(() => {
        getData()
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