import {observer} from "mobx-react-lite";
import {Button, Spin} from "antd";
import BackEndErrorBox from "../../Form/ErrorBox/BackEndErrorBox";
import useFollowUp from "./useFollowUp";

const FollowUp = () => {
    const {
        locale,
        followUp,
        sendingFollowUpHandler,
        httpBadRequestResponseError,
        httpNotFoundRequestResponseError,
        isLoading,
    } = useFollowUp();

    return (
        <Spin tip={locale.locale.Loading} spinning={isLoading}>
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
        </Spin>
    );
};

export default observer(FollowUp);