import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {getFilteredPersonList} from "../../../http/personApi";

const usePersonSelector = (onSelect) => {
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

    return {
        locale,
        personsLoaded,
        personDropdownItems,
    };
};

export default usePersonSelector;