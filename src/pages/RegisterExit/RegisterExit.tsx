import  { useEffect, useState } from "react";
import  Button from "../../components/Button/Button";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import './style.css'
import api from "../../services/api";
function RegisterExit(){
    const [currentTime, setCurrentTime] = useState<string>("");
    const [form, setForm] = useState({contributor_code: localStorage.getItem('contributor_code'), end_time: new Date()});
    const [hoursExit, setHoursExit] = useState([{end_time: new Date()}]);
    const navigate = useNavigate();

    useEffect(() => {
        const updateTime = () => {
          const now = new Date();
          const formattedTime = format(now, "H'h' mm'm'");
          setCurrentTime(formattedTime);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
      }, []);

      async function handleSubmit() {

        setForm({contributor_code: localStorage.getItem("contributor_code"), end_time: new Date()})

        try {
                console.log(hoursExit)
              const {data} = await api.post('/register/Exit', {...form})
              
              if(data) {
                
                const {data} = await api.get(`/history/${form.contributor_code})}`)
                setHoursExit(data.register)
            }

            } catch (error) {
                console.error(error);
            }
             navigate(`/history/${localStorage.getItem("contributor_code")}`)
        }
    return (
        <>
        <header className="header-registerExit">
            <h4 className="title-registerExit">Relógio de ponto</h4>
            <div className="container-user">
                <span className="name-user">#{localStorage.getItem("contributor_code")}</span>
                <span className="user">Usuário</span>
            </div>
        </header>
        <main className="main-registerExit" >
            <div className="container-registerExit">
                <span className="spn-hourDate">{currentTime}</span>
                <p className="currentTime">Horas de hoje</p>
            </div>
            <Button onClick={handleSubmit} text= "Registrar saida"/>

            <h4>Dias anteriores</h4>
        
            {hoursExit.map((hour)=>{
                const dateHour = new Date(hour.end_time);
                const date = format(dateHour, "yyyy-MM-dd"); 

                const time = format(dateHour, "HH:mm:ss"); 

           return <HistoryCard key={form.contributor_code} date={date} hour={time} />
            })}        
        </main>
        </>
    )
}
export default RegisterExit;