import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Space, Spin} from "antd";
import usePersonSelector from "./usePersonSelector";

const PersonSelector = ({onSelect, selectedPersonName, onClear, isClearable}) => {
    const {
        locale,
        personsLoaded,
        personDropdownItems,
    } = usePersonSelector(onSelect);

    return (
        <Spin tip={locale.locale.Loading} spinning={!personsLoaded}>
            {isClearable &&
                <Button
                    onClick={onClear}
                    style={{marginRight: 5}}
                >
                    {locale.locale.Meeting.ClearFiltering}
                </Button>
            }
            <Dropdown
                menu={{
                    items: personDropdownItems
                }}>
                <Button>
                    <Space>
                        {selectedPersonName || locale.locale.Meeting.SelectPerson}
                    </Space>
                </Button>
            </Dropdown>
        </Spin>
    );
};

export default observer(PersonSelector);