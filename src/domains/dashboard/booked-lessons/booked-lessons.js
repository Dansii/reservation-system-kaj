import React, {useEffect} from "react";
import Button from "@semcore/ui/button";
import Table from "@semcore/ui/table";
import Skeleton from "@semcore/ui/skeleton";
import MathMinusS from "@semcore/icon/MathMinus/m";
import Pagination from "@semcore/ui/pagination";
import {
    $lessons,
    $pageNumber,
    $totalPages,
    changePage,
    getReservationsFx,
    openPageWithReservations,
    unbookSlotOnLesson
} from "./store";
import styled from "styled-components";
import { NoData } from '@semcore/ui/widget-empty';
import moment from "moment";
import {useStore} from "effector-react";
import {$currentUser} from "../../current-user/store";

const StyledTable = styled(Table)`
  border-radius: 10px;
`

export const BookedLessons = () => {


    const currentPage = useStore($pageNumber);
    const totalPages = useStore($totalPages);
    const lessons = useStore($lessons);
    const isLoading = useStore(getReservationsFx.pending);
    const currentUser = useStore($currentUser);

    useEffect(() => {
        openPageWithReservations();
    }, [currentPage, lessons, currentUser]);

    return (
        <>
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
        </>
    );
}