import React, { useState } from 'react';

const Formulario = ({guardarBusquedaLetra}) => {

    const [busqueda, guardarBusqueda] = useState({
        artista: '',
        cancion: ''
    });
    const [ error, guardarError] = useState(false);

    const { artista, cancion } = busqueda;

    // función a cada input para leer su contenido
    const actualizarState = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    // consultar las apis
    const buscarInformacion = e => {
        e.preventDefault();

        if(artista.trim() === '' || cancion.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        // Todo bien, pasar al componente principal

        guardarBusquedaLetra(busqueda);
    }

    return ( 
        <div className="search-header">
            <div className="container">
                <form onSubmit={buscarInformacion} className="search-form">
                    <h1 className="search-title"><span role="img" aria-label="notas musicales">🎶</span> Buscador de Letras de Canciones</h1>
                    {error && <div className="error-message">Todos los campos son obligatorios</div>}
                    
                    <div className="search-inputs">
                        <div className="input-group">
                            <label>Artista</label>
                            <input
                                type="text"
                                name="artista"
                                placeholder="Ej: Coldplay"
                                onChange={actualizarState}
                                value={artista}
                                className="search-input"
                            />
                        </div>
                        
                        <div className="input-group">
                            <label>Canción</label>
                            <input
                                type="text"
                                name="cancion"
                                placeholder="Ej: Yellow"
                                onChange={actualizarState}
                                value={cancion}
                                className="search-input"
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="search-button">
                        <span><span role="img" aria-label="lupa">🔍</span> Buscar</span>
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default Formulario;