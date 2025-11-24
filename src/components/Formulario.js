import React, { useState, useCallback } from 'react';

const Formulario = ({ onSearch }) => {
    const [formData, setFormData] = useState({
        artista: '',
        cancion: ''
    });
    const [error, setError] = useState(false);

    const { artista, cancion } = formData;

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(false);
    }, [error]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!artista.trim() || !cancion.trim()) {
            setError(true);
            return;
        }

        onSearch(formData);
    }, [artista, cancion, formData, onSearch]);

    return ( 
        <div className="search-header">
            <div className="container">
                <form onSubmit={handleSubmit} className="search-form">
                    <h1 className="search-title">
                        <span role="img" aria-label="notas musicales">🎶</span> 
                        Buscador de Letras de Canciones
                    </h1>
                    {error && (
                        <div className="error-message">
                            Todos los campos son obligatorios
                        </div>
                    )}
                    
                    <div className="search-inputs">
                        <div className="input-group">
                            <label htmlFor="artista">Artista</label>
                            <input
                                id="artista"
                                type="text"
                                name="artista"
                                placeholder="Ej: Coldplay"
                                onChange={handleInputChange}
                                value={artista}
                                className="search-input"
                                autoComplete="off"
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="cancion">Canción</label>
                            <input
                                id="cancion"
                                type="text"
                                name="cancion"
                                placeholder="Ej: Yellow"
                                onChange={handleInputChange}
                                value={cancion}
                                className="search-input"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="search-button">
                        <span role="img" aria-label="lupa">🔍</span> Buscar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Formulario;