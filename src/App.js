import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";
import axios from "axios";

function App() {
    // definir el state
    const [busquedaletra, guardarBusquedaLetra] = useState({});
    const [letra, guardarLetra] = useState("");
    const [info, guardarInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!busquedaletra.artista || !busquedaletra.cancion) return;

        const consultarApiLetra = async () => {
            setLoading(true);
            guardarLetra("");
            guardarInfo({});
            
            try {
                const { artista, cancion } = busquedaletra;
                
                // Usar lyrics.ovh - La mejor API gratuita sin CORS
                const letraResponse = await axios({
                    url: `https://api.lyrics.ovh/v1/${encodeURIComponent(artista)}/${encodeURIComponent(cancion)}`,
                    timeout: 12000
                }).catch(err => ({ error: true, status: err.response?.status }));

                // Obtener info del artista
                const infoResponse = await axios({
                    url: `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artista)}`,
                    timeout: 12000
                }).catch(err => ({ error: true }));

                // Manejar letra
                if (letraResponse.error || !letraResponse.data?.lyrics) {
                    guardarLetra(`❌ No se encontró la letra de "${cancion}" de ${artista}.\n\nVerifica que el nombre de la canción esté escrito correctamente.`);
                } else {
                    guardarLetra(letraResponse.data.lyrics);
                }

                // Manejar info del artista
                if (infoResponse.error || !infoResponse.data?.artists?.[0]) {
                    guardarInfo({ notFound: true, artistName: artista });
                } else {
                    guardarInfo(infoResponse.data.artists[0]);
                }
                
                // Asegurar que siempre se muestre algo
                if (!letraResponse.data?.lyrics && !infoResponse.data?.artists?.[0]) {
                    guardarLetra(`❌ No se encontró la letra de "${cancion}" de ${artista}.\n\nVerifica que el nombre de la canción esté escrito correctamente.`);
                    guardarInfo({ notFound: true, artistName: artista });
                }
            } catch (error) {
                console.error('Error al consultar las APIs:', error);
                guardarLetra('⚠️ Error al cargar la información. Por favor, inténtalo de nuevo.');
            } finally {
                setLoading(false);
            }
        };

        consultarApiLetra();
    }, [busquedaletra]);

    return (
        <div className="app-container">
            <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
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
                            <Info info={info} />
                        </div>
                        <div className="col-lg-7">
                            <Cancion letra={letra} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
