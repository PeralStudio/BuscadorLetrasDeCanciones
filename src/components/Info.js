import React from "react";

const Info = ({ info }) => {
    if (Object.keys(info).length === 0) return null;

    // Si no se encontró el artista
    if (info.notFound) {
        return (
            <div className="artist-card error-card">
                <div className="error-content">
                    <div className="error-icon">
                        <span role="img" aria-label="advertencia">
                            🔍
                        </span>
                    </div>
                    <h3 className="error-title">Artista no encontrado</h3>
                    <p className="error-text">
                        No se encontró información sobre <strong>"{info.artistName}"</strong>.
                    </p>
                    <p className="error-hint">
                        Verifica que el nombre del artista esté escrito correctamente o intenta con
                        otro artista.
                    </p>
                </div>
            </div>
        );
    }

    const {
        strArtist,
        strArtistThumb,
        strGenre,
        strStyle,
        strBiographyES,
        strCountry,
        intFormedYear,
        strLabel,
        strWebsite,
        strFacebook
    } = info;

    return (
        <div className="artist-card">
            <div className="artist-image-wrapper">
                <img src={strArtistThumb} alt={strArtist} className="artist-image" />
                {strGenre && <div className="artist-genre">{strGenre}</div>}
            </div>
            <div className="artist-content">
                <h3 className="artist-name">{strArtist}</h3>

                <div className="artist-details">
                    {strCountry && (
                        <div className="detail-item">
                            <span className="detail-icon" role="img" aria-label="ubicación">
                                📍
                            </span>
                            <span>{strCountry}</span>
                        </div>
                    )}
                    {intFormedYear && (
                        <div className="detail-item">
                            <span className="detail-icon" role="img" aria-label="calendario">
                                📅
                            </span>
                            <span>Formado en {intFormedYear}</span>
                        </div>
                    )}
                    {strStyle && (
                        <div className="detail-item">
                            <span className="detail-icon" role="img" aria-label="música">
                                🎸
                            </span>
                            <span>{strStyle}</span>
                        </div>
                    )}
                    {strLabel && (
                        <div className="detail-item">
                            <span className="detail-icon" role="img" aria-label="disco">
                                💿
                            </span>
                            <span>{strLabel}</span>
                        </div>
                    )}
                </div>

                {strBiographyES && (
                    <div className="artist-bio">
                        <h4 className="bio-title">Biografía</h4>
                        <p>{strBiographyES}</p>
                    </div>
                )}

                {(strWebsite || strFacebook) && (
                    <div className="social-links">
                        {strWebsite && (
                            <a
                                href={`https://${strWebsite}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link website"
                                aria-label="Sitio web del artista"
                            >
                                <i className="fas fa-globe"></i>
                            </a>
                        )}
                        {strFacebook && (
                            <a
                                href={`https://${strFacebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link facebook"
                                aria-label="Facebook del artista"
                            >
                                <i className="fab fa-facebook"></i>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Info;
