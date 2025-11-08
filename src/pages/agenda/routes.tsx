import {useRoutes} from "react-router";
import {Agenda} from "./index.tsx";
import {AddAppointment} from "./newAppointment.tsx";
import {ManageAgenda} from "./manageAgenda.tsx";

export const AgendaRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Agenda />,
            index: true
        },
        {
            path: "/nova-consulta",
            element: <AddAppointment />,
        },
        {
            path: "/gerenciar-agenda",
            element: <ManageAgenda />
        },
    ]);
}
