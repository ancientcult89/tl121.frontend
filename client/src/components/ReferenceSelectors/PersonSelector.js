import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Space, Spin} from "antd";
import {getFilteredPersonList} from "../../http/personApi";
import {Context} from "../../index";
import {unauthRedirect} from "../../utils/unauthRedirect";

const PersonSelector = ({onSelect, selectedPersonName, onClear, isClearable}) => {
    const {person, locale} = useContext(Context);
    const [personDropdownItems, setPersonDropdownItems] = useState([]);
    const [personsLoaded, setPersonsLoaded] = useState(false);

    useEffect(() => {
        const items = [];
        getFilteredPersonList()
            .then(persons => {
                person.setPersons(persons)
                persons.map((person) => items.push({
                        label: (
                            <div onClick={() => {
                                onSelect(person.personId);
                            }}>
                                {person.lastName + ' ' + person.firstName + ' ' + person.surName}
                            </div>
                        ),
                        key: person.personId,
                    })
                )
                setPersonDropdownItems(items);
            })
            .catch(e => {
                unauthRedirect(e);
            })
            .finally(() => {
                setPersonsLoaded(true);
            });
    }, []);

    return (
        <Spin tip={locale.locale.Loading} spinning={!personsLoaded}>
            {isClearable &&
                <Button onClick={onClear}>
                    {locale.locale.Meeting.ClearFiltering}
                </Button>
            }
            <Dropdown
                menu={{
                    items: personDropdownItems
                }}>
                <Button style={{marginLeft: 5}}>
                    <Space>
                        {selectedPersonName || locale.locale.Meeting.SelectPerson}
                    </Space>
                </Button>
            </Dropdown>
        </Spin>
    );
};

export default observer(PersonSelector);