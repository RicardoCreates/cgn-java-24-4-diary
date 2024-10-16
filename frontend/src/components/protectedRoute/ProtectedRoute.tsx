import {Navigate, Outlet} from "react-router-dom";

type ProtectedRouteProps = {
    username:string
}
export default function ProtectedRoute(props:Readonly<ProtectedRouteProps>){

    const isUserLoggedIn = props.username !== "anonymousUser" || !props.username

    return(
        isUserLoggedIn ? <Outlet/> : <Navigate to={"/"}/>
    )
}