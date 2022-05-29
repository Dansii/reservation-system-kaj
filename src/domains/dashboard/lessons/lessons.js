import React, {useEffect} from "react";
import {Flex} from "@semcore/ui/flex-box";
import Button from "@semcore/ui/button";
import ListAddTopM from "@semcore/icon/ListAddTop/m";
import Table from "@semcore/ui/table";
import Skeleton from "@semcore/ui/skeleton";
import MathPlusS from "@semcore/icon/MathPlus/m";
import MathMinusS from "@semcore/icon/MathMinus/m";
import Pagination from "@semcore/ui/pagination";
import {
    $isModalFormOpened,
    $lessons,
    $pageNumber,
    $totalPages, bookSlotOnLesson,
    changePage,
    closeModalForm,
    getLessonsFx,
    openPageWithLessons, openModalForm, unbookSlotOnLesson
} from "./store";
import {useStore} from "effector-react";
import Modal from "@semcore/ui/modal";
import styled from "styled-components";
import { NoData } from '@semcore/ui/widget-empty';
import {LessonCard} from "./lesson-card/lesson-card";
import moment from "moment";
import {$currentUser} from "../../current-user/store";
import {adminUser} from "../../sing-in-form/http";

const StyledTable = styled(Table)`
  border-radius: 10px;
`

export const Lessons = () => {


    const currentPage = useStore($pageNumber);
    const totalPages = useStore($totalPages);
    const lessons = useStore($lessons);
    const isLoading = useStore(getLessonsFx.pending);
    const isModalFormOpened = useStore($isModalFormOpened);
    const currentUser = useStore($currentUser);

    useEffect(() => {
        openPageWithLessons();
    }, [currentPage, lessons, currentUser]);

    return (
        <>
                {
                    currentUser.username === adminUser.username
                    &&
                    (
                        <Flex
                            mt={5}
                            justifyContent="right"
                        >
                            <Button
                                size="l"
                                theme="info"
                                use="secondary"
                                onClick={openModalForm}
                            >
                                <Button.Addon>
                                    <ListAddTopM/>
                                </Button.Addon>
                                <Button.Text>
                                    Create lesson
                                </Button.Text>
                            </Button>
                        </Flex>
                    )
                }

            <StyledTable mt={8}>
                <Table.Head>
                    <Table.Row theme="false">
                        <Table.CellHead>
                            Direction
                        </Table.CellHead>
                        <Table.CellHead>
                            Lector
                        </Table.CellHead>
                        <Table.CellHead>
                            Capacity
                        </Table.CellHead>
                        <Table.CellHead>
                            Date
                        </Table.CellHead>
                        <Table.CellHead colSpan={2}>
                            Price
                        </Table.CellHead>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {
                        lessons === null
                            ? isLoading
                                ? (
                                    new Array(1).fill(0).map(() => (
                                        <Table.Row>
                                            {new Array(5).fill(0).map(() => (
                                                <Table.Cell>
                                                    <Skeleton h={10}>
                                                        <Skeleton.Text/>
                                                    </Skeleton>
                                                </Table.Cell>
                                            ))}
                                        </Table.Row>
                                    ))
                                )
                                : (
                                    <Table.Row>
                                        <Table.Cell colSpan={5}>
                                            <NoData type="table" />
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            : lessons.map((row) => (
                                <Table.Row>
                                    <Table.Cell >
                                        {row.direction}
                                    </Table.Cell>
                                    <Table.Cell >
                                        {row.lector}
                                    </Table.Cell>
                                    <Table.Cell >
                                        {row.capacity - row.freeSlots}/{row.capacity}
                                    </Table.Cell>
                                    <Table.Cell >
                                        {moment(row.date).format("DD MMM, HH:mm")}
                                    </Table.Cell>
                                    <Table.Cell >
                                        {row.price}
                                    </Table.Cell>
                                    <Table.Cell align="right">
                                        {
                                            currentUser.lessons.includes(row.id)
                                            ? (
                                                <Button
                                                    theme="invert"
                                                    use="primary"
                                                    onClick={()=>{
                                                        unbookSlotOnLesson(row.id)
                                                    }}
                                                >
                                                    <Button.Addon>
                                                        <MathMinusS/>
                                                    </Button.Addon>
                                                </Button>
                                            )
                                            : (
                                                <Button
                                                    theme="invert"
                                                    use="primary"
                                                    onClick={()=>{
                                                        bookSlotOnLesson(row.id)
                                                    }}
                                                >
                                                    <Button.Addon>
                                                        <MathPlusS/>
                                                    </Button.Addon>
                                                </Button>
                                            )
                                        }
                                    </Table.Cell>
                                </Table.Row>
                            ))
                    }
                </Table.Body>
            </StyledTable>
            {Boolean(totalPages) && (
                <Pagination
                    mt={3}
                    currentPage={currentPage}
                    onCurrentPageChange={changePage}
                    totalPages={totalPages}
                />
            )}
            <Modal
                w={300}
                pt={10}
                visible={isModalFormOpened}
                onClose={closeModalForm}
            >
                <LessonCard />
            </Modal>
        </>
    );
}