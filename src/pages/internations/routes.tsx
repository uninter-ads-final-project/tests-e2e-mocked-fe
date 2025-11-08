import {useRoutes} from "react-router";
import {Internations} from "./index.tsx";

export const InternationRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Internations />,
            index: true
        },
    ]);
}
