import React, { useState, useEffect } from 'react';
import apiBase from '../../services/apiBase';
import './styles.css';

export default function Relatorio() {
    const [cadastros, setCadastros] = useState([]);
    const [filteredCadastros, setFilteredCadastros] = useState([]);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [nomePonto, setNomePonto] = useState('');
    const [status, setStatus] = useState('');
    const [docFiles, setDocFiles] = useState([]);

    const statusOptions = [
        { value: '', label: 'Todos' },
        { value: 'Andamento', label: 'Andamento' },
        { value: 'Concluido', label: 'Concluído' },
        { value: 'Exportado', label: 'Exportado' },
        { value: 'Pendente', label: 'Pendente' },
    ];

    useEffect(() => {
        apiBase.get('/relatorio/listar-relatorio').then(response => {
            setCadastros(response.data);
            setFilteredCadastros(response.data); 
        });
    }, []);

    const handleAplicarFiltros = () => {
        let filtered;

        if (nomePonto) {
            filtered = cadastros.filter((item) => 
                item.nomePonto.toLowerCase().includes(nomePonto.toLowerCase())
            );
        } else if (status === '') {
            filtered = cadastros;
        } else {
            filtered = cadastros.filter((item) => {
                const [dayStart, monthStart, yearStart] = item.dataInicioColeta.split('-');
                const itemDataInicio = new Date(`${yearStart}-${monthStart}-${dayStart}`);
    
                const [dayEnd, monthEnd, yearEnd] = item.dataFimColeta.split('-');
                const itemDataFim = new Date(`${yearEnd}-${monthEnd}-${dayEnd}`);
    
                const matchesDataInicio = dataInicio ? itemDataInicio >= new Date(dataInicio) : true;
                const matchesDataFim = dataFim ? itemDataFim <= new Date(dataFim) : true;
                const matchesStatus = item.status === status;
    
                return matchesDataInicio && matchesDataFim && matchesStatus;
            });
        }
        setFilteredCadastros(filtered);
    };

    const handleGerarRelatorio = async () => {
        try {
            const ids = filteredCadastros.map((item) => item.id);
            const response = await apiBase.post('/relatorio/gerar-relatorio', { ids });   
            const files = response.data; 
    
            setDocFiles(files);
    
            console.log('Relatório gerado com sucesso.');
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
        }
    };

    return (
        <div className="relatorio-container">
            <h2>Gerar Relatório</h2>
            <div className="filtros">
                <div className="filtro-item">
                    <label>Data de Início:</label>
                    <input
                        type="date"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        disabled={status === ''}
                    />
                </div>
                <div className="filtro-item">
                    <label>Data de Fim:</label>
                    <input
                        type="date"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                        disabled={status === ''}
                    />
                </div>
                <div className="filtro-item">
                    <label>Nome do Ponto:</label>
                    <input
                        type="text"
                        value={nomePonto}
                        onChange={(e) => setNomePonto(e.target.value)}
                    />
                </div>
                <div className="filtro-item">
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filtro-item">
                    <button onClick={handleAplicarFiltros}>Aplicar Filtros</button>
                </div>
                <div className="filtro-item-gerar-relatorio">
                    <button onClick={handleAplicarFiltros}>Gerar Relatorio</button>
                </div>
            </div>

            <div className="grid-container">
                <table className="resultados-grid">
                    <thead>
                        <tr>
                            <th>Ponto</th>
                            <th>Status</th>
                            <th>Data Inicio</th>
                            <th>Data Fim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCadastros.map((resultado) => (
                            <tr key={resultado.id}>
                                <td>{resultado.nome}</td>
                                <td>{resultado.status}</td>
                                <td>{resultado.dataInicioColeta}</td>
                                <td>{resultado.dataFimColeta}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
