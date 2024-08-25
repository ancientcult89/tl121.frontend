import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {notFoundHttpRequestHandler} from "../../../utils/notFoundHttpRequestHandler";
import {unauthRedirect} from "../../../utils/unauthRedirect";
import {archivePerson, deletePerson, getPersonList, sendGreetingMessage} from "../../../http/personApi";
import {badHttpRequestHandler} from "../../../utils/badHttpRequestHandler";
import useHttpErrorHandling from "../../../hooks/useHttpErrorHandling";


const usePersonList = () => {
    const {
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        setHttpBadRequestResponseError,
        setHttpNotFoundRequestResponseError,
    } = useHttpErrorHandling()

    const {person, locale} = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [needUpdate, setNeedUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        getPersons()
        setIsLoading(false)
    }, [needUpdate])

    function getPersons() {
        getPersonList()
            .then(data => {
                person.setPersons(data)
                setItems(person.persons)
            })
            .catch(e => {
                executeErrorHandlers(e);
            });
    }

    function handleFilterChange(e) {
        setFilterText(e.target.value);
    }

    const executeErrorHandlers = (e) => {
        unauthRedirect(e);
        setHttpBadRequestResponseError(badHttpRequestHandler(e));
        setHttpNotFoundRequestResponseError(notFoundHttpRequestHandler(e));
    }

    const filteredItems = items.filter(item => item.lastName.toLowerCase().includes(filterText.toLowerCase()));

    function deletePersonHandler(personId) {
        setIsLoading(true);
        deletePerson(personId)
            .then(() => getPersons())
            .catch(e => {
                executeErrorHandlers(e);
            })
            .finally(() => setIsLoading(false))
    }

    function archivePersonHandler(personId) {
        setIsLoading(true);
        archivePerson(personId)
            .then(() => getPersons())
            .catch(e => {
                executeErrorHandlers(e);
            })
            .finally(() => setIsLoading(false));
    }

    function sendingGreetingMessageHandler(personId) {
        setIsLoading(true);
        sendGreetingMessage(personId)
            .catch(e => {
                executeErrorHandlers(e);
            })
            .finally(() => setIsLoading(false));
    }

    return {
        locale,
        setModalType,
        modalType,
        setSelectedPerson,
        selectedPerson,
        setIsLoading,
        isLoading,
        filterText,
        handleFilterChange,
        httpNotFoundRequestResponseError,
        httpBadRequestResponseError,
        filteredItems,
        setModalVisible,
        modalVisible,
        archivePersonHandler,
        deletePersonHandler,
        needUpdate,
        setNeedUpdate,
        sendingGreetingMessageHandler,
    };
};

export default usePersonList;