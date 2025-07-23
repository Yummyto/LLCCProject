// src/components/Hero.jsx

import { useRef, useState } from 'react';
import Button from './Button.jsx';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from './Navbar.jsx';

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;

    const nextVideoRef = useRef(null);

    const handleVideoLoaded = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    const getVideoSrc = (index) => `${import.meta.env.BASE_URL}videos/hero-${index}.mp4`;

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    };

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power2.inOut',
                onStart: () => nextVideoRef.current?.play(),
            });

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power2.inOut',
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            <Navbar />

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                {/* Mini preview circle */}
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div
                        onClick={handleMiniVideoClick}
                        className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                    >
                        <video
                            src={getVideoSrc(upcomingVideoIndex)}
                            loop
                            muted
                            autoPlay
                            className="size-64 origin-center scale-150 object-cover object-center"
                            onLoadedData={handleVideoLoaded}
                        />
                    </div>
                </div>

                {/* Next video that expands */}
                <video
                    ref={nextVideoRef}
                    src={getVideoSrc(upcomingVideoIndex)}
                    loop
                    muted
                    id="next-video"
                    className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                    onLoadedData={handleVideoLoaded}
                />

                {/* Main background video */}
                <video
                    src={getVideoSrc(currentIndex)}
                    autoPlay
                    loop
                    muted
                    id="current-video"
                    className="absolute left-0 top-0 size-full object-cover object-center"
                    onLoadedData={handleVideoLoaded}
                />

                {/* Headings */}
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
                    E<b>d</b>ucation
                </h1>

                <div className="absolute left-0 z-40 w-full h-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            quali<b>t</b>y
                        </h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Join and unleash your full potential.<br />Be part of our growing family
                        </p>

                        <Button
                            id="watch-trailer"
                            title="Enroll Now!"
                            leftIcon={<TiLocationArrow />}
                            containerClass="!bg-yellow-300 flex-center gap-1"
                            onClick={() =>
                                window.open('https://www.portal.llcc.edu.ph', '_blank')
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Fallback heading */}
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                E<b>d</b>ucation
            </h1>
        </div>
    );
};

export default Hero;
