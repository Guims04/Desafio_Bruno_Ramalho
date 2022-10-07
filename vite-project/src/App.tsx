import { useState } from 'react';
import './App.css'

function App() {

  const [answer, setAnswer] = useState("");
  const [texto, setTexto] = useState("");

  const filtrar = ()=>{

    const rExp : RegExp = /[A-Z]+/g;
    
    var resultado = texto.match(rExp);

    console.log(resultado);

    setAnswer(()=>(resultado));
  }

  return (
    <div className="App">
      <div className='card'>
        <p>Digite uma frase: </p>
        <input type="text" id='texto' value={texto} onChange={event => setTexto(event.target.value)} />
        <button onClick={filtrar}> Filtrar </button>
        <div className='answerPlace'>{answer}</div>
      </div>
    </div>
  )
}

export default App
