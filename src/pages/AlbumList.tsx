import React, { useEffect, useState } from 'react';
import { ImageList, ImageListItem, Fab, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { getAllPhotos, type Photo } from '../services/db';

const AlbumList: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        const data = await getAllPhotos();
        // Sort by date descending
        setPhotos(data.reverse());
    };

    return (
        <Box>
            {photos.length === 0 ? (
                <Typography variant="body1" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
                    No photos yet. Tap + to add one.
                </Typography>
            ) : (
                <ImageList cols={3} gap={4}>
                    {photos.map((photo) => (
                        <ImageListItem key={photo.id} onClick={() => navigate(`/photo/${photo.id}`)}>
                            <img
                                src={URL.createObjectURL(photo.blob)}
                                alt={photo.name}
                                loading="lazy"
                                style={{ aspectRatio: '1/1', objectFit: 'cover', cursor: 'pointer' }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={() => navigate('/upload')}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default AlbumList;
