import React, {useContext} from 'react';
import {Button} from "antd";
import {Context} from "../../../index";

const SaveButton = ({onClick}) => {
    const {locale} = useContext(Context);

    return (
        <Button onClick={onClick} type={"primary"}>
            {locale.locale.Save}
        </Button>
    );
};

export default SaveButton;