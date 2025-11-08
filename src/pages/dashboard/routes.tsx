import {useRoutes} from "react-router";
import {Dashboard} from "./index.tsx";

export const DashboardRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Dashboard isStaff={true} />,
            index: true
        },
        {
            path: "/consultas",
            element: <h1>Paciente Consultas</h1>,
        },
        {
            path: "pronturarios",
            element: <h1>Paciente Prontuários</h1>
        },
    ]);
}
