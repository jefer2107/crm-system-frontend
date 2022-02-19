import { BrowserRouter,Route,Routes } from "react-router-dom";
import EditClientList from "./edits/editClientList";
import EditProjectList from "./edits/editProjectList";
import Header from "./header";
import Home from "./home";
import ClientList from "./lists/clientList";
import ProjectList from "./lists/projectList";


export default function RoutesController(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/client-list" element={<ClientList />} />
                <Route exact path="/edit-client/:id" element={<EditClientList />} />
                <Route exact path="/project-list" element={<ProjectList />} />
                <Route exact path="/edit-project/:id" element={<EditProjectList />} />
            </Routes>
        </BrowserRouter>
    )
}