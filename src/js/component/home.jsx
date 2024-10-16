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

	const [manoDeCartasCasa, setManoDeCartasCasa] = useState([])

	const [ cuenta, setCuenta ] = useState(0);

	const [ blackJack, setBlackJack ] = useState(null);

	const generateRandomCard = () => {
		return {
			pinta: pintas[Math.floor(Math.random()*pintas.length)],
			valor: valores[Math.floor(Math.random()*valores.length)],
		}
	}

	const isVictory = () => {
		if ( cuenta == 21 ){
			setBlackJack(true)
			return
		}
		if (cuenta > 21 ){
			setBlackJack(false)
			return
		}
		setBlackJack(null)
		return
	}


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

	useEffect( () => {
		setManoDeCartasCasa([ generateRandomCard(), generateRandomCard() ])
	},[])

	useEffect(()=>{
		calcularCuenta()
	},[manoDeCartas])

	useEffect(()=>{
		isVictory()
	}, [cuenta])

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

			<div className="d-flex flex-column text-center w-100">
				{ player && <h1>Cartas de la casa</h1> }
				<div className="d-flex flex-row  my-auto gap-2 justify-content-center w-100">
					{
						player && manoDeCartasCasa.map( (carta, index) => <Card key={index} 
							pinta={carta.pinta} valor={carta.valor} 
						/>)
					}
				</div>
			</div>

		</div>
			{ player != '' && <>
					<h1> Jugando como {player} </h1>
					<div className="d-flex flex-row  my-auto gap-2">
						{
							manoDeCartas.map( (carta, index) => <Card key={index} 
								pinta={carta.pinta} valor={carta.valor} 
							/>)
						}
					</div>

					{
						blackJack == null &&
						<button className="btn btn-warning mt-1"
							onClick={() => setManoDeCartas([ ...manoDeCartas, generateRandomCard()])}
						>
							Pedir
						</button>
					}

					<h1 className="text-white">Total: {cuenta}</h1>
					{  blackJack == false && <h1 className="text-danger">Perdiste</h1>	}
					{  blackJack  && <h1 className="text-white">Ganaste</h1>	}

					{
						blackJack !== null && <>
							<button className="btn btn-info mt-1"
								onClick={() => {
									setCuenta(0)
									setManoDeCartas([])
									setBlackJack(null)
									// setPlayer('') Reiniciar el nombre de jugador tambien
								}}
							>
								Jugar de Nuevo
							</button>
						</>
					}

				</>
			}
		</>
	);
};

export default Home;
