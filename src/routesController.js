import { BrowserRouter,Route,Routes } from "react-router-dom";
import EditClientList from "./edits/editClientList";
import Header from "./header";
import Home from "./home";
import ClientList from "./lists/clientList";


export default function RoutesController(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/client-list" element={<ClientList />} />
                <Route exact path="/edit-client/:id" element={<EditClientList />} />
            </Routes>
        </BrowserRouter>
    )
}