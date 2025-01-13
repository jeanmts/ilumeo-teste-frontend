import './style.css'


interface RecordHistoryCardProps {
    start_time: string;
    end_time: string;
    duration: {hours: string, minutes: string};
}


function RecordHistoryCard({ start_time, end_time, duration}: RecordHistoryCardProps) {
 
    
    return (
        <div className="record-history-card">
            <div className="start-time">{start_time}</div>
            <div className="end-time">{end_time}</div>
            <div className="duration">{duration.hours || 0  + " horas e " + duration.minutes || 0 + " minutos"}</div>
        </div>
    )
}

export default RecordHistoryCard;