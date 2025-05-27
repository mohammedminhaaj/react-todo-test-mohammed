import { Task } from './types';

type TaskItemProps = {
	task: Task;
	handleToggleComplete: (id: number) => void;
	removeTask: (id: number) => void;
};
const TaskItem: React.FC<TaskItemProps> = ({
	task,
	handleToggleComplete,
	removeTask,
}) => (
	<li key={task.id}>
		<input
			type='checkbox'
			checked={task.completed}
			onChange={() => handleToggleComplete(task.id)}
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
				removeTask(task.id);
			}}>
			[x]
		</a>
	</li>
);

export default TaskItem;
