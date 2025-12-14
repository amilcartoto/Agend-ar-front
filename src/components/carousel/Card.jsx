import React from 'react';
import Link from 'next/link';

const Card = ({ province }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc',
      borderRadius: '0.5rem',
      padding: "2px",
      width: '175px',
      height: '230px', 
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      textAlign: "center",
      cursor: 'pointer',
    }}>
      <Link href="/blank" style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
        <img src={province.heroImage} alt={province.nombre} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden', padding: '0 2px' }}></div>
        <h4 style={{ marginTop: '2px', marginBottom: '10px', fontSize: '17px' }}>{province.nombre}</h4>
        <p style={{ margin: '20px 0', fontSize: '10px' }}>{province.descripcion}</p>
        </Link>
      </div>
  );
};

export default Card;