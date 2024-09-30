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

    const fotosExecucao = cadastro.caminhoFotoExecucao ? cadastro.caminhoFotoExecucao.split(';').slice(0, -1) : [];
    const fotosColeta = cadastro.caminhoFotoColeta ? cadastro.caminhoFotoColeta.split(';') : [];
    const descricaoColeta = cadastro.descricaoColeta ? cadastro.descricaoColeta.split(';') : [];
    
    return (
        <div className="page-container">
            <div className="form-container">
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

                    {fotosColeta.map((foto, index) => (
                        <div key={index} className="photo-description-container">
                                <InputField
                                    label={`${index} Metros`}
                                    name={`descricao_foto_${index + 1}`}
                                    value={descricaoColeta[index] || ''}
                                />
                                <img src={foto.trim()} alt={`Foto ${index + 1}`} />                        
                        </div>               
                    ))}
                </form>
            </div>

            <div>
                <div className="map-container">
                    <Map cadastro={cadastro} zone={23}/>
                </div>

                <div className="photo-gallery">
                    {fotosExecucao.map((foto, index) => (
                        <div className="photo-description-container">
                            <label>Panoramica {index+1}:</label>
                            <img key={index} src={foto.trim()} alt={`Foto ${index + 1}`} />
                        </div>
                    ))}
                    <div className="photo-description-container">
                        <label>Buraco Fechado</label>
                        <img src={cadastro.caminhoFotoFuroFechado} alt="Placeholder" />
                    </div>
                    <div>
                        <label>Boletim</label>
                        <img src={cadastro.caminhoFotoBoletim} alt="Placeholder" />
                    </div>
                </div>
            </div>
        </div>
    );
}
