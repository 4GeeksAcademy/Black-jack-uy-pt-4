import React, { useState , useEffect } from "react";

const Card = (props) => {

	return (<div className={`card d-flex flex-column
		justify-content-evenly align-items-center
		 ` + (props.pinta == '♦' || props.pinta =='♥' ? " text-danger" : '') }
		style={{ minHeight: '150px', minWidth: '100px' }}
	>
		<p>{props.pinta}</p>
		<h1>{props.valor}</h1>
		<p>{props.pinta}</p>
	</div>
	);
};

//create your first component
const Home = () => {

	const pintas = ['♦','♥','♠','♣'];
	const valores = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];

	const [ player, setPlayer ] = useState('');

	const [ inputName, setInputName ] = useState('');

	const [ manoDeCartas, setManoDeCartas ] = useState([]);

	const [ cuenta, setCuenta ] = useState(0);

	const generateRandomCard = () => {
		return {
			pinta: pintas[Math.floor(Math.random()*pintas.length)],
			valor: valores[Math.floor(Math.random()*valores.length)],
		}
	}


	useEffect(()=>{
		// se ejecutara una unica vez
		console.log('Hola el componente Home ha nacido!') 
		calcularCuenta()
	}, [])

	const calcularCuenta = () => {
		for(let carta of manoDeCartas){
			
			if (cuenta == 10 && carta.valor == 'A') {
				setCuenta(cuenta + 11) 
				continue;
			}
			if( cuenta <= 20 && carta.valor == 'A') {
				setCuenta(cuenta + 1)
				continue;
			}
			if( ['J','Q','K'].includes(carta.valor) ) {
				setCuenta(cuenta + 10)
				continue;
			}
			setCuenta(cuenta + parseInt(carta.valor))
			continue;
		}
	}

	useEffect(()=>{
		// se ejecuta cada vez que cambia la mano de cartas
		calcularCuenta()
	},[manoDeCartas])

	return (<>
		<div className="d-flex flex-row  my-auto gap-2">
			{ !player && <>
				<h1>Bienvenido </h1>
				<input placeholder="player" type="text" value={inputName}
					onChange={ evento => setInputName(evento.target.value)}
				/>
				<button className="btn btn-warning"
					onClick={() => setPlayer(inputName)}
				>
					Salvar
				</button>
			</>
			}
			{
				
				manoDeCartas.map( (carta, index) => <Card key={index} 
					pinta={carta.pinta} valor={carta.valor} 
				/>)
			}

		</div>
			{ player != '' && <>
					<h1> Jugando como {player} </h1>
					<button className="btn btn-warning mt-1"
						onClick={() => setManoDeCartas([ ...manoDeCartas, generateRandomCard()])}
					>
						Pedir
					</button>
					<h1 className="text-white">Total: {cuenta}</h1>
				</>
			}
		</>
	);
};

export default Home;
