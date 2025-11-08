import {useRoutes} from "react-router";
import {LoginPage} from "./index.tsx";
import {RegisterAccount} from "./registerAccount.tsx";

export const LoginRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <LoginPage />,
            index: true
        },
        {
            path: "/nova-conta",
            element: <RegisterAccount />,
        },
        {
            path: "logout",
            element: <h1>Logout page</h1>
        },
    ]);
}
