import { useState, useEffect } from 'react'
import './Answer.css'


function Answer(props) {


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [html, setHtml] = useState({
      __html: '<div />',
    });
  
    useEffect(() => {
        if (props && props.answer) {
                    fetch(
          `https://cdn.iframe.ly/api/iframely?url=${encodeURIComponent(
            props.answer
          )}&key=${process.env.REACT_APP_API_KEY}&iframe=1&omit_script=1`
        )
          .then((res) => res.json())
          .then(
            (res) => {
              setIsLoaded(true);
              if (res.html) {
                setHtml({ __html: res.html });
              } else if (res.error) {
                setError({ code: res.error, message: res.message });
              }
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      } else {
        setError({ code: 400, message: 'Provide url attribute for the element' });
      }
    }, []);
  
    useEffect((props) => {
      window.iframely && window.iframely.load();
    });
  
    if (error) {
      return (
     
        <div>
          Error: {error.code} - {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return <div>Loading…</div>;
    } else {
      return <div className="answerBox" dangerouslySetInnerHTML={html} />;
    }
    
    
}

export default Answer