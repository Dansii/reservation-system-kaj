import React from "react";
import {Flex} from "@semcore/ui/flex-box";
import Select from "@semcore/ui/select";
import {Text} from "@semcore/ui/typography";
import Input from "@semcore/ui/input";
import Timepicker from '@semcore/ui/time-picker';
import {DatePicker} from '@semcore/ui/date-picker';
import Button from "@semcore/ui/button"
import MathPlusS from "@semcore/icon/MathPlus/m";
import {useForm} from "react-hook-form";
import {CredentialsWarning} from "../../../../shared/credentials-warning";
import {Controller} from "react-hook-form";
import {
    changeCapacity,
    changeDate,
    changeDirection,
    changeLector, changePrice, changeTime, createLesson
} from "./store";
import {directions, lectors} from "./http";
import {closeModalForm} from "../store";



export const LessonCard = () => {
    const {register, handleSubmit, control, formState: { errors }} = useForm();
    const inputOptions = {
        direction: { required: "required" },
        lector: { required: "required" },
        time: { required: "required" },
        date: { required: "required" },
    };
    const onSubmit = () => {
        createLesson()
        closeModalForm()
    }

    return (
        <>
            <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb={4}
            >
                <Text
                    tag="p"
                    size={200}
                >
                    Direction
                </Text>
                <Controller
                    control={control}
                    name="Direction"
                    rules={inputOptions.direction}
                    render={({field}) => (
                        <Select
                            w={130}
                            options={directions}
                            placeholder={"select direction"}
                            {...field}
                            onChange={(...args) => {
                                field.onChange(...args);
                                changeDirection(...args);
                            }}
                        />
                    )}
                />
            </Flex>
            <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb={4}
            >
                <Text
                    tag="p"
                    size={200}
                >
                    Lector
                </Text>
                <Controller
                    control={control}
                    name="Lector"
                    rules={inputOptions.lector}
                    render={({field}) => (
                        <Select
                            w={130}
                            options={lectors}
                            {...field}
                            placeholder={"select lector"}
                            onChange={(...args) => {
                                field.onChange(...args);
                                changeLector(...args);
                            }}
                        />
                    )}
                />
            </Flex>
            <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb={4}
            >
                <Text
                    tag="p"
                    size={200}
                >
                    Capacity
                </Text>
                <Input
                    size="m"
                    state="normal"
                    w={130}
                >
                    <Input.Value
                        type={"number"}
                        {...register("Capacity", {
                            required : "required",
                            max: {
                                value : 10,
                                message : "field takes values from 1 to 10"
                            },
                            min: {
                              value : 1,
                              message : "field takes values from 1 to 10"
                            },
                            valueAsNumber : true
                        })}
                        placeholder="capacity"
                        onChange={changeCapacity}
                    />
                </Input>
            </Flex>
            <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb={4}
            >
                <Text
                    tag="p"
                    size={200}
                >
                    Date
                </Text>
                <Controller
                    control={control}
                    name="Date"
                    rules={inputOptions.date}
                    render={({field}) => (
                        <DatePicker
                            w={130}
                            placeholder={"select date"}
                            {...field}
                            onChange={(...args) => {
                                field.onChange(...args);
                                changeDate(...args);
                            }}
                        />
                    )}
                />
            </Flex>
            <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mb={4}
            >
                <Text
                    tag="p"
                    size={200}
                >
                    Time
                </Text>
                <Controller
                    control={control}
                    name="Time"
                    rules={inputOptions.date}
                    render={({field}) => (
                        <Timepicker
                            w={130}
                            {...field}
                            onChange={(...args) => {
                                field.onChange(...args);
                                changeTime(...args);
                            }}
                        />
                    )}
                />
            </Flex>
            <Flex
                justifyContent={"space-between"}
                alignItems="center"
            >
                <Text tag
                          ="p" size={200}>
                    Price
                </Text>
                <Input
                    size="m"
                    state="normal"
                    w={130}
                >
                    <Input.Value
                        {...register("Price", {
                            required : "required",
                            min: {
                                value : 250,
                                message : "minimum price of lesson is 250"
                            },
                            valueAsNumber : true
                        })}
                        type={"number"}
                        placeholder="price"
                        onChange={changePrice}
                    />
                </Input>
            </Flex>
            <Flex
                justifyContent="right"
                mt={5}
            >
                <Button
                    size="m"
                    theme="info"
                    use="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    <Button.Addon>
                        <MathPlusS />
                    </Button.Addon>
                    <Button.Text>
                        Create
                    </Button.Text>
                </Button>
            </Flex>
            <CredentialsWarning isVisible={false}>
                A lesson with this coach has already been scheduled on this date.
            </CredentialsWarning>
            <CredentialsWarning isVisible={Object.keys(errors).length !== 0}>
                {
                    Object.keys(errors).map((wrongField) => (
                        <p key={wrongField}>{wrongField}: {errors[wrongField].message}</p>
                    ))
                }
            </CredentialsWarning>
        </>
    );
}