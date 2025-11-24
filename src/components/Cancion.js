import React, { useMemo } from 'react';

const Cancion = ({ letra }) => {
    const formattedLyrics = useMemo(() => {
        if (!letra) return '';
        return letra.replace(/\n{3,}/g, '\n\n').trim();
    }, [letra]);

    if (!letra) return null;

    return ( 
        <div className="lyrics-card">
            <div className="lyrics-header">
                <h2>
                    <span role="img" aria-label="nota musical">🎵</span> 
                    Letra de la Canción
                </h2>
            </div>
            <div className="lyrics-content">
                <p className="letra">{formattedLyrics}</p>
            </div>
        </div>
    );
};

export default Cancion;