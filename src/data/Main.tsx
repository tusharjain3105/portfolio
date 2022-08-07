import { Outlet } from "react-router-dom";
import List from "./components/sidebar-list";
import Navbar from "./components/navbar";

const Main = () => {


    return <>
        <Navbar />
        <main style={{ padding: '1rem', display: 'flex' }}>
            <List />
            <div className="right" style={{ width: '100%' }}>
                <Outlet/>
            </div>
        </main>
    </>
}

export default Main
