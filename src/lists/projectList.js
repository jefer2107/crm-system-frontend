import axios from "axios"
import { useEffect, useState } from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom"


export default function ProjectList(){
    const [projects, setProjects] = useState([])
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:3001/projects`)
            .then((x)=>{
                setProjects(x.data)
            })
            .catch((error)=>{
                setMessage(error)
                console.log(error)
            })
    },[])

    const editProject = (id)=>{
        navigate(`/edit-projects/${id}`)
    }

    const removeProject = (id)=>{
        axios.delete(`http://localhost:3001/projects/${id}/removeItem`)
            .then(()=>{
                setProjects((state)=>{
                    const newProjects = [...state]
                    const itemToBeRemove = projects.findIndex(x=> x.id==id)
                    newProjects.splice(itemToBeRemove, 1)

                    return newProjects
                })
                .catch((error)=>{
                    setMessage(error)
                })
            })
    }

    return(
        <div className="container-fluid list">
            <h3 className="text-center">Lista de Projetos</h3>
            <p className="text-center"> {message} </p>
            <table className="container text-center">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>DATA</td>
                        <td>NOME</td>
                        <td>QUANT.SPRINT</td>
                        <td>PREÇO</td>
                        <td>AÇÕES</td>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((x)=>{
                        return(
                            <tr key={x.id}>
                                <td> {x.id} </td>
                                <td> {moment(x.date).format("DD/MM/YY")} </td>
                                <td> {x.name} </td>
                                <td> {x.numberSprint} </td>
                                <td> {x.price} </td>
                                <td> <button onClick={()=>editProject(x.id)} className="btn btn-primary">Editar</button>
                                     <button onClick={()=>removeProject(x.id)} className="btn btn-danger">Remover</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}