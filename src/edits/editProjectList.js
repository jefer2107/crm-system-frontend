import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export default function EditProjectList(){
    let {id} = useParams()
    const [project, setProject] = useState({name:"", numberSprint:"", price:""})

    useEffect(()=>{
        axios.get(`http://localhost:3001/projects/${id}/getItem`)
            .then((x)=>{
                setProject(x.data)
            })
    },[])

    const changeProject = ({target})=>{
        setProject((state)=>{
            return {...state,[target.name]: target.value}
        })
    }

    return(
        <div className="d-flex form-style">
            <form className="mx-auto">
                {JSON.stringify(project)}
                <h3 className="text-center">Edição de projetos</h3>
                <input onChange={changeProject} className="form-control py-1" type="text" name="name" value={project.name} />
                <input onChange={changeProject} className="form-control py-1" type="number" name="numberSprint" value={project.numberSprint} />
                <input onChange={changeProject} className="form-control py-1" type="text" name="price" value={project.price} />
                <button className="btn btn-primary py-2 w-100">Salvar</button>
            </form>
        </div>
    )
}