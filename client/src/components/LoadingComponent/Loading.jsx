import Spinner from 'react-bootstrap/Spinner';

function Loading() {
 return(
    
        <Spinner
        role='status'
        animation="border" 
        style={{
            width:'100px',
            height:'100px',
            margin: '3rem auto',
            display :'block'
           
        }}
         ></Spinner>
   
   )
}

export default Loading;