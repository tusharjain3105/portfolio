import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import Buttons from "./buttons"
import Tabs from "./tabs"

export const ProjectSection = () => {
    const [selected, setSelected] = useState(0)

    const items = [
        {
            to: 'live',
            title: 'Live',
        },
        {
            to: 'in-progress',
            title: 'In Progress',
        },
        {
            to: 'need-to-start',
            title: 'Need to Start',
        }
    ]
    return <>
        <Tabs onChange={setSelected} items={items} selected={selected} />
        <Outlet />
    </>
}

const ProjectAdditionFormWrapper = styled.form`
padding: 0.5rem;
    input, textarea{
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        width: 100%;
        border-radius : ${props => props.theme.radius};
        resize: none;
    }
    .row{
        display: flex;
        >*:not(:first-child){
            margin-left: 0.5rem;
        }
    }
    [type=submit]{
        float: right;
    }
`

export const ProjectAdditionForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return <ProjectAdditionFormWrapper>
        <div className="row">
            <Dropdown />
            <input type="text" placeholder="Title" />
        </div>
        <textarea placeholder="Description" rows={20}></textarea>
        <Buttons.outline type="submit" onClick={onSubmit}>Submit</Buttons.outline>
    </ProjectAdditionFormWrapper>
}


const DropdownWrapper = styled.div` 
    width: 20rem;
    position: relative;
    .options{
        background: white;
        position: absolute;
        border-radius: ${props => props.theme.radius};
        width: 100%;
        border: 1px solid ${props => props.theme.colors.borderLight};
        max-height: 10rem;
        overflow: auto;
        li{
            list-style: none;
            padding: 0.25rem;
            &:hover{
                background: ${props => props.theme.colors.background};
                cursor: pointer;
            }
        }
    }
    &:not(:hover) input:not(:focus){
        & ~ .options{
            display: none;
        }
    }
`

const Dropdown = () => {
    const options = ["Arun", 'Anand', 'Priya', 'Prince', 'Priyanka', 'Meena', 'Meenakshi', 'Shikha', 'Shikhawati', 'Gauri', 'Gaurav'];
    const [input, setInput] = useState('')
    const [filtered, setFiltered] = useState(options)

    useEffect(() => {
        setFiltered(options.filter(option => option.startsWith(input)))
    }, [input])


    const onChange = (e) => {
        setInput(e.target.value)
    }

    const onSelectOption = (e) => {
        setInput(e.target.innerText)
    }

    return <DropdownWrapper>
        <input type="text" placeholder="Select a Category" value={input} onChange={onChange} />
        <div className="options">
            {filtered.map(option =>
                <li key={option} className="option" onClick={onSelectOption}>{option}</li>
            )}
        </div>
    </DropdownWrapper>
}