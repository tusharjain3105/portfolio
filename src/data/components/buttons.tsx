import styled from "styled-components"

const ElevatedButton = styled.button<any>`
cursor: pointer;   
padding: 0.5rem 1rem;
background : ${props => props.color || props.theme.colors.btn};
border-radius: ${props => props.theme.radius};
color: white;
outline: none;
border:none;
box-shadow: 0 0 1rem grey;
&:active{
    box-shadow:none;
}
&:hover{
    background: transparent;
}
font-weight: bold;
text-align: ${props => props.align};
/* text-transform:  */
`

const OutlineButton = styled(ElevatedButton)`
background: transparent;
border: 2px solid ${props => props.theme.colors.border};
color: ${props => props.color || props.theme.colors.outlineBtnText};
&:hover{
    background: ${props => props.color || props.theme.colors.outlineBtnText};
    color:white;
}
`

const TextButton = styled(OutlineButton)`
border-color: transparent;
box-shadow: none;
&:hover{
    color: ${props => props.color || props.theme.colors.outlineBtnText};
    background: unset;
    border-bottom: 2px solid ${props =>  props.color || props.theme.colors.border};
}
`

export const Buttons = {
elevated: ElevatedButton,
outline: OutlineButton,
text: TextButton,
}

export default Buttons