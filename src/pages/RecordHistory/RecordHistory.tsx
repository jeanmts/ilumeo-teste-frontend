import { useEffect, useState } from "react";
import RecordHistoryCard from "../../components/RecordHistoryCard/RecordHistoryCard";
import api from "../../services/api";
import { format } from "date-fns";

import "./style.css";
import { useNavigate } from "react-router-dom";

interface RecordProps {
    start_time: string;
    end_time: string;
    duration: {
        hours: string;
        minutes: string;
    };
}

function RecordHistory() {
    const navigate = useNavigate(); 

    const [form, setForm] = useState<RecordProps[]>([]);

    async function handleRegister() {
        try {
            const { data } = await api.get(`/history/${localStorage.getItem("contributor_code")}`);
            setForm(data.register); 
        } catch (error) {
            console.log(error);
        }
    }

    function handleLogout(){
        setTimeout(()=> {
        localStorage.clear();
        navigate('/')
    }, 1000)

    }

    useEffect(() => {
      
        handleRegister();
    }, []);

    return (
        <>
            <header className="header-history">
                <h4 className="title-history">Relógio de ponto</h4>
                <div className="container-user">
                    <span className="name-user">#{localStorage.getItem("contributor_code")}</span>
                    <span className="user">Usuário</span>
                    <button onClick={()=>handleLogout()} className="btn-history">Sair</button>
                </div>
            </header>
            <main>
                {form.map((register: RecordProps) => {
                    const dateHourInit = new Date(register.start_time);
                    const dateHourFinish = new Date(register.end_time);
                    const durationRecord = register.duration;

                    const dateInit = format(dateHourInit, "yyyy-MM-dd");
                    const dateEnd = format(dateHourFinish, "yyyy-MM-dd");

                    return (
                        <RecordHistoryCard
                            start_time={dateInit }
                            end_time={dateEnd}
                            duration={durationRecord}
                        />
                    );
                })}
            </main>
        </>
    );
}

export default RecordHistory;
