import { openDB, type DBSchema } from 'idb';

export interface Photo {
    id?: number;
    blob: Blob;
    name: string;
    date: Date;
}

interface PhotoDB extends DBSchema {
    photos: {
        key: number;
        value: Photo;
        indexes: { 'by-date': Date };
    };
}

const dbPromise = openDB<PhotoDB>('photo-album-db', 1, {
    upgrade(db) {
        const store = db.createObjectStore('photos', {
            keyPath: 'id',
            autoIncrement: true,
        });
        store.createIndex('by-date', 'date');
    },
});

export const addPhoto = async (file: File) => {
    const db = await dbPromise;
    return db.add('photos', {
        blob: file,
        name: file.name,
        date: new Date(),
    });
};

export const getAllPhotos = async () => {
    const db = await dbPromise;
    return db.getAllFromIndex('photos', 'by-date');
};

export const getPhoto = async (id: number) => {
    const db = await dbPromise;
    return db.get('photos', id);
};

export const deletePhoto = async (id: number) => {
    const db = await dbPromise;
    return db.delete('photos', id);
};
