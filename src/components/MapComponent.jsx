import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import proj4 from 'proj4';

const utmToLatLng = (latitudeUTM, longitudeUTM, zone) => {
    const utmProj = `+proj=utm +zone=${zone} +south +datum=WGS84 +units=m +no_defs`; 
    const latLngProj = 'EPSG:4326';
    return proj4(utmProj, latLngProj, [latitudeUTM, longitudeUTM]);
};

const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 13);  
    }, [position, map]);
    return null;
};

function MapComponent ( {cadastro, zone} ){
    const [position, setPosition] = useState([-23.5505, -46.6333]); 
    useEffect(() => {
        if (cadastro && zone) {
            const latitudeUtmNumerico = parseFloat(cadastro.latitudeUTM.replace(',', '.'));
            const longitudeUtmNumerico = parseFloat(cadastro.longitudeUTM.replace(',', '.'));
            const [longitude, latitude] = utmToLatLng(latitudeUtmNumerico, longitudeUtmNumerico, zone);
            setPosition([latitude, longitude]);  
        }
    }, [cadastro, zone]);

    return (
        <MapContainer center={position} zoom={5} style={{ height: '500px', width: '100%' }}>
            <RecenterMap position={position} />
            <TileLayer
                        url="https://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        maxZoom={15}
                        attribution='&copy; <a href="https://www.google.com/intl/en-US_US/help/terms_maps.html">Google Maps</a>' />    
            <Marker position={position} icon={defaultIcon}>
                <Popup>
                    Ponto de Sondagem: {cadastro.nome} <br /> 
                    Profundidade Programada: {cadastro.profundidadeProgramada} <br /> 
                    Profundidade Final: {cadastro.profundidadeFinal}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;


