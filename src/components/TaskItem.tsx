import { Task } from '../types';

type TaskItemProps = {
	task: Task;
	onToggleComplete: (id: number) => void;
	onRemove: (id: number) => void;
};
const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onToggleComplete,
	onRemove,
}) => (
	<li key={task.id}>
		<input
			type='checkbox'
			checked={task.completed}
			onChange={() => onToggleComplete(task.id)}
		/>
		<span
			style={{
				textDecoration: task.completed ? 'line-through' : 'none',
			}}>
			{task.text}
		</span>
		{/* Anchors are primarily used for navigation. Buttons should be used instead of anchors */}
		<a
			href='#'
			title='Remove task'
			style={{
				marginLeft: '10px',
			}}
			onClick={(event) => {
				event.preventDefault();
				onRemove(task.id);
			}}>
			[x]
		</a>
	</li>
);

export default TaskItem;
