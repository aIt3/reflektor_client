import './AnswerText.css'
function AnswerText (props){
    return(
        <div className="answerBox answerText">
            <p>{props.answer}</p>
        </div>
    )
}

export default AnswerText