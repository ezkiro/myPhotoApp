import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addPhoto } from '../services/db';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Upload: React.FC = () => {
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setUploading(true);
            try {
                await addPhoto(file);
                navigate('/');
            } catch (error) {
                console.error('Failed to save photo:', error);
                alert('Failed to save photo');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Upload Photo
            </Typography>
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                disabled={uploading}
            >
                Select Photo
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            {uploading && <CircularProgress sx={{ mt: 2 }} />}
        </Box>
    );
};

export default Upload;
