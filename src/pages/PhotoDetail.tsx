import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPhoto, deletePhoto, type Photo } from '../services/db';

const PhotoDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadPhoto(parseInt(id, 10));
        }
    }, [id]);

    const loadPhoto = async (photoId: number) => {
        try {
            const data = await getPhoto(photoId);
            setPhoto(data || null);
        } catch (error) {
            console.error('Failed to load photo:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (photo && photo.id) {
            if (window.confirm('Are you sure you want to delete this photo?')) {
                await deletePhoto(photo.id);
                navigate('/');
            }
        }
    };

    if (loading) {
        return <CircularProgress sx={{ mt: 4 }} />;
    }

    if (!photo) {
        return (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6">Photo not found</Typography>
                <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <IconButton onClick={() => navigate('/')}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton onClick={handleDelete} color="error">
                    <DeleteIcon />
                </IconButton>
            </Box>
            <img
                src={URL.createObjectURL(photo.blob)}
                alt={photo.name}
                style={{ width: '100%', borderRadius: 8 }}
            />
            <Box>
                <Typography variant="body2" color="text.secondary">
                    {photo.date.toLocaleString()}
                </Typography>
                <Typography variant="body1">{photo.name}</Typography>
            </Box>
        </Box>
    );
};

export default PhotoDetail;
