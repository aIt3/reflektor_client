import './Timeline.css'
import DayView from '../DayView/DayView'
import PastView from '../pastView/PastView'

function Timeline({getPastQuestions, questions}){
    return(
        <div className="timeLineWrapper">
            <PastView getPastQuestions={getPastQuestions} questions={questions}/>

        </div>

    )
}

export default Timeline