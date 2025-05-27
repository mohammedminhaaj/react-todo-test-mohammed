import React, { useEffect, useMemo, useState } from "react";

export function ClunkyTodoList() {
  // State to manage tasks, initially with some sample tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  // State to manage the new task input
  const [newTask, setNewTask] = useState("");

  // State to manage the filter for tasks
  const [filter, setFilter] = useState("all");

  // Fuction to handle input change for the new task
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  // Function to handle adding a new task
  // It checks if the new task is not empty, then adds it to the tasks array
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const tempTasks = [...tasks];
      tempTasks.push({ id: Date.now(), text: newTask, completed: false });
      setTasks(tempTasks);
      setNewTask("");
    }
  };

  // Function to toggle the completion status of a task
  // It updates the task's completed status based on its current state
  // It creates a new task object to avoid mutating the state directly
  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        let tempTask = { id: task.id, text: task.text, completed: task.completed };
        tempTask.completed = !tempTask.completed;
        return tempTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // State to manage the tasks to render based on the filter
  const [tasksToRender, setTasksToRender] = useState<any[]>([])

  // Effect to filter tasks based on the selected filter
  // It updates the tasksToRender state whenever the tasks or filter changes
  useEffect(() => {
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }
    setTasksToRender(filteredTasks);
  }, [tasks]);

  // Memoized value to calculate the total count of tasks
  const totalCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  return (
    <div>
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add new task"
      />
      <button onClick={handleAddTask}>Add</button>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ul>
        {tasksToRender.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
