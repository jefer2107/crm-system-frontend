import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function ProjectRegister(){
    const [project, setProject] = useState({name:"", numberSprint:"", price:""})
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    const changeProject = ({target})=>{
        setProject((state)=>{
            return {...state,[target.name]: target.value}
        })
    }

    const createProject = (event)=>{
        axios.post(`http://localhost:3001/projects`,project)
            .then((x)=>{
                setProject(x.data)
                navigate('/project-list')
            })
            .catch((error)=>{
                setMessage(error)
            })

        event.preventDefault()
    }

    return(
        <div className="d-flex form-style">
            <form onSubmit={createProject} className="mx-auto">
                <h3 className="text-center">Cadastro de Projetos</h3>
                <input onChange={changeProject} className="form-control py-1" placeholder="Digite o nome do projeto" type="text" name="name" />
                <input onChange={changeProject}  className="form-control py-1" placeholder="Digite a quantidade de sprints"  type="number" name="numberSprint" />
                <input onChange={changeProject}  className="form-control py-1" placeholder="Digite o valor"  type="text" name="price" />
                <button type="submit" className="btn btn-success w-100 py-2">Cadastrar</button>
                <p className="text-center py-4"> {message} </p>
            </form>
        </div>
    )
}