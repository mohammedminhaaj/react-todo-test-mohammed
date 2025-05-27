import { Task } from './types';

type TaskItemProps = {
	task: Task;
    handleToggleComplete: (id: string) => void;
    removeTask: (id: string) => void;
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
		<a
			href='#'
			title='Remove task'
			style={{
				marginLeft: '10px',
				cursor: 'pointer',
				textDecoration: 'none',
				color: 'red',
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
