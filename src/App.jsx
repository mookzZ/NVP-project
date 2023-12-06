import React, { useState, useEffect } from 'react';
import './App.css'

const YouTubeVideo = ({ videoId }) => {
    if (!videoId) {
        return null;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <iframe
            width="640"
            height="360"
            src={embedUrl}
            frameBorder="0"
            allowFullScreen
            title="Embedded YouTube Video"
        ></iframe>
    );
};

const VideoInput = () => {
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=KgH1rXz7mA0');
    const [videoId, setVideoId] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleButtonClick();
        }
    };

    const handleButtonClick = () => {
        try {
            const url = new URL(videoUrl);

            if (url.hostname === 'www.youtube.com' || url.hostname === 'youtu.be') {
                const videoIdMatch = videoUrl.match(new RegExp('(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com\\/(?:[^\\/]+\\/*\\/v\\/|[^\\/]+\\/.*\\/|[^\\/]+(?:.*[\\?\\&]v=|\\/))|youtu\\.be\\/)([^"&?\\/\\s]{11})'));


                if (videoIdMatch) {
                    setVideoId(videoIdMatch[1]);
                    setError('');
                } else {
                    setError('Не удалось извлечь идентификатор видео');
                }
            } else {
                setError('Неверный домен, поддерживаются только youtube.com и youtu.be');
            }
        } catch (error) {
            setError('Неверный формат URL');
        }
    };

    useEffect(() => {
        handleButtonClick();
    }, []);

    return (
        <div className={"main"}>
            <h1>
                online stream checker
            </h1>
            <p>
                only youtube is supported (example)
            </p>
            <input
                type="text"
                value={videoUrl}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="enter url"
            />
            <button onClick={handleButtonClick}>show video</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <YouTubeVideo videoId={videoId} />
            <div className="footer">
                <a href="https://t.me/mookZZZ" target={"_blank"}>by acided</a>
                <a href="https://github.com/mookzZ/NVP-project" target={"_blank"}>github repository</a>
            </div>
        </div>
    );
};

export default VideoInput;
