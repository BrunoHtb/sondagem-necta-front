import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiBase from '../../services/apiBase';
import InputField from '../../components/InputFieldComponent';
import Select from '../../components/SelectFieldComponent';
import Map from '../../components/MapComponent';
import './CadastroEdit.css';

export default function CadastroEdit() {
    const { id } = useParams();
    const [cadastro, setCadastro] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [modalImage, setModalImage] = useState('');

    const options = [
        { value: 'Vazio', label: '' },
        { value: 'Andamento', label: 'Andamento' },
        { value: 'Concluido', label: 'Concluido' },
        { value: 'Exportado', label: 'Exportado' },
        { value: 'Pendente', label: 'Pendente' },
    ];

    useEffect(() => {
        apiBase.get(`/cadastro/${id}`)
            .then(response => {
                setCadastro(response.data);
                setStatus(response.data.status || 'vazio');
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setCadastro({ ...cadastro, status: event.target.value });
    };

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        setSelectedFiles(prevState => ({
            ...prevState,
            [index]: file
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCadastro(prevCadastro => ({
            ...prevCadastro,
            [name]: value
        }));
    };

    const handleImageClick = (imageSrc) => {
        setModalImage(imageSrc); 
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        try {
            const updatedFotosExecucao = fotosExecucao.map((foto, index) => {
                if (selectedFiles[index]) {
                    const newFileName = `${cadastro.nome}_execucao_${index}.jpg`;
                    const newFileURL = `http://177.220.159.198/Repositorio/Dados_SondagemSP_2024/${cadastro.nome}/${newFileName}`;
                    selectedFiles[index].fileName = newFileName;
                    return newFileURL;
                }
                return foto.trim();
            }).join(';');

            const updatedFotosColeta = fotosColeta.map((foto, index) => {
                if (selectedFiles[index]) {
                    const newFileName = `${cadastro.nome}_coleta_${index}.jpg`;
                    const newFileURL = `http://177.220.159.198/Repositorio/Dados_SondagemSP_2024/${cadastro.nome}/${newFileName}`;
                    selectedFiles[index].fileName = newFileName;
                    return newFileURL;
                }
                return foto.trim();
            }).join(';');

            const descricao = descricaoColeta.join(';');

            const formData = new FormData();
            formData.append('Id', id);
            formData.append('Nome', cadastro.nome);
            formData.append('Status', cadastro.status);
            formData.append('LatitudeUTM', cadastro.latitudeUTM);
            formData.append('LongitudeUTM', cadastro.longitudeUTM);
            formData.append('Rodovia', cadastro.rodovia);
            formData.append('ProfundidadeProgramada', cadastro.profundidadeProgramada);
            formData.append('ProfundidadeFinal', cadastro.profundidadeFinal);
            formData.append('observacao', cadastro.observacao || "");
            formData.append('Equipe', cadastro.equipe);

            formData.append('DescricaoColeta', descricao);
            formData.append('CaminhoFotoExecucao', updatedFotosExecucao);
            formData.append('CaminhoFotoColeta', updatedFotosColeta);

            formData.append('CaminhoFotoBoletim', cadastro.caminhoFotoBoletim);
            formData.append('CaminhoFotoFuroFechado', cadastro.caminhoFotoFuroFechado);

            Object.keys(selectedFiles).forEach(key => {
                const file = selectedFiles[key];
                formData.append(`file_${key}`, file, file.fileName);
            });

            const response = await apiBase.put(`/cadastro/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Erro ao salvar as alterações:', error);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    const fotosExecucao = cadastro.caminhoFotoExecucao ? cadastro.caminhoFotoExecucao.split(';').slice(0, -1) : [];
    const fotosColeta = cadastro.caminhoFotoColeta ? cadastro.caminhoFotoColeta.split(';') : [];
    const descricaoColeta = cadastro.descricaoColeta ? cadastro.descricaoColeta.split(';') : [];

    return (
        <div className="page-container">
            {isModalOpen && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={modalImage} alt="Expanded" />
                </div>
            )}

            <div className="form-container">
                <form>
                    <div className="input-field">
                        <InputField label="Nome" name="nome" value={cadastro.nome} onChange={handleInputChange} />
                    </div>

                    <div className="select-field">
                        <Select label="Status" options={options} selectedValue={status} onChange={handleStatusChange} />
                    </div>

                    <div className="input-field">
                        <InputField label="Latitude UTM" name="latitudeUTM" value={cadastro.latitudeUTM} onChange={handleInputChange} />
                    </div>

                    <div className="input-field">
                        <InputField label="Longitude UTM" name="longitudeUTM" value={cadastro.longitudeUTM} onChange={handleInputChange} />
                    </div>

                    <div className="input-field">
                        <InputField label="Rodovia" name="rodovia" value={cadastro.rodovia} onChange={handleInputChange} />
                    </div>

                    <div className="input-field">
                        <InputField label="Profundidade Programada" name="profundidadeProgramada" value={cadastro.profundidadeProgramada} onChange={handleInputChange} />
                    </div>

                    <div className="input-field">
                        <InputField label="Profundidade Executada" name="profundidadeFinal" value={cadastro.profundidadeFinal} onChange={handleInputChange} />
                    </div>

                    <div className="input-field">
                        <InputField label="Observação" name="observacao" value={cadastro.observacao} onChange={handleInputChange} />
                    </div>

                    <div className="input-field">
                        <InputField label="Equipe" name="equipe" value={cadastro.equipe} onChange={handleInputChange} />
                    </div>

                    {fotosColeta.map((foto, index) => (
                        foto.trim() && (
                            <div key={index} className="photo-description-container">
                                <InputField label={`${index} Metros`} name={`descricao_foto_${index + 1}`} value={descricaoColeta[index] || ''} onChange={handleInputChange} />
                                <img src={foto.trim()} alt={`Foto ${index + 1}`} onClick={() => handleImageClick(foto.trim())} />
                                <input type="file" className="custom-file-input" onChange={(e) => handleFileChange(index, e)} />
                            </div>
                        )
                    ))}

                    <div className="btn-container">
                        <button type="button" className="btn-save" onClick={handleSave}>Salvar Alterações</button>
                    </div>
                </form>
            </div>

            <div>
                <div className="map-container">
                    <Map cadastro={cadastro} zone={23} />
                </div>

                <div className="photo-gallery">
                    {fotosExecucao.map((foto, index) => (
                        foto.trim() && (
                            <div key={index} className="photo-description-container">
                                <label>Panoramica {index + 1}:</label>
                                <img src={foto.trim()} alt={`Foto ${index + 1}`} onClick={() => handleImageClick(foto.trim())} />
                                <input type="file" onChange={(e) => handleFileChange(index, e)} />
                            </div>
                        )
                    ))}
                    <div className="photo-description-container">
                        <label>Buraco Fechado</label>
                        <img src={cadastro.caminhoFotoFuroFechado} alt="buraco-fechado" onClick={() => handleImageClick(cadastro.caminhoFotoFuroFechado)} />
                        <input type="file" className="custom-file-input" onChange={(e) => handleFileChange('buraco', e)} />
                    </div>
                    <div>
                        <label>Boletim</label>
                        <img src={cadastro.caminhoFotoBoletim} alt="boletim" onClick={() => handleImageClick(cadastro.caminhoFotoBoletim)} />
                        <input type="file" className="custom-file-input" onChange={(e) => handleFileChange('boletim', e)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
