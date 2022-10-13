import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Group } from '@mantine/core';
import { API_getSingleFeed } from '../../../apis/FeedRequest';
import ProfileFeedModal from '../profileFeedModal/ProfileFeedModal';

import "./ProfileFeedCard.css"
const ProfileFeedCard = ({ feedId, profileUserObj }) => {
    const [feedObj, setFeedObj] = useState({});
    const [modalOpened, setModalOpened] = useState(false);

    const getSingleFeed = async () => {
        const result = await API_getSingleFeed(feedId);
        if (result.status) {
            setFeedObj(result.feedObj);
        }
    }
    useEffect(() => {
        getSingleFeed(feedId);
    }, [])

    return (
        <Card id="profileFeed-card" shadow="sm" radius="md" withBorder>
            <ProfileFeedModal feedData={feedObj} profileUserData={profileUserObj} modalOpened={modalOpened} setModalOpened={setModalOpened} />
            <Card.Section onClick={() => setModalOpened(true)}>
                {feedObj.photo !== "" ?
                    <Image
                        src={feedObj.photo}
                        height={350}
                    />
                    : <></>}
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <div className="profileFeed-description">
                    <Text weight={500}>{feedObj.desc}</Text>
                </div>
            </Group>
        </Card>
    );
}

export default ProfileFeedCard