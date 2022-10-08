import { useState } from 'react';
import '../App.css'

export function Desafio2() {

  // Declarando variaveis que vão armazenar a o resultado final, cpf e cnpj
  const [answer, setAnswer] = useState(["",""]);
  const [valcpf, setValcpf] = useState("");
  const [valcnpj, setValcnpj] = useState("");

  // Mascara do CPF, coloquei apenas para deixar bonito e legivel.
  function maskcpf(valor:string) {
    setValcpf((valor)
    .replace(/\D/g, '') // tira tudo que não for número
    .replace(/(\d{3})(\d)/, '$1.$2') // pega os 3 primeiros número e coloca o ponto entre o terceiro e o próximo número.
    .replace(/(\d{3})(\d)/, '$1.$2') // realiza o mesmo
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // realiza o mesmo porem no lugar do ponto, seria o "-"
    //.replace(/(-\d{2})\d+?$/, '$1') <- Impede que mais numero possa ser adicionado
    )
  }

  // Mascara do CNPJ, feita baseado na mesma ideia da mascara anterior.
  function maskcnpj(valor:string) {
    setValcnpj((valor)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    )
  }

  // Faz as diversas verificações de validação de CPF, pelas regras retiradas da internet.
  // Retorna true ou false
  function TestaCPF(strCPF:string) {

    strCPF = strCPF.replace(/\D/g, '');

    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    if (strCPF.substring(0,4) === strCPF.substring(4,8)) return false;

    for (let i=1; i<=9; i++) {Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i)};
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  }

  // Faz as diversas verificações de validação de CNPJ, também pelas regras vistas na internet.
  // Tanto o CPF e o CNPJ possue regras parecidas, mudando apenas a quantidade de números.
  // retorna true ou false
  function TestaCNPJ(cnpj:string){
    cnpj = cnpj.replace(/[^\d]+/g,'');

    let tamanho, numeros, digitos, pos, resultado;
    let soma = 0;
    
    if(cnpj == '') return false;
    if (cnpj.length != 14) return false;
    if (cnpj.substring(0,4) === cnpj.substring(4,8)) return false;

    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i))  * (pos--);
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if ( resultado != parseFloat(digitos.charAt(0)) ) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * (pos--);
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseFloat(digitos.charAt(1))) return false;
           
    return true;
  }

  // Faz a verificação de true ou false das funções anteriores para enviar a resposta desejavel.
  // CPF
  const validarCPF = ()=>{
    if (TestaCPF(valcpf) == true) {
      let newAnswer = [...answer];
      newAnswer[0] = "O seu CPF é valido";
      setAnswer(newAnswer);
    }else{
      let newAnswer = [...answer];
      newAnswer[0] = "O seu CPF não é valido";
      setAnswer(newAnswer);
    }
  }

  // Faz a verificação de true ou false das funções anteriores para enviar a resposta desejavel.
  // CNPJ
  const validarCNPJ = ()=>{
    if (TestaCPF(valcnpj) == true) {
      let newAnswer = [...answer];
      newAnswer[1] = "O seu CNPJ é valido";
      setAnswer(newAnswer);
    }else{
      let newAnswer = [...answer];
      newAnswer[1] = "O seu CNPJ não é valido";
      setAnswer(newAnswer);
    }
  }

  return (
      <div className='card'>

        <h1>Desafio 2</h1>
        <h2>Criar um método que receba um CPF e outro que receba um CNPJ e retorne se o número é válido</h2>

        <p>Digite seu CPF: </p>
        <input type="text" value={valcpf} onChange={(e) => maskcpf(e.target.value)} maxLength={14} />
        <button onClick={validarCPF}> Filtrar </button>

        <p>Digite seu CNPJ: </p>
        <input type="text" value={valcnpj} onChange={(e) => maskcnpj(e.target.value)} maxLength={18} />
        <button onClick={validarCNPJ}> Filtrar </button>

        <div className='answerPlace'><p>{answer[0]}</p><p>{answer[1]}</p></div>
      </div>
  )
}
