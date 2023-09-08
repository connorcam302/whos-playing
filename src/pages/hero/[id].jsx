import { Box, Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const HeroPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState()

    useEffect(() => {
        setVideo(`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${router.query.id}.webm`)
    }, [router.query.id])

    return (
        <Center w={300}>
            <HeroVideo key={video} video={video} />
        </Center>
    );
};

const HeroVideo = (props) => {
    const handleVideoError = (e) => {
        console.error("Video error:", e);
    };

    if (props.video === undefined) {
        return (
            <Spinner size='xl' />
        )
    } else {
        return (
            <video autoPlay muted loop playsInline onError={handleVideoError}>
                <source type="video/webm" src={props.video} />
                Your browser does not support the video tag.
            </video>
        )
    }
}

export default HeroPage;
