import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Layout from './components/Layout';
import AlbumList from './pages/AlbumList';
import PhotoDetail from './pages/PhotoDetail';
import Upload from './pages/Upload';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AlbumList />} />
            <Route path="upload" element={<Upload />} />
            <Route path="photo/:id" element={<PhotoDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
