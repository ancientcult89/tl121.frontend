import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Space} from "antd";
import {localeList} from "../locales/localeList";
import {Context} from "../index";

const LocaleSelector = () => {
    const {locale} = useContext(Context);
    const [currentLocale, setCurrentLocale] = useState({
        locale: locale.locale,
        localeName: locale.localeName,
    });

    function onSelect(selectedLocale) {
        setCurrentLocale({
            locale: selectedLocale.locale,
            localeName: selectedLocale.localeName
        })
        localStorage.setItem('locale', selectedLocale.localeName);
        locale.setLocale(selectedLocale.localeName);
    }
    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => onSelect(localeList[0])}>
                    {localeList[0].localeName}
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => onSelect(localeList[1])}>
                    {localeList[1].localeName}
                </div>
            ),
        },
    ];

    return (
        <Dropdown menu={{
            items: items
        }}
        >
            <Button style={{marginTop: 8, marginLeft: 5}}>
                <Space>
                    {currentLocale.localeName}
                </Space>
            </Button>
        </Dropdown>
    );
};

export default LocaleSelector;