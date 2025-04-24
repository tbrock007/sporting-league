import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MediaGallery.css';

const MediaGallery = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Fetch existing media from the backend
        axios
            .get('http://localhost:4000/api/image-gallery')
            .then((response) => {
                const validImages = response.data.filter((url) =>
                    url && url.match(/\.(jpg|jpeg|png|gif|webp)$/i) // Only valid image URLs
                );
                setImages(validImages);
            })
            .catch((error) => console.error('Error fetching media:', error));
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        axios
            .post('http://localhost:4000/api/image-gallery/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                setImages((prevImages) => [...prevImages, response.data.filePath]); // Add new image to the gallery
                setSelectedFile(null); // Clear the selected file
                alert('Image uploaded successfully!');
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                alert('Failed to upload the image. Please try again.');
            });
    };

    return (
        <div className="media-gallery">
            {/* Header Section */}
            <header className="gallery-header">
                <div className="gallery-header-content, text-white">
                    <h1>Media Gallery</h1>
                    <p>Explore and upload photos from site and league events!</p>
                </div>
            </header>

            {/* Upload Section */}
            <div className="upload-section">
                <h2>Upload Your Media</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="upload-input"
                />
                <button className="btn btn-warning upload-btn" onClick={handleUpload}>
                    Upload
                </button>
            </div>

            {/* Gallery Section */}
            <div className="gallery-container">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div className="media-card" key={index}>
                            <img
                                src={`http://localhost:4000${image}`}
                                alt={`Media ${index}`}
                                className="media-img"
                            />
                        </div>
                    ))
                ) : (
                    <div className="empty-gallery">
                        No media available. Start by uploading an image!
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaGallery;