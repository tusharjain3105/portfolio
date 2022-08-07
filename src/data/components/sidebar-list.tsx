import {  NavLink } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { SpacerY, Buttons, If } from "./components"

const ListWrapper = styled.div`
    border-radius: ${props => props.theme.radius};
    width: 20rem;
    height: 32rem;
    display:flex;
    flex-direction: column;
    background: ${props => props.theme.colors.background};
    
    .active{
      border-right: 2px solid ${props => props.theme.colors.border};
    }
`


const List = () => {
  const items = [
    {
      to: 'projects',
      title: 'Projects',
    },
    {
      to: 'experiance',
      title: 'Work Experiance',
    },
    {
      to: 'skills',
      title: 'Skills',
    },
    {
      to: 'progress',
      title: 'Progress',
    },
    {
      to: 'todo',
      title: 'To Do',
    },
    {
      to: 'blog',
      title: 'Blogs',
    },
  ]
  return (
    <ListWrapper>
      {
        items.map((value, index) =>
          <NavLink key={value.title} to={value.to}>
            <ListItem>
              {value.title}
            </ListItem>
          </NavLink>
        )
      }
      <SpacerY />
      <ListItem>
        <ThemeSwitcher />
      </ListItem>
    </ListWrapper>
  )
}

const ListItem = styled.div`
    padding: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    &:hover{
      background: ${props => props.theme.colors.backgroundDark};
      color: ${props => props.theme.colors.reverseText};
      cursor: pointer;
    }
`

const ThemeSwitcher = () => {
  const theme = useTheme();

  return <Buttons.elevated onClick={() => theme.switch()} >
    <If condition={theme.name === 'dark'} onPass='Light Mode' onFail='Dark Mode' />
  </Buttons.elevated>
}


export default List