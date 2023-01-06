import React, { useEffect } from 'react'
import { Modal } from '@mantine/core';
import { useSelector } from 'react-redux';
import UserTile from '../userTile/UserTile';

import "./FollowerModal.css";
const FollowerModal = ({ followerModalOpened, setFollowerModalOpened }) => {
    const userDetails = useSelector((state) => state.user);

    return (
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={followerModalOpened}
            onClose={() => setFollowerModalOpened(false)}
        >
            <div className="followerModal">
                <div className="followerModal-title">
                    My Followers
                </div>
                {userDetails.followers.length === 0 ?
                    <div className="followingModal-emptyText">Feels empty here...</div> :
                    <div className="followerModal-grid">
                        {userDetails.followers.map(follower => {
                            return (
                                <UserTile userId={follower} />
                            )
                        })}
                    </div>
                }
            </div>
        </Modal>
    )
}

export default FollowerModal