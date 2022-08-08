import { useContext, useEffect, useState } from "react"
import { MdAdd, MdEdit, } from "react-icons/md"
import styled from "styled-components"
import { TodoContext } from "../services/todo"
import Buttons from "./buttons"
import Expandable from "./expandable"
import If from "./ifelse"

const TodoSection = () => {
    return <TodoSectionWrapper>
        <Todo />
    </TodoSectionWrapper>
}

const TodoSectionWrapper = styled.div`
    margin-left: 0.5rem;
    display: flex;
    >*{
        flex: 1;
    }
    .checkbox-list{
        font-size: small;
        margin-bottom: 0.5rem;
        display: flex;
        &>*{
            margin-right: 2rem;
        }
    }
    .task-list{
        .task{
            max-width: unset;
            margin-bottom: 0.5rem;
            border: #bbb9b9;
            background: #dddcdc;
            border-radius: ${props => props.theme.radius};
            .header, .footer{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                input[type=text]{
                    padding: 0.25rem;
                    min-width: 20rem;
                    max-width: fit-content;
                }
                input[type=text],textarea{
                    border-radius: ${props => props.theme.radius};
                    border: 1px;
                }
            }
            .title{
                font-weight: bold;
            }
            .date{
                font-size: small;
                color: #807d7d;
                margin-right: 1rem;
            }
            &.in-progress{
                background: #ccddae;
            }
            &.completed{
                background: #aeddae;
            }
            .footer{
                margin-top: 0.5rem;
            }
            .body{
                position: relative;
                .edit-button{
                    position: absolute;
                    bottom: 0.5rem;
                    right: 0.5rem;
                    font-size: 20px;

                }
            }
        }
    }
`

const Todo = () => {

    const todoContext = useContext(TodoContext)
    const [items, setItems] = useState([])
    let statusList = todoContext.getStatusList()
    const allowedStatusList = todoContext.getAllowedStatusList()
    const [selected, setSelected] = useState({})

    useEffect(() => {
        statusList = todoContext.getStatusList()
        setItems(todoContext.getList(allowedStatusList))
        setSelected(todoContext.getSelectedTask())
    }, [todoContext, allowedStatusList])

    const addNewTask = () => {
        let ele : HTMLInputElement = document.querySelector('.checkbox-list [name=need-to-start]')
        if(ele && !ele.checked) ele.click()
        todoContext.addTask()
    }

    const changeFilter = (e) => {
        let allowed = []
        if (e.target.nodeName === 'INPUT') {
            for (let ele of e.currentTarget.querySelectorAll('.checkbox')) {
                if (ele.querySelector('[type=checkbox]').checked)
                    allowed.push(ele.querySelector('label').innerText)
            }
        }
        if (allowed !== allowedStatusList) todoContext.setAllowedStatusList(allowed)
    }

    const selectTask = (e) => {
        if (e.target.getAttribute('type') === 'checkbox') {
            let title = e.target.parentNode.innerText
            let value = e.target.checked
            todoContext.changeSelected(title, value)
        }
    }

    const changeStatus = (e) => {
        if (e.target.nodeName === 'BUTTON')
            todoContext.changeStatus(allowedStatusList, e.target.innerText)
    }

    return (
        <TodoWrapper>
            <div className="header">
                <div className="checkbox-list" onClick={changeFilter}>
                    {
                        statusList.map(value => {
                            let id = todoContext.getClassNameFromStatus(value)
                            return <div key={id} className="checkbox">
                                <input type="checkbox" name={id} id={id} defaultChecked={allowedStatusList.includes(value)} />
                                <label htmlFor={id}>{value}</label>
                            </div>
                        }
                        )
                    }
                </div>
                <MdAdd onClick={addNewTask} />
            </div>
            <div className="task-list" onClick={selectTask}>
                {items.map(
                    item => <TaskListItem key={item.id} item={item} defaultChecked={selected[item.title]} />
                )}
            </div>
            <ActionBar onClick={changeStatus} />
        </TodoWrapper>
    )
}

const ActionBar = ({ onClick = (e) => { } }) => {
    const [anySelected, setAnySelected] = useState(false);
    const todoContext = useContext(TodoContext)

    useEffect(() => {
        setAnySelected(todoContext.anySelected())
    }, [todoContext])


    return <If condition={anySelected} onPass={
        <div className="footer" onClick={onClick}>
            <Buttons.text>Need to Start</Buttons.text>
            <Buttons.text>In Progress</Buttons.text>
            <Buttons.text>Completed</Buttons.text>
        </div>
    } />
}


const TaskListItem = ({ item, defaultChecked }) => {
    const todoContext = useContext(TodoContext)
    const [title, setTitle] = useState(item.title)
    const [remarks, setRemarks] = useState(item.remarks)
    const [editable, setEditable] = useState(!item['title'].length)
    const [active, setActive] = useState(!title.length)

    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            item[e.target.name] = e.target.value
            item.changedAt = new Date('08/08/2022').toDateString()
            if (e.target.name === 'remarks') {
                setTitle(item['title'])
                setRemarks(item['remarks'])
                if (item['title'] && item['remarks']) setEditable(false)
                todoContext.saveTaskList()
            }
        }
    }

    return <Expandable className={`task ${todoContext.getClassNameFromStatus(item.status)}`}
        active={active} onClick={() => setActive(!active)}
        title={
            <If condition={editable} onPass={
                <input type="text" placeholder="Title of the task..." name="title" onKeyDown={onKeyDown} autoFocus defaultValue={title} />
            }
                onFail={
                    <span>
                        <input type='checkbox' id={title} defaultChecked={defaultChecked} />
                        <label htmlFor={title}>{title}</label>
                    </span>
                } />
        }>
        <div className="remarks" onClick={() => setEditable(true)}>
            <If condition={editable} onFail={remarks}
                onPass={
                    <textarea placeholder="Write the remarks..." name="remarks" onKeyDown={onKeyDown} defaultValue={remarks} />
                } />
        </div>
        <div className="footer">
            <div className="date">
                Created At : {item.createdAt}
            </div>
            <div className="date">
                Changed At : {item.changedAt}
            </div>
        </div>
        <If condition={!editable && active} onPass={
            <MdEdit onClick={() => setEditable(true)} className='edit-button' />
        } />
    </Expandable>
}

const TodoWrapper = styled.div`
    .header{
        display: flex;
        justify-content : space-between;
    }
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.radius};
    padding: 0.5rem;
    height: 32rem;
    display: flex; 
    flex-direction: column;
    .task-list{
        height: 100%;
        overflow: auto;
    }
    .footer{
        align-self: flex-end;
        max-width: fit-content;
    }
    input[text], textarea{
        border-radius: ${props => props.theme.radius};
        margin-bottom: 0.5rem;
        width: 100%;
        padding: 0.5rem;
    }
`

export default TodoSection