import React, {useEffect, useState} from 'react'
import './styles.css'
import api from '../../services/api'


interface Data {
    id: number
    name: string
    truck: string
    whatsapp: string
    uf: string
    city: string
    latitude: string
    longitude: string
    items: string[]
    description: string
}

const ShowProblems = () =>{
    
    const [responseProblems, setResponseProblems] = useState<Data[]>([])

    useEffect(() => {
        api.get('problems').then(response => {
            setResponseProblems(response.data)
        })
        }, [])
        
    return(
        <div id="page-show-problems">
            <div className="content">
                <legend className="legend-title">
                    <h1>Formulários preenchidos</h1>
                </legend>
                <ul>
                    <div className="problems-content">
                    <li>
                    {
                        responseProblems.map(problem => (
                            <div key={problem.id} className="data">
                                <h3>Modelo Do Caminhão</h3>
                                <p>{problem.truck}</p>
                                <h3>Whatsapp</h3>
                                <p>{problem.whatsapp}</p>
                                <h3>Cidade e Estado (UF)</h3>
                                <p>{problem.city} - {problem.uf}</p>
                                <h3>Ítens selecionados</h3>
                                <p>{problem.items}</p>
                                <h3>Descrição</h3>
                                <p>{problem.description}</p>
                            </div>
                        ))
                    }
                    </li>   
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default ShowProblems