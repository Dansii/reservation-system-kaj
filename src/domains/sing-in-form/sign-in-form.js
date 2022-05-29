import {Box, Flex} from "@semcore/ui/flex-box";
import {Text} from "@semcore/ui/typography";
import Input from "@semcore/ui/input";
import Button from "@semcore/ui/button";
import React from "react";
import Card from "@semcore/ui/card";
import Link from "@semcore/ui/Link";
import {Link as LinkRouter} from 'react-router-dom'
import {useStore} from "effector-react";
import {$email, $hasError, $password, changeEmail, changePassword, signIn, signInFx} from "./store";
import UserM from '@semcore/ui/icon/User/m'
import KeyM from '@semcore/icon/Key/m'
import {CredentialsWarning} from "../../shared/credentials-warning";
import {useForm} from "react-hook-form";


export const SignInForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const email = useStore($email)
    const password = useStore($password)
    const hasError = useStore($hasError);
    const isPending = useStore(signInFx.pending);

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            h="100vh"
        >
            <Box
                tag={Card}
                w={350}
            >
                <Text>
                    Email
                </Text>
                <Input
                    mt={2}
                    mb={4}
                    size="l"
                    state="normal"
                >
                    <Input.Addon>
                        <UserM />
                    </Input.Addon>
                    <Input.Value
                        {...register("email", {
                            required: 'required field',
                            pattern : {
                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                                message: "incorrect address"
                                }
                            }
                        )}
                        name={'email'}
                        placeholder={'email'}
                        autoFocus={true}
                        onChange={changeEmail}
                        value={email}
                    />
                </Input>
                <Text>
                    Password
                </Text>
                <Input
                    mt={2}
                    mb={4}
                    size="l"
                    state="normal"
                >
                    <Input.Addon>
                        <KeyM />
                    </Input.Addon>
                    <Input.Value
                        {...register("password", {
                            required: 'required field',
                            pattern : {
                                value : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,}$/,
                                message :
                                    "must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n"
                                },
                            minLength : {
                                value : 8,
                                message: "at least 8 characters"
                                }
                            })
                        }
                        placeholder={'password'}
                        onChange={changePassword}
                        value={password}
                        type="password"
                    />
                </Input>
                <Button
                    w='100%'
                    size="l"
                    theme="warning"
                    use="primary"
                    loading={isPending}
                    onClick={handleSubmit(signIn)}
                >
                    <Text fontWeight={700}>
                        SIGN IN
                    </Text>
                </Button>
                <Text
                    tag={'p'}
                    mt={2}
                >
                    Don't have a account?{' '}
                    <Link
                        tag={LinkRouter}
                        to={'/sign-up'}
                        color={'#ff7f00'}
                    >
                        Sign up
                    </Link>
                </Text>
                <CredentialsWarning isVisible={hasError}>
                    Wrong credentials
                </CredentialsWarning>
                <CredentialsWarning isVisible={Object.keys(errors).length !== 0}>
                    {
                        Object.keys(errors).map((wrongField) => (
                            <p key={wrongField}>{wrongField}: {errors[wrongField].message}</p>
                        ))
                    }
                </CredentialsWarning>
            </Box>
        </Flex>
    );
}