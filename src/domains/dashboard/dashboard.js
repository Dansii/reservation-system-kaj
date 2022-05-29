import React, {useCallback, useState} from "react";
import {Flex, Box} from "@semcore/ui/flex-box";
import styled from "styled-components";
import { Lessons} from "./lessons/lessons";
import Button from '@semcore/button';
import {BookedLessons} from "./booked-lessons/booked-lessons";
import Error, { getIconPath } from '@semcore/errors';
import {useStore} from "effector-react";
import {$currentUser} from "../current-user/store";
import {redirectToLogIn} from "./booked-lessons/store";
import {signOut} from "./store";

const Navigation = styled(Box)`
  box-shadow: rgb(204 204 204) 0 0 1px 1px;
  background-color: #fff;
  z-index: 2;
`

const Content = styled(Flex)`
  background-color: #f8f8f8;
`

export const Dashboard = () => {
    const currentUser = useStore($currentUser)
    const [isReservationPage, setReservationPage] = useState(true);
    const addTodo = useCallback(() => {
            setReservationPage((value) => !value);
    });


    return (
        <>
            {
                currentUser === null
                    ? (
                        <Error icon={getIconPath('confirmation')}>
                            <Error.Title>You have to log in</Error.Title>
                            <Error.Description wMax={510}>
                                You don't have access to this url because you are not authorized
                            </Error.Description>
                            <Error.Controls>
                                <Button
                                    size="l"
                                    use="primary"
                                    theme="warning"
                                    onClick={redirectToLogIn}
                                >
                                    Log in
                                </Button>
                            </Error.Controls>
                        </Error>                    )
                    : (
                        <Flex
                            justifyContent="space-between"
                            h="100vh"
                        >
                            <Navigation
                                w={90}
                                h="100%"
                                flex="0 0 auto"
                            >
                                <Flex
                                    direction={"column"}
                                    justifyContent={"space-between"}
                                    h={"100%"}
                                >
                                    <Button
                                        w="100%"
                                        h={90}
                                        onClick={addTodo}
                                    >
                                        {
                                            isReservationPage
                                                ? (
                                                    'All lessons'
                                                )
                                                : (
                                                    'Reservation'
                                                )
                                        }
                                    </Button>
                                    <Button
                                        w="100%"
                                        h={90}
                                        onClick={signOut}
                                    >
                                        Sign out
                                    </Button>
                                </Flex>
                            </Navigation>
                            <Content
                                w="100%"
                                h="100%"
                                justifyContent="center"
                            >
                                <Box w="90%">
                                    { isReservationPage
                                        ? (
                                            <BookedLessons/>
                                        )
                                        : (
                                            <Lessons/>
                                        )
                                    }
                                </Box>
                            </Content>
                        </Flex>
                    )
            }
        </>
    );
}