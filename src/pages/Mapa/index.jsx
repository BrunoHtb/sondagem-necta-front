import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import apiBase from '../../services/apiBase';
import './styles.css'; 

const redIcon = L.icon({
    iconUrl: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="%23ed0707" d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = L.icon({
    iconUrl: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="%2317ba32" d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const yellowIcon = L.icon({
    iconUrl: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="%23f5ed00" d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function MapaComFiltros() {
    const [cadastros, setCadastros] = useState([]);
    const [tracado, setTracados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filtros, setFiltros] = useState({
        status: 'Todos',
        dataInicio: '',
        dataFim: ''
    });

    const processarCoordenadas = (coordenadasStr) => {
        return coordenadasStr.split(';').map(coord => {
            const [lat, latDec, lng, lngDec] = coord.split(',').map(c => c.replace(',', '.').trim());
            const latitude = lat + "." + latDec
            const longitude = lng + "." + lngDec
            return [parseFloat(latitude), parseFloat(longitude)];
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiBase.get('/tracado');
                const data = response.data;
                if (data.length > 0) {
                    const tracadosProcessados = data.map(item => processarCoordenadas(item.coordenadas));
                    setTracados(tracadosProcessados);
                }
            } catch(error) {
                console.error('Erro ao buscar traçado:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiBase.get('/cadastro');
                setCadastros(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar cadastros:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const cadastrosFiltrados = cadastros.filter((cadastro) => {
        const dataCadastroInicioStr = cadastro.dataInicio.split('_')[0];
        const dataCadastroFimStr = cadastro.dataFim.split('_')[0];
        
        const [diaInicio, mesInicio, anoInicio] = dataCadastroInicioStr.split('-');
        const dataCadastroInicio = new Date(`${anoInicio}-${mesInicio}-${diaInicio}`);
    
        const [diaFim, mesFim, anoFim] = dataCadastroFimStr.split('-');
        const dataCadastroFim = new Date(`${anoFim}-${mesFim}-${diaFim}`);
        
        const dataFiltroInicio = filtros.dataInicio ? new Date(filtros.dataInicio) : null;
        const dataFiltroFim = filtros.dataFim ? new Date(filtros.dataFim) : null;
    
        if (filtros.status === "Todos") {
            return true;
        }  
        if (filtros.status === "Pendente") {
            return cadastro.statusSondagem === "Pendente";
        }   
        if (filtros.status === "Exportado") {
            if (dataFiltroInicio && dataFiltroFim) {
                return (
                    (dataCadastroInicio >= dataFiltroInicio) && 
                    (dataCadastroFim <= dataFiltroFim) &&        
                    cadastro.statusSondagem === "Exportado"     
                );
            } else {
                return cadastro.statusSondagem === "Exportado";
            }
        }
    
        return cadastro.statusSondagem === filtros.status;
    });

    const quantidadeFiltrados = cadastrosFiltrados.length;

    if (isLoading) {
        return <p>Carregando mapa...</p>;
    }

    return (
        <div>
            <div className="filtros-container">
                <label>
                    Status:
                    <select name="status" value={filtros.statusSondagem} onChange={handleFilterChange}>
                        <option value="Todos">Todos</option>
                        <option value="Andamento">Andamento</option>
                        <option value="Exportado">Exportado</option>
                        <option value="Pendente">Pendente</option>
                    </select>
                </label>

                <label>
                    Data de Início:
                    <input
                        type="date"
                        name="dataInicio"
                        value={filtros.dataInicio}
                        onChange={handleFilterChange}
                        disabled={filtros.status != "Exportado"}
                    />
                </label>

                <label>
                    Data de Fim:
                    <input
                        type="date"
                        name="dataFim"
                        value={filtros.dataFim}
                        onChange={handleFilterChange}
                        disabled={filtros.status != "Exportado"}
                    />
                </label>

                <div className="quantidade-filtrados">
                    <strong>Pontos de Sondagem: {quantidadeFiltrados} </strong>
                </div>
            </div>

            <MapContainer center={[-21.672061078427678, -47.592773516080356]} zoom={10} className="map-container">
                <TileLayer
                        url="https://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        maxZoom={20} 
                        attribution='&copy; <a href="https://www.google.com/intl/en-US_US/help/terms_maps.html">Google Maps</a>' 
                />     
                {tracado.length > 0 && <Polyline positions={tracado} color="blue" />}         
                {cadastrosFiltrados.map((cadastro) => {
                    let latitude = "";
                    let longitude = "";
                    let icon = "";

                    if(filtros.status === 'Andamento' && cadastro.statusSondagem === 'Andamento'){
                        icon = yellowIcon;
                    }
                    else{
                        icon = cadastro.statusSondagem === 'Exportado' ? greenIcon : redIcon;
                    }

                    if(cadastro.latitudeUTM === "" || cadastro.longitudeUTM === "") {
                        latitude = parseFloat(cadastro.latitudePrevista.replace(',', '.'));
                        longitude = parseFloat(cadastro.longitudePrevista.replace(',', '.'));
                    }
                    else {
                        latitude = parseFloat(cadastro.latitudeReal.replace(',', '.'));
                        longitude = parseFloat(cadastro.longitudeReal.replace(',', '.'));
                    }
                    
                    return (
                        <Marker
                            key={cadastro.id}
                            position={[latitude, longitude]}
                            icon={icon}
                        >
                            <Popup>
                                <strong>{cadastro.nomePonto}</strong><br/>
                                Status: <strong>{cadastro.statusSondagem}</strong><br/>
                                Profundidade Programada: {cadastro.profundidadeProgramada}<br/>
                                Profundidade Final: {cadastro.profundidadeFinal} <br/><br/>
                                <Link to={`/cadastro/edit/${cadastro.id}`}>Editar</Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

