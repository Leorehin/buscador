import{useState} from 'react'
import{FiSearch} from 'react-icons/fi'
import './style.css'
import api from './services/api'

function App() {
  //criando variaveis com useState
  const [
    // criando objeto input
  input, setInput] = useState('');
    //crio o objeto que a api restorna
  const [cep, setCep] =useState({});

  //criando uma funcao que gera um alerta
  async function handleSearch(){
    

    if(input.length !== 8){
        //janela de alerta
      alert("PREENCHA UM CEP VALIDO")
      setInput('')
      return;
    }
    try {
      const response = await api.get(input + '/json');
      console.log(response.data)
      setCep(response.data)
      setInput("")

    } catch {
      alert("ops! Erro ao buscar o cep")
      setInput('')
    }


  }
  return (
    //criando um espaço na tela configuravel
    //o comando className atribui um nome ao campo que voce criou
    <div className="container">
        <h1 className='title'> Buscar Cep </h1>

        <div className="containerInput">
          <input
          type="text"
          placeholder="Digite seu Cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />

          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size="25" color='white'/>
          </button>
          </div>
          
          {Object.keys(cep).length > 0 && (
            
            <main className='main'>
            <h2> CEP: {cep.cep}</h2>

            <span> RUA: {cep.logradouro}</span>
            <span>COMPLEMENTO: {cep.complemento}  </span>
            <span> BAIRRO: {cep.bairro}</span>
            <span> {cep.localidade} - {cep.uf}</span>
          </main>

          )}
          

    </div>
  );
}

export default App;
