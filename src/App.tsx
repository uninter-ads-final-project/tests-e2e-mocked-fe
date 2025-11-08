import {Outlet, Route, Routes} from "react-router";
import {LoginRoutes} from "./pages/login/routes.tsx";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<LoginRoutes />}/>

            <Route path="paciente" element={ <Outlet/>}>
                <Route index element={<h1>Paciente</h1>}/>
                <Route path="consultas" element={<h1>Paciente consultas</h1>}/>
                <Route path="pronturarios" element={<h1>Paciente prontuários</h1>}/>
            </Route>

            <Route path="profissionail"  element={ <Outlet/>}>
                <Route index element={<h1>Profissional</h1>}/>
                <Route path="consultas" element={<h1>Profissional consultas</h1>} />
                <Route path="pronturarios" element={<h1>Profissional prontuários</h1>} />
            </Route>

            <Route path="administrador" element={ <Outlet/>}>
                <Route index element={<h1>Administrador</h1>}/>
                <Route path="consultas" element={<h1>Administrador consultas</h1>} />
                <Route path="pronturarios" element={<h1>Administrador prontuários</h1>} />
            </Route>
        </Routes>
    )
}

export default App
