import {Outlet, Route, Routes} from "react-router";
import {LoginRoutes} from "./pages/login/routes.tsx";
import {DashboardRoutes} from "./pages/dashboard/routes.tsx";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<LoginRoutes />}/>
            <Route path="paciente/*" element={<DashboardRoutes />}/>
            <Route path="profissional/*" element={<DashboardRoutes />}/>
            <Route path="administrador/*" element={<DashboardRoutes />}/>

        </Routes>
    )
}

export default App
