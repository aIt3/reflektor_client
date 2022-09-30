import './Answer.css'

function Answer({username, answer}) {
    return(
        <div className='answerBox'>
            <div className='username'>
            {username}
            </div>
            <div className='answer'>
                <iframe 
                style={{border: 0, width: 350, height: 350}} 
                src="`${answer}`"
                seamless>
                <a href="`${answer}`">I Feel How This Night Should Look by Psychemagik</a>
                </iframe>            
            </div>
        </div>

    )
}

export default Answer