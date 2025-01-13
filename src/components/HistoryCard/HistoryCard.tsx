import './style.css'


interface HistoryCardProps {
    date: string,
    hour: string
}


function HistoryCard({date, hour}: HistoryCardProps){

    return (
        <div className="history-card">
            <span className="date">{date}</span>
            <span className="hour">{hour}</span>
        </div>
    )
 
}

export default HistoryCard;