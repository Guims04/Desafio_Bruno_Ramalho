import { useState } from 'react';
import './App.css'

//Imports dos componentes desafio.
import { Desafio1 } from './components/Desafio1';
import { Desafio2 } from './components/Desafio2';
import { Desafio3 } from './components/Desafio3';

function App() {

  // Declarando variaveis para navegação entre os Desafios
  // "active" é uma classe de estilo que coloca borda no ponto do desafio atual
  const [active1, setActive1] = useState("active");
  const [active2, setActive2] = useState("");
  const [active3, setActive3] = useState("");

  // Declarando variavel que guia qual desafio estou.
  const [count, setCount] = useState(1);

  // Função que movimenta apenas a estilização de um ponto para outro
  // Nesse caso movimenta para o ponto posterior
  function next() {
    if (count+1 == 2) {
      setActive1(()=>"");
      setActive2(()=>"active");
      setActive3(()=>"");
      setCount(2);
    }
    if (count+1 == 3) {
      setActive1(()=>"");
      setActive2(()=>"");
      setActive3(()=>"active");
      setCount(3);
    }
    if (count >= 3) {
      setCount(3);
    }
  }

  // Função que movimenta apenas a estilização de um ponto para outro
  // Nesse caso movimenta para o ponto anterior
  function back() {
    if (count-1 == 1) {
      setActive1(()=>"active");
      setActive2(()=>"");
      setActive3(()=>"");
      setCount(1);
    }
    if (count-1 == 2) {
      setActive1(()=>"");
      setActive2(()=>"active");
      setActive3(()=>"");
      setCount(2);
    }
    if (count <= 1) {
      setCount(1);
    }
  }

  // Função que guia qual desafio deve ser mostrado em relação à contagem declarada anteriormente e que é alterada pela função anterior
  function desafio() {
    if (count == 1) {
      return <Desafio1 />;
    }else if (count == 2) {
      return <Desafio2 />
    }else{
      return <Desafio3 />
    }
  }

  return (
    <div className="App">
      <div>
        
        {desafio() /* Aqui onde o desafio é chamado */}
        
        <div className='Progress'>
          <button onClick={()=>back()}> Back </button>
          <div className={active1} ></div>
          <div className={active2} ></div>
          <div className={active3} ></div>
          <button onClick={()=>next()}> Next </button>
        </div>
      </div>
    </div>
  )
}

export default App
