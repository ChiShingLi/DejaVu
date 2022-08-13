import { Navigate } from "react-router-dom";
import axios from "axios";

// const checkValid = async () => {
//     //get with bearer token header
//     const status = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/auth/isValidAuth`, {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     })
//     return status.data;
// }

export const RequireAuthContext = ({ children }) => {
    //check if user have token/logged in
    if (localStorage.getItem("token") !== null) {
        //verify token is valid
        //const auth = checkValid();

        //if successful, redirect to child page
        // if (auth) {
        //     return children
        // } else {
        //     //redirect to main
        //     return <Navigate to='/' />
        // }
        return children;
    }

    //else, return to main
    return <Navigate to='/' />
}