import {observer} from "mobx-react-lite";
import {Button} from "antd";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import useFollowUp from "./useFollowUp";

const FollowUp = () => {
    const {
        locale,
        followUp,
        sendingFollowUpHandler,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
    } = useFollowUp();

    return (
        <div>
            <BackEndErrorBox
                httpBadRequestResponseError={httpBadRequestResponseError}
                httpNotFoundRequestResponseError={httpNotFoundRequestResponseError}
            />
            <pre>{followUp}</pre>
            <Button
                type={"primary"}
                style={{backgroundColor: "green"}}
                onClick={sendingFollowUpHandler}
            >
                {locale.locale.Meeting.ProcessingContent.SendFollowUp}
            </Button>
        </div>
    );
};

export default observer(FollowUp);