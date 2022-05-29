import React from "react";
import Notice from "@semcore/ui/notice";
import {Flex} from "@semcore/ui/flex-box";
import WarningM from "@semcore/icon/Warning/m";
import {Text} from "@semcore/ui/typography";

export const CredentialsWarning = ({
   isVisible,
   children,
}) => {
    if (!isVisible) {
        return null;
    }

    return (
        <>
            <Notice
                theme="danger"
                use="secondary"
                mt={6}
            >
                <Notice.Label tag={Flex} alignItems="center">
                    <WarningM/>
                </Notice.Label>
                <Notice.Content>
                    <Text
                        bold
                        lineHeight="24px"
                        size={300}
                        tag="div"
                    >
                        {children}
                    </Text>
                </Notice.Content>
            </Notice>
        </>
    );
}