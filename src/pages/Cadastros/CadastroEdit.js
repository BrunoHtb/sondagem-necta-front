import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import InputField from '../../components/InputField';
import './CadastroEdit.css'

export default function CadastroEdit() {
    const { id } = useParams(); // Pega o ID da URL
    const [cadastro, setCadastro] = useState({});
  
    useEffect(() => {
      api.get(`/api/v1/cadastro/${id}`)
        .then(response => {
          setCadastro(response.data);
        })
        .catch(err => console.log(err));
    }, [id]);

    return (
      <div>
        <h2>Editar Cadastro</h2>
        <form className="form-container">
            <h2>Editar Cadastro</h2>

            <div className="input-field">
                <InputField label="Nome" name="nome" value={cadastro.nome} />
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
                <InputField label="Profundidade Final" name="profundidade_final" value={cadastro.profundidadeFinal} />
            </div>

            <div className="input-field">
                <InputField label="Observação" name="observacao" value={cadastro.observacao} />
            </div>

            <div className="input-field">
                <InputField label="Equipe" name="equipe" value={cadastro.equipe} />
            </div>
        </form>

      </div>
    );
  }
