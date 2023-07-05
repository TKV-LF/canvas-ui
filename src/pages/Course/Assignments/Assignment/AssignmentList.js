import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    border-radius: 5px;
`;

const ColumnStyles = styled.div`
    display: flex;
    width: 100%;
`;

const Task = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 15px;
    min-height: 56px;
    border-radius: 5px;
    max-width: 100%;
    /* background: ${({ isDragging }) => (isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white')}; */
    background: white;
    margin-top: 15px;

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

const getWeight = (id) => {
    return localStorage.getItem('assignment_' + id) || 0;
};
const AssignmentList = ({ courseId, data }) => {
    const [items, setItems] = useState(data);
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        let orderItems = reorder(items, result.source.index, result.destination.index);

        setItems(orderItems);
    };
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
                                            <div>
                                                <div className="absolute left-3/4 ml-32 mt-4">
                                                    Trọng số {getWeight(item.id)}
                                                </div>
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="border-b"
                                                >
                                                    <Link to={`/courses/${courseId}/assignments/${item.id}`}>
                                                        <Task>{item.name}</Task>
                                                    </Link>
                                                </div>
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

export default AssignmentList;
