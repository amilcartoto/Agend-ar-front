import React from 'react';
import Link from 'next/link';

const EventCard = ({ evento }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '2px',
      width: '175px',
      height: '230px', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', 
      textAlign: "center",
    }}>
      <Link href="/blank" style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
      <img src={evento.imagen} alt={evento.titulo} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden', padding: '0 2px' }}></div>
        <h4 style={{ marginTop: '6px', marginBottom: '2px', fontSize: '14px' }}>{evento.titulo}</h4>
        <p style={{ margin: '6px 0', fontSize: '10px' }}>📅{evento.fecha} <br/>- 📍 {evento.lugar}</p>
        <p style={{ margin: '2px 0', fontSize: '10px' }}>Precio: ${evento.precio}</p>
        <p style={{ margin: '2px 0', fontSize: '10px' }}>Categoría: {evento.categoria}</p>
        </Link>
    </div>
  );
};

export default EventCard;
