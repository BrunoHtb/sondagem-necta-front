import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import InputField from '../../components/InputFieldComponent';
import Select from '../../components/SelectFieldComponent';
import Map from '../../components/MapComponent';
import './CadastroEdit.css';

export default function CadastroEdit() {
    const { id } = useParams();
    const [cadastro, setCadastro] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true); 

    const options = [
        { value: 'Vazio', label: '' },
        { value: 'Andamento', label: 'Andamento' },
        { value: 'Concluido', label: 'Concluido' },
        { value: 'Exportado', label: 'Exportado' },
        { value: 'Pendente', label: 'Pendente' },
    ];

    useEffect(() => {
        api.get(`/api/v1/cadastro/${id}`)
            .then(response => {
                setCadastro(response.data);
                setStatus(response.data.status || 'vazio');
                setLoading(false); 
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    if (loading) {
        return <div>Carregando...</div>; 
    }

    return (
        <div className="page-container">
            <div className="form-container">
                <h2>Editar Cadastro</h2>
                <form>
                    <div className="input-field">
                        <InputField label="Nome" name="nome" value={cadastro.nome} />
                    </div>

                    <div className="select-field">
                        <Select
                            label="Status"
                            options={options}
                            selectedValue={status}
                            onChange={handleStatusChange}
                        />
                    </div>

                    <div className="input-field">
                        <InputField label="Latitude UTM" name="latitude_utm" value={cadastro.latitudeUTM} />
                    </div>

                    <div className="input-field">
                        <InputField label="Longitude UTM" name="longitude_utm" value={cadastro.longitudeUTM} />
                    </div>

                    <div className="input-field">
                        <InputField label="Rodovia" name="rodovia" value={cadastro.rodovia} />
                    </div>

                    <div className="input-field">
                        <InputField label="Profundidade Programada" name="profundidade_programada" value={cadastro.profundidadeProgramada} />
                    </div>

                    <div className="input-field">
                        <InputField label="Observação" name="observacao" value={cadastro.observacao} />
                    </div>

                    <div className="input-field">
                        <InputField label="Equipe" name="equipe" value={cadastro.equipe} />
                    </div>
                </form>
            </div>

            <div>
                {/* Seção do mapa */}
                <div className="map-container">
                    <Map cadastro={cadastro} zone={23}/>
                </div>

                {/* Seção de fotos */}
                <div className="photo-gallery">
                    <h3>Galeria de Fotos</h3>
                    <img src="https://via.placeholder.com/300" alt="Placeholder" />
                    <img src="https://via.placeholder.com/300" alt="Placeholder" />
                </div>
            </div>
        </div>
    );
}
