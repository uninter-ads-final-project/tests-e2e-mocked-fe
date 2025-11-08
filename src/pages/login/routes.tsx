import {useRoutes} from "react-router";
import {LoginPage} from "./index.tsx";

export const LoginRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <LoginPage />,
            index: true
        },
        {
            path: "/login",
            element: <h1>Login page</h1>,
        },
        {
            path: "logout",
            element: <h1>Logout page</h1>
        },
    ]);
}
