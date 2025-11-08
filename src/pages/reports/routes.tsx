import {useRoutes} from "react-router";
import {Resports} from "./index.tsx";

export const ReportsRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Resports />,
            index: true
        },
        // {
        //     path: "/nova-consulta",
        //     element: <AddAppointment />,
        // },
        // {
        //     path: "/gerenciar-agenda",
        //     element: <ManageAgenda />
        // },
    ]);
}
