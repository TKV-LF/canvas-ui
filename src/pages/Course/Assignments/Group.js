import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Assignment } from '~/pages/Course/Assignments';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CourseApi } from '~/services/api';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const List = styled.div`
    min-height: 100px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ColumnStyles = styled.div`
    display: flex;
    width: 100%;
`;

const AssignmentGroup = styled.div`
    background-color: #ebedee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 15px;
    min-height: 56px;
    max-width: 100%;
    /* background: ${({ isDragging }) => (isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white')}; */

    .secondary-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: 12px;
        font-weight: 400px;
        color: #7d7d7d;
    }
`;

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const Group = ({ courseId }) => {
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        let orderItems = reorder(items, result.source.index, result.destination.index);
        setItems(orderItems);
    };

    function toggleVisibility(item) {
        if (visibleItems.includes(item)) {
            setVisibleItems(visibleItems.filter((i) => i !== item));
        } else {
            setVisibleItems([...visibleItems, item]);
        }
    }

    useEffect(() => {
        let payload = {
            courseId: courseId,
        };
        async function getData() {
            try {
                const data = await CourseApi.getAssignmentGroups(payload);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
        getData().then((data) => {
            async function getAssignments() {
                try {
                    const assignments = await CourseApi.getAssignments(payload);
                    return assignments;
                } catch (error) {
                    console.log(error);
                }
            }
            getAssignments().then((assignments) => {
                let groups = data.map((group) => {
                    let groupAssignments = assignments.filter(
                        (assignment) => assignment.assignment_group_id === group.id,
                    );
                    return {
                        ...group,
                        assignments: groupAssignments,
                    };
                });
                setItems(groups);
            });
        });
    }, []);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                <ColumnStyles>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <List ref={provided.innerRef} {...provided.droppableProps}>
                                {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="border-x border-t mb-5"
                                            >
                                                <AssignmentGroup>
                                                    <div onClick={() => toggleVisibility(item)}>
                                                        <FontAwesomeIcon
                                                            className="mr-2"
                                                            icon={
                                                                visibleItems.includes(item) ? faCaretDown : faCaretRight
                                                            }
                                                        />
                                                        {item.name}
                                                    </div>
                                                </AssignmentGroup>
                                                {visibleItems.includes(item) && <Assignment data={item.assignments} />}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </ColumnStyles>
            </Container>
        </DragDropContext>
    );
};
export default Group;
