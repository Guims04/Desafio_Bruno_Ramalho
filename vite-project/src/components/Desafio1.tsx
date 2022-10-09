// Desafio 1
// Criar um método que recebe uma string e retorna somente as letras maiusculas

import { useState } from 'react';
import '../App.css'

export function Desafio1() {

  // Declarando variaveis para atualização de informações.
  const [answer, setAnswer] = useState(""); // nesse campo o resultado vai ser armazenado e mostrado no final.
  const [texto, setTexto] = useState("");

  // Essa arrow function vai filtrar por Regex apenas as letras maiusculas do texto escrito
  const filtrar = () => {
    const rExp = new RegExp(/[A-Z]+/g); //definindo Regex
    const resultado = texto.match(rExp) || []; // fazendo o Match
    setAnswer(() => (resultado.toString())); // covertendo para string para ser mostrado
  }

  // Formulario em html
  return (
      <div className='card'>
        <h1>Desafio 1</h1>
        <h2>Criar um método que recebe uma string e retorna somente as letras maiusculas</h2>

        <p>Digite uma frase: </p>
        <input type="text" value={texto} onChange={event => setTexto(event.target.value)} />
        <button onClick={filtrar}> Filtrar </button>
        
        <div className='answerPlace'><p>{answer}</p></div>
      </div>
  )
}
