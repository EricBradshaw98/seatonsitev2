import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from "universal-cookie";
const cookies = new Cookies();


const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [description, setDescription] = useState('');
  const [galleryId, setGalleryId] = useState('');
  
  const token = cookies.get('token')
  const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const uploadImages = async (images, userId, galleryId, description) => {
    try {
      
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });
      
      formData.append('user_id', userId);
      formData.append('gallery_id', galleryId);
      formData.append('description', description);
      
      const response = await axios.post('/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Images uploaded successfully:', response.data);
      console.log('images', images)
      return response.data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const handleUpload = async () => {
    try {
      await uploadImages(selectedImages, userId, galleryId, description);
      setSelectedImages([]);
      setDescription('');
      setGalleryId('');
      
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Drag & drop some images here, or click to select images</p>
      </div>
      <div>
        {selectedImages.map((image, index) => (
          <img key={index} src={image.preview} alt={`Preview ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }} />
        ))}
      </div>
      <input
        type="text"
        value={galleryId}
        onChange={(e) => setGalleryId(e.target.value)}
        placeholder="Enter gallery ID"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
      />
      
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;

