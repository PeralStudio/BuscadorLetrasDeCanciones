import React, { useState, useEffect, useCallback } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";
import axios from "axios";

const API_URLS = {
    LYRICS: 'https://api.lyrics.ovh/v1',
    ARTIST: 'https://www.theaudiodb.com/api/v1/json/2/search.php'
};

const TIMEOUT = 12000;

function App() {
    const [searchQuery, setSearchQuery] = useState(null);
    const [lyrics, setLyrics] = useState("");
    const [artistInfo, setArtistInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchLyrics = useCallback(async (artist, song) => {
        try {
            const response = await axios({
                url: `${API_URLS.LYRICS}/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`,
                timeout: TIMEOUT
            });
            return response.data?.lyrics || null;
        } catch (error) {
            return null;
        }
    }, []);

    const fetchArtistInfo = useCallback(async (artist) => {
        try {
            const response = await axios({
                url: `${API_URLS.ARTIST}?s=${encodeURIComponent(artist)}`,
                timeout: TIMEOUT
            });
            return response.data?.artists?.[0] || null;
        } catch (error) {
            return null;
        }
    }, []);

    useEffect(() => {
        if (!searchQuery?.artista || !searchQuery?.cancion) return;

        const fetchData = async () => {
            setLoading(true);
            setLyrics("");
            setArtistInfo({});
            
            const { artista, cancion } = searchQuery;
            
            const [lyricsData, artistData] = await Promise.all([
                fetchLyrics(artista, cancion),
                fetchArtistInfo(artista)
            ]);

            setLyrics(
                lyricsData || 
                `❌ No se encontró la letra de "${cancion}" de ${artista}.\n\nVerifica que el nombre de la canción esté escrito correctamente.`
            );
            
            setArtistInfo(
                artistData || 
                { notFound: true, artistName: artista }
            );
            
            setLoading(false);
        };

        fetchData();
    }, [searchQuery, fetchLyrics, fetchArtistInfo]);

    return (
        <div className="app-container">
            <Formulario onSearch={setSearchQuery} />
            <div className="container content-wrapper">
                {loading ? (
                    <div className="loader-container">
                        <div className="loader">
                            <div className="music-note">
                                <span role="img" aria-label="nota musical">🎵</span>
                            </div>
                            <div className="loader-text">Buscando...</div>
                        </div>
                    </div>
                ) : (
                    <div className="row g-4">
                        <div className="col-lg-5">
                            <Info info={artistInfo} />
                        </div>
                        <div className="col-lg-7">
                            <Cancion letra={lyrics} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
