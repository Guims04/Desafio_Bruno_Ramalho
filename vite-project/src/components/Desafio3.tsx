// Desafio 3
// Criar método que receba o CEP e retorne um objeto com o endereço

import { useState } from 'react';
import '../App.css'

export function Desafio3() {

  // Declarando variaveis para armazenar CEP e as informações desejada de localização.
  const [valcep, setValcep] = useState("");
  const [infos, setInfos] = useState("");

  // Função que busca as informações do CEP por um site, que retorna em formato JSON.
  const buscarCEP = () => {
    if (valcep.length == 8) { // Só realiza a busca se realmente tiver os 8 digitos.
      let link = "https://viacep.com.br/ws/"+valcep+"/json/";
      fetch(link,{
        headers: {
          Accept: "application/json"
        }
      }).then( res=>res.json() ).then(res => setInfos( () => (res["logradouro"]+" "+res["complemento"]+" | "+res["bairro"]+" | "+res["localidade"]+"-"+res["uf"]) )); // Separei apenas as informações desejadas e armazenei como string em uma variável.
    }
  }
  
  // Formulario em html
  return (
      <div className='card'>
        <h1>Desafio 3</h1>
        <h2>Criar método que receba o CEP e retorne um objeto com o endereço</h2>

        <p>Digite seu CEP: </p>
        <input type="text" value={valcep} onChange={event => setValcep((event.target.value).replace(/\D/g, ''))} maxLength={8} />
        <button onClick={buscarCEP}> Filtrar </button>

        <div className='answerPlace'><p>{infos}</p></div>
      </div>
  )
}
