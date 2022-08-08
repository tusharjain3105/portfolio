import TodoProvider from "./todo"

const Provider = ({children}) => {
  return (
    <TodoProvider>
        {children}
    </TodoProvider>
  )
}

export default Provider