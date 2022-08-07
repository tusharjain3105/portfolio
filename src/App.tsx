import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProjectAdditionForm, ProjectSection } from "./data/components/projects"
import Theme from "./data/components/theme"
import Todo from "./data/components/todo"
import Main from "./data/Main"
import Provider from "./data/services/provider"

const App = () => {
  return (
    <Provider>
    <BrowserRouter>
    <Theme>
      <Routes>
        <Route path='*' element={<Main/>}>
          <Route path="projects/*" element={<ProjectSection/>}>
            <Route path="add-new-project" element={<ProjectAdditionForm/>}></Route>
          </Route>
          <Route path="todo" element={<Todo/>}></Route>
        </Route>
      </Routes>
    </Theme>
    </BrowserRouter>
    </Provider>
  )
}

export default App