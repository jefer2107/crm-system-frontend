import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function EditClientList(){
    const [client, setClient] = useState({name:'',address:'',email:'',telephone:''})
    const [message, setMessage] = useState()
    let navigate = useNavigate()
    let {id} = useParams()

    useEffect(()=>{
        console.log('renderizou!')
        axios.get(`http://localhost:3001/clients/${id}/getItem`)
            .then((x)=>{
                setClient(x.data)
            })
    },[])

    const changeModel = ({target})=>{
        setClient((state)=>{
            return {...state,[target.name]: target.value}
        })
    }

    const saveClient = (event)=>{
        axios.post(`http://localhost:3001/clients`,client)
            .then(()=>{
                navigate("/client-list")
            })

        event.preventDefault()
    }

    return(
        <div className="d-flex form-style">
            <form onSubmit={saveClient} className="mx-auto">
            {JSON.stringify(client)}
            <h3 className="text-center">Editar cliente</h3>
                <input onChange={changeModel} className="form-control" name="name" type='text' value={client.name}/>
                <input onChange={changeModel} className="form-control" name="address" type="text" value={client.address} />
                <input onChange={changeModel} className="form-control" name="email" type="text" value={client.email}  />
                <input onChange={changeModel} className="form-control" name="telephone" type="text" value={client.telephone}  />
                <button type="submit" className="btn btn-primary w-100">Salvar</button>
            </form>
        </div>
    )
}