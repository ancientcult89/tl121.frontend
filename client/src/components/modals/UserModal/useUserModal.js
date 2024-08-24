import {useContext, useState} from "react";
import {Context} from "../../../index";


const useUserModal = () => {
    const [changePasswordFlag, setChangePasswordFlag] = useState(false);
    const {locale} = useContext(Context);

    const onChange = (checked) => {
        setChangePasswordFlag(checked);
    };

    return {
        locale,
        onChange,
        changePasswordFlag,
    };
};

export default useUserModal;