import { useState } from "react"
import "./style.css"
import api from '../../services/api';
import {  useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function Login() {

    const [form, setForm] = useState({contributor_code:''});
    const navigate = useNavigate(); 

    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({...form, [e.target.name]: e.target.value})
      }


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if(!form.contributor_code) {
                return;
            }
            const {data} = await api.post('/collaborators', { ...form });

            if(data){
                localStorage.setItem('contributor_code', form.contributor_code);
            }
            navigate('/register/entry');

        } catch (error) {
            console.error(error);
        }

        setForm({contributor_code:''})
    }

    return ( 
        <>
            <main className="container-login">
                <h3 className="title-login">Ponto<span className="span-login" >Ilumeo</span></h3>
                <div className="container-actions">
                    <form onSubmit={handleSubmit} action="submit" className="container-actions" >
                        <input onChange={handleChangeInput} name="contributor_code" value={form.contributor_code}  className="input-login" placeholder="Código do usuário" type="text"/>
                        <Button onClick={()=>handleSubmit} text={ "Confirmar" }/>
                    </form>
                </div>
            </main>
        </>
    
    )
}

export default Login;