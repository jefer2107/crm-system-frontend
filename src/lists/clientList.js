import './clientList.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export default function ClientList(){
    const [clients, setClients] = useState([])
    const [campaigns, setCampaigns] = useState([])
    const [test, setTest] = useState([])
    const [message, setMessage] = useState()
    let navigate = useNavigate()

    // useEffect(()=>{
    //     axios.get(`https://jsonplaceholder.typicode.com/posts/1`)
    //         .then((x)=>{
    //             setTest(x.data)
    //         })
    // },[])

    useEffect(()=>{
        axios.get(`http://localhost:3001/clients`)
            .then((x)=>{
                setClients(x.data)
            })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3001/campaigns`)
            .then((x)=>{
                setCampaigns(x.data)
            })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3001/clients/join/campaigns/idCampaigns/getJoinCampaigns`)
            .then((x)=>{
                setTest(x.data)
            })
    },[])

    const getCampaigns = (foreignkey=null)=>{
        let newCampaigns;
        if(campaigns.length > 0){
            if(foreignkey===null){
                newCampaigns = "Não tem campanha"
                return newCampaigns

            }else{
                const findCampaigns = campaigns.find(x=> x.id === foreignkey)

                newCampaigns = findCampaigns
                return newCampaigns.name
            } 
            
        }
        
    }


    const removeClient = (id)=>{
        axios.delete(`http://localhost:3001/clients/${id}/removeItem`)
            .then(()=>{
                setClients((state)=>{
                    const newClients = [...state]
                    const itemToBeRemove = clients.findIndex(x=>x.id==id)
                    newClients.splice(itemToBeRemove, 1)

                    return newClients
                })
            })
            .catch((error)=>{
                setMessage(error.message)
            })
    }

    const editClient = (id)=>{
        navigate(`/edit-client/${id}`)
    }

    return(
        <div className="container-fluid list">
            {JSON.stringify(clients)}
            <h3 className='text-center'>Lista de Clientes</h3>
            <p className='text-center'>{message}</p>
            <table className="container">
                <thead className="text-center">
                    <tr>
                        <td>ID</td>
                        <td>DATA</td>
                        <td>NOME</td>
                        <td>ENDEREÇO</td>
                        <td>EMAIL</td>
                        <td>TELEFONE</td>
                        <td>CAMPANHA</td>
                        <td>AÇOES</td>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((x)=>{
                        return(
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{moment(x.date).format("DD/MM/YY")}</td>
                                <td>{x.name}</td>
                                <td>{x.address}</td>
                                <td>{x.email}</td>
                                <td>{x.telephone}</td>
                                <td>{getCampaigns(x.idCampaigns)}</td>
                                <td>
                                    <button onClick={()=> editClient(x.id)} type='button' className='btn btn-primary'>Editar</button>
                                    <button onClick={()=> removeClient(x.id)} type='button' className='btn btn-danger'>Excluir</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}