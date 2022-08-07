import { createContext, useState } from "react";

export const TodoContext = createContext(null);

const storage = {
    allowedStatusList : {
        get : () => JSON.parse(localStorage.getItem('allowed_status_list')) || [],
        set : (list) => localStorage.setItem('allowed_status_list', JSON.stringify(list)),
    },
    taskList : {
        get : () => JSON.parse(localStorage.getItem('task-list')) || [],
        set : (list) => localStorage.setItem('task-list', JSON.stringify(list)),
    }
}

const TodoProvider = ({ children }) => {

    const [taskList, setTaskList] = useState(storage.taskList.get())
    const [selected, setSelected] = useState([])
    const [allowedStatusList, setAllowedStatusList] = useState(storage.allowedStatusList.get())

    const value = {
        getList: (allowedStatus) => taskList.filter(task => allowedStatus.includes(task.status)),
        addTask: () => {
            let task = {
                title: '',
                status: TodoStatus.needToStart,
                createdAt: new Date().toDateString(),
                changedAt: new Date().toDateString(),
                remarks: '',
                id: Math.random()
            }
            setTaskList([task, ...taskList])
            storage.taskList.set(taskList)
        },
        saveTaskList : () => storage.taskList.set(taskList),
        getClassNameFromStatus: (status: string) => {
            return status.replaceAll(' ', '-').toLowerCase()
        },
        getStatusFromClassName: (className: string) => {
            switch (className) {
                case 'need-to-start': return TodoStatus.needToStart
                case 'in-progress': return TodoStatus.inProgress
                case 'completed': return TodoStatus.completed
            }
        },
        getStatusList: () => [TodoStatus.needToStart, TodoStatus.inProgress, TodoStatus.completed],
        getAllowedStatusList : () => allowedStatusList,
        setAllowedStatusList : (list : string[]) => {
            if(!list.length) list = [TodoStatus.needToStart, TodoStatus.inProgress, TodoStatus.completed];
            setAllowedStatusList(list)
            storage.allowedStatusList.set(list)
        },
        getSelectedTask: () => selected,
        anySelected: () => {
            for (let value of Object.values(selected)) if (value) return true;
            return false;
        },
        changeSelected: (title: string, value: boolean) => {
            if (selected[title] !== value)
                selected[title] = value
            setSelected({ ...selected })
        },
        changeStatus: (activeStatus, status) => {
            setTaskList([
                ...taskList.map(task => {
                    if (activeStatus.includes(task.status), selected[task.title]) {
                        task.status = status;
                    }
                    return task
                })
            ])

        }
    }


    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider

export const TodoStatus = {
    needToStart: 'Need to Start',
    inProgress: 'In Progress',
    completed: 'Completed',
}
