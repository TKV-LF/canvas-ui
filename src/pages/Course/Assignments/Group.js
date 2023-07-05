import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AssignmentList } from '~/pages/Course/Assignments';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CourseApi } from '~/services/api';
import { notification } from 'antd';
import { ActionMenu } from '~/components/Menu';
import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { FormDialog } from '~/components/Form';

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

async function getAssignments(payload) {
    try {
        const assignments = await CourseApi.getAssignments(payload);
        return assignments;
    } catch (error) {
        console.log(error);
    }
}

async function deleteAssignmentGroup(payload) {
    try {
        const response = await CourseApi.deleteAssignmentGroup(payload);
        return response;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

async function updateAssignmentGroup(payload) {
    try {
        const response = await CourseApi.updateAssignmentGroup(payload);
        return response;
    } catch (error) {
        // Rethrow the error to allow error handling further up the call stack
        throw error;
    }
}

const Group = ({ courseId, assignmentGroups }) => {
    const [items, setItems] = useState(assignmentGroups);
    const [open, setOpen] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const handleFormSubmit = (values) => {
        const payload = {
            courseId: courseId,
            assignmentGroupId: values.assignmentGroupId,
        };

        updateAssignmentGroup(payload)
            .then((data) => {
                notification.success({
                    message: 'Đã cập nhật nhóm bài tập',
                });
            })
            .catch((error) => {
                notification.error({
                    message: 'Cập nhật nhóm bài tập thất bại',
                });
            });
    };

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

    const navigate = useNavigate();

    useEffect(() => {
        let payload = {
            courseId: courseId,
        };
        getAssignments(payload).then((data) => {
            const assignmentGroupsWithAssignments = assignmentGroups.reduce((result, group) => {
                const groupAssignments = data.filter((assignment) => assignment.assignment_group_id === group.id);
                result.push({ ...group, assignments: groupAssignments });
                return result;
            }, []);

            setItems(assignmentGroupsWithAssignments);
        });
    }, [assignmentGroups]);

    const handleDelete = (assignmentGroupId) => {
        console.log(assignmentGroupId);
        deleteAssignmentGroup({ courseId, assignmentGroupId })
            .then(() => {
                notification.success({
                    message: 'Xóa thành công',
                });
                navigate(generatePath('/courses/:courseId/assignments', { courseId }));
            })
            .catch((error) => {
                notification.error({
                    message: 'Xóa thất bại',
                });
            });
    };

    const handleEdit = () => {
        setOpen(true);
    };

    const options = [
        {
            key: 'Edit',
            name: 'Chỉnh sửa',
            icon: 'edit',
            handleFunction: handleEdit,
        },
        {
            key: 'Delete',
            name: 'Xóa',
            icon: 'delete',
        },
    ];

    return { loaded } ? (
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
                                                <div className="absolute left-3/4 ml-32 mt-4">
                                                    Trọng số {item.group_weight}
                                                </div>
                                                <FormDialog
                                                    open={open}
                                                    onClose={() => setOpen(false)}
                                                    onSubmit={handleFormSubmit}
                                                    title="Chỉnh sửa nhóm bài tập"
                                                    fields={[
                                                        {
                                                            label: 'Tên',
                                                            name: 'name',
                                                            type: 'text',
                                                            value: item.name,
                                                            required: true,
                                                        },
                                                        {
                                                            label: 'Trọng số',
                                                            name: 'weight',
                                                            type: 'int',
                                                            value: item.group_weight,
                                                            required: true,
                                                        },
                                                    ]}
                                                />
                                                {(options[1].handleFunction = () => handleDelete(item.id))}
                                                <div className="absolute right-6 mt-2">
                                                    <ActionMenu options={options} />
                                                </div>
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
                                                {visibleItems.includes(item) && (
                                                    <AssignmentList courseId={courseId} data={item.assignments} />
                                                )}
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
    ) : (
        <div>Loading...</div>
    );
};
export default Group;
