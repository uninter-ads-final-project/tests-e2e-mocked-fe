import {Outlet, Route, Routes} from "react-router";
import {LoginRoutes} from "./pages/login/routes.tsx";
import {DashboardRoutes} from "./pages/dashboard/routes.tsx";
import {AgendaRoutes} from "./pages/agenda/routes.tsx";
import {ReportsRoutes} from "./pages/reports/routes.tsx";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<LoginRoutes />}/>
            <Route path="paciente/*" element={<DashboardRoutes />}/>
            <Route path="profissional/*" element={<DashboardRoutes />}/>
            <Route path="administrador/*" element={<DashboardRoutes />}/>
            <Route path="agenda/*" element={<AgendaRoutes />}/>
            <Route path="relatorios/*" element={<ReportsRoutes />}/>

        </Routes>
    )
}

export default App
