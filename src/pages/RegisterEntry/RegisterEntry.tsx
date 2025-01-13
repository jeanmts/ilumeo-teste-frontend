import  { useEffect, useState } from "react";
import  Button from "../../components/Button/Button";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import { format } from "date-fns";
import {  useNavigate } from "react-router-dom";
import './style.css'
import api from "../../services/api";

function RegisterEntry(){
    const navigate = useNavigate(); 
    const [currentTime, setCurrentTime] = useState<string>("");
    const [form, setForm] = useState({contributor_code: localStorage.getItem('contributor_code'), start_time: new Date()});
    const [ hoursEntry, setHoursEntry] = useState([{start_time: new Date}]);
    useEffect(() => {
        const updateTime = () => {
          const now = new Date();
          const formattedTime = format(now, "H'h' mm'm'");
          setCurrentTime(formattedTime);
        };

        const getRegister = async () => {
            const {data} = await api.get(`/history/${form.contributor_code}`);

            setHoursEntry(data.register)
        }
        getRegister();
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
    
        return () => clearInterval(intervalId);
      }, [form]);
      
      async function handleSubmit() {
         
        setForm({contributor_code: localStorage.getItem('contributor_code'), start_time: new Date()})
        try {
              const response = await api.post('/register/entry', {...form})

              navigate('/register/exit')
              if(!response) {
                return;
              }
    

            } catch (error) {
                console.error(error);
            }
        setForm({contributor_code: "", start_time: new Date()});
}


    return (
        <>
        <header className="header-registerEntry">
            <h4 className="title-registerEntry">Relógio de ponto</h4>
            <div className="container-user">
                <span className="name-user">#{localStorage.getItem("contributor_code")}</span>
                <span className="user">Usuário</span>
            </div>
        </header>
        <main className="main-registerEntry" >
            <div className="container-registerEntry">
                <span className="spn-hourDate">{currentTime}</span>
                <p className="currentTime">Horas de hoje</p>
            </div>
            <Button onClick={handleSubmit} text= "Registrar entrada"/>

            <h4>Dias anteriores</h4>

            {hoursEntry.map((hour)=>{
                const dateHour = new Date(hour.start_time);
                const date = format(dateHour, "yyyy-MM-dd"); 

                const time = format(dateHour, "HH:mm:ss"); 

           return (
            <>
               <HistoryCard key={form.contributor_code} date={date} hour={time} />
            
            
            </>
            
            )
           
           })}        
        </main>
        </>
    )
}
export default RegisterEntry;