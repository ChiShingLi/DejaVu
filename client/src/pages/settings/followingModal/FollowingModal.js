import React from 'react'
import { Modal } from '@mantine/core';
import { useSelector } from 'react-redux';
import UserTile from '../userTile/UserTile';
import "./FollowingModal.css"

const FollowingModal = ({ followingModalOpened, setFollowingModalOpened }) => {
    const userDetails = useSelector((state) => state.user);
    return (
        <Modal
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={followingModalOpened}
            onClose={() => setFollowingModalOpened(false)}
        >
            <div className="followingModal">
                <div className="followingModal-title">
                    My Followings
                </div>
                {userDetails.following.length === 0 ? <div className="followingModal-emptyText">You're following no one...</div> : <div className="followingModal-grid">
                    {userDetails.following.map(following => {
                        return (
                            <UserTile userId={following} />
                        )
                    })}
                </div>
                }
            </div>
        </Modal>
    )
}

export default FollowingModal