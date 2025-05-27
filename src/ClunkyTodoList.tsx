import { useEffect, useMemo, useState } from 'react';
import TaskItem from './TaskItem';
import { Task } from './types';
import { Filter } from './enums';

export function ClunkyTodoList() {
	// State to manage tasks, initially with some sample tasks
	const [tasks, setTasks] = useState<Task[]>([
		{ id: 1, text: 'Learn React', completed: false },
		{ id: 2, text: 'Write code', completed: true },
		{ id: 3, text: 'Eat lunch', completed: false },
	]);

	// State to manage the new task input
	const [newTask, setNewTask] = useState('');

	// State to manage the filter for tasks
	const [filter, setFilter] = useState<Filter>(Filter.All);

	// Fuction to handle input change for the new task
	const handleInputChange = (event) => {
		setNewTask(event.target.value);
	};

	// Function to handle adding a new task
	// It checks if the new task is not empty, then adds it to the tasks array
	const handleAddTask = () => {
		if (newTask.trim() !== '') {
			// Removing the use of temporary variable and directly updating the state by spreading the previous tasks
			setTasks((prev) => [
				...prev,
				{ id: Date.now(), text: newTask, completed: false },
			]);
			setNewTask('');
		}
	};

	// Function to toggle the completion status of a task
	// It updates the task's completed status based on its current state
	const handleToggleComplete = (id: number) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	// State to filter tasks which contain two or more words
	const [filterByMultiWord, setFilterByMultiWord] = useState<boolean>(false);

	// Memoized value to filter tasks based on the selected filter
	// Removing unnecessary use of useEffect for filtering
	const filteredTasks = useMemo(() => {
		let filtered = tasks;
		if (filter === Filter.Completed) {
			filtered = filtered.filter((task) => task.completed);
		} else if (filter === Filter.Active) {
			filtered = filtered.filter((task) => !task.completed);
		}
		if (filterByMultiWord) {
			filtered = filtered.filter(
				(task) => task.text.trim().split(/\s+/).length >= 2
			);
		}
		return filtered;
	}, [tasks, filter, filterByMultiWord]);

	// Memoized value to calculate the total count of tasks
	const totalCount = useMemo(() => {
		return tasks.length;
	}, [tasks]);

	// Function to remove a task by its ID
	const handleRemoveTask = (id: number) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	// Function to remove all completed tasks
	const handleRemoveAllCompletedTasks = () => {
		setTasks(tasks.filter((task) => !task.completed));
	};

	// Function to toggle the filter for tasks with two or more words
	const handleFilterByMultiWord = () => {
		setFilterByMultiWord((prev) => !prev);
	};

	return (
		<div>
			<h1>To-Do List</h1>
			<h2>Items: {totalCount}</h2>
			<input
				type='text'
				value={newTask}
				onChange={handleInputChange}
				placeholder='Add new task'
			/>
			<button onClick={handleAddTask}>Add</button>
			<button onClick={handleRemoveAllCompletedTasks}>
				Remove Completed
			</button>
			<div>
				<button onClick={() => setFilter(Filter.All)}>All</button>
				<button onClick={() => setFilter(Filter.Active)}>Active</button>
				<button onClick={() => setFilter(Filter.Completed)}>
					Completed
				</button>
				<button onClick={handleFilterByMultiWord}>
					{filterByMultiWord ? 'Show All' : 'Filter by Multi-Word'}
				</button>
			</div>
			<ul>
				{filteredTasks.map((task) => (
					<TaskItem
						key={task.id}
						onToggleComplete={handleToggleComplete}
						onRemove={handleRemoveTask}
						task={task}
					/>
				))}
			</ul>
		</div>
	);
}
