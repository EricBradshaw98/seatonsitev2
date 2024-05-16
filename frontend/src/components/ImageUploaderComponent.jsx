import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useDropzone } from 'react-dropzone';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { jwtDecode } from 'jwt-decode';
import Cookies from "universal-cookie";
const cookies = new Cookies();



const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
  paddingTop: '100%',
  overflow: 'hidden',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const ImageUploaderComponent = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [galleryId, setGalleryId] = useState('');
  const [newGallery, setNewGallery] = useState('')


  const token = cookies.get('token');
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.userId;

  const onDrop = (acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleGalleryIdChange = (e) => {
    setGalleryId(e.target.value);
  };

  const handleNewGalleryChange = (e) => {
    setNewGallery(e.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
  
    images.forEach((image, index) => {
      formData.append('files', image); // Use 'files' as the key
    });
  
    formData.append('description', description);
    formData.append('galleryId', galleryId);
    formData.append('user_id', user_id);
    formData.append('newGallery', newGallery);
  
    // Log formData before sending the request
    console.log('Form Data:', formData);
  
    fetch('/photos/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      console.log('Images uploaded successfully:', response);
    })
    .catch(error => {
      console.error('Error uploading images:', error);
    });
  };

  return (
    <div>


      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        name="description"
        autoComplete="description"
        autoFocus
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter a description for the photo"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="galleryId"
        label="Gallery ID"
        name="galleryId"
        autoComplete="galleryId"
        type="text"
        value={galleryId}
        onChange={handleGalleryIdChange}
        placeholder="Enter the gallery ID"
      />
      <div {...getRootProps()} style={{ outline: 'none', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <Button variant="outlined" component="span">
          Choose Images
        </Button>
      </div>
      {images.length > 0 && (
        <Grid container spacing={2}>
          {images.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ImageContainer>
                <img src={URL.createObjectURL(file)} alt={`image-${index}`} />
              </ImageContainer>
              <Button onClick={() => removeImage(index)} color="secondary">
                Remove
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={images.length === 0 || description.trim() === '' || galleryId.trim() === ''}
      >
        Upload Images
      </Button>
    </div>
  );
};

export default ImageUploaderComponent;