import React from 'react'
import FollowerPanel from '../followerPanel/FollowerPanel'
import UserCard from '../userCard/UserCard'

import "./LeftSection.css"
const LeftSection = () => {
    return (
        <div className="leftSection">
            <UserCard />
            <FollowerPanel />
        </div>
    )
}

export default LeftSection