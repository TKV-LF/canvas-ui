import React, { useState, } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Assignment } from '~/pages/Course/Assignments';


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
  padding: 15px 15px;
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
  /* background: ${({ isDragging }) =>
		isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white'}; */

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
const Group = ({ data }) => {
	const [items, setItems] = useState(data);
	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		let orderItems = reorder(
			items,
			result.source.index,
			result.destination.index
		);


		setItems(orderItems);
	}
	return (
		<DragDropContext
			onDragEnd={onDragEnd}
		>
			<Container>
				<ColumnStyles>

					<Droppable droppableId='droppable'>
						{(provided, snapshot) => (
							<List
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{items.map((item, index) => (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className='border-x border-t mb-5'
											>
												<AssignmentGroup>{item.name}</AssignmentGroup>
												<Assignment data={item.assignments} />
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
	)
}

export default Group;
