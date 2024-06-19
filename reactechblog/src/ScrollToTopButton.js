import React, { useState, useEffect } from 'react';
import {FaArrowAltCircleUp, FaArrowCircleUp} from "react-icons/fa";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Add a scroll event listener to check whether the button should be visible.
        const handleScroll = () => {
            // alert(window.scrollY);
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            // Remove the scroll event listener when the component unmounts.
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            {isVisible && (
                <button
                    className="scroll-to-top-button"
                    onClick={scrollToTop}
                >
                    <FaArrowCircleUp/>
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
