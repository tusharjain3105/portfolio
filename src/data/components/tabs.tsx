import { NavLink } from "react-router-dom"
import styled from "styled-components"
import If from "./ifelse"


const TabsWrapper = styled.div`
    width: 100%;
    padding: 0.5rem 0.5rem 0 0.5rem;
    display: flex;
    .active>*{
        --radius : ${props => props.theme.radius};
        border: 2px solid ${props => props.theme.colors.border};
        border-bottom: none;
        border-radius: var(--radius) var(--radius) 0 0;
        font-weight: bold;
    }
`

const Tab = styled.div`
    min-width: 5rem;
    width: max-content;
    text-align: center;
    padding: 0.5rem;
    border-bottom: 2px solid ${props => props.theme.colors.border};
    cursor: pointer;
    &.blank{
        width: 100%;
        cursor: unset;
    }
`

const Tabs = ({ align = 'left', items = [], selected = 0, onChange = (value: number) => { } }) => {

    return (
        <TabsWrapper>
            <If condition={align === 'right' || align === 'center'} onPass={<Tab className="blank" />} />
            {items.map(
                (item, index) =>
                    <NavLink to={item.to} key={item.title}>
                        <Tab >{item.title}</Tab>
                    </NavLink>
            )}
            <If condition={align === 'left' || align === 'center'} onPass={<Tab className="blank" />} />
            <NavLink to='add-new-project'>
                <Tab >Add new project</Tab>
            </NavLink>

        </TabsWrapper >
    )
}


export default Tabs