import React, { useEffect, useState } from 'react'
import { API_getUserFeedDetails } from "../../../apis/UserRequest";
import { useNavigate } from "react-router-dom";

import "./UserTile.css"
const UserTile = ({ userId }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userTileObj, setUseTileObj] = useState();
    useEffect(() => {
        getIndividualUser(userId);
    }, [])

    //fetch user's details
    const getIndividualUser = async (userId) => {
        const userObj = await API_getUserFeedDetails(userId);
        if (userObj.status) {
            setUseTileObj(userObj.userDetails);
            setLoading(false);
        }
    }

    return (
        //return user if found
        (loading === true) ? <></> :
            <div className="profile-tile" onClick={() => navigate(`/profile/${userTileObj.username}`)}>
                <div className="profilePhoto followerProfilePhoto">
                    {userTileObj.profilePhoto !== null ? <img src={userTileObj.profilePhoto} alt="Profile" /> : <img src="/images/noProfilePhoto.jpg" alt="Profile" />}
                </div>
                <div className="profile-name">
                    {userTileObj.fullName}
                </div>
            </div>
    )
}

export default UserTile