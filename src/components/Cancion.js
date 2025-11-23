import React from 'react';

const Cancion = ({letra}) => {
    if(letra.length === 0) return null;

    const letraFormateada = letra.replace(/\n{3,}/g, '\n\n').trim();

    return ( 
        <div className="lyrics-card">
            <div className="lyrics-header">
                <h2><span role="img" aria-label="nota musical">🎵</span> Letra de la Canción</h2>
            </div>
            <div className="lyrics-content">
                <p className="letra">{letraFormateada}</p>
            </div>
        </div>
    );
}

export default Cancion;