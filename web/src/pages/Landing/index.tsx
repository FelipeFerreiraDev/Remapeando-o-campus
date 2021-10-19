import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';
import { useContext } from 'react';
import logo from '../../assets/UenpLogo.png';

import './style.css';


export function LandingPage() {

    let history = useHistory();
    const { authenticated, handleLogout } = useContext(Context);

    async function handleSair() {
        handleLogout();
        history.push('/');
    }

    return (
        <div className="container gradient">
            <div className="Clouds">
                <div className="container-center">
                    <div className="container-itens">
                        <img className="img" src={logo} alt="UENP Logo" />
                        <Link className="button-class" to={`/Map/Room/-23.1497471/-49.9795701`}>
                            Jacarézinho
                        </Link>
                        <Link className="button-class" to={`/Map/Room/-23.1747224/-50.6700414`}>
                            Cornélio Procópio
                        </Link>
                        <Link className="button-class" to={`/Map/Room/-23.108/-50.3594239`}>
                            Bandeirantes
                        </Link>
                        <Link className="button-class" to={`/Map/RoomList`} style={{backgroundColor: "#0066ff"}}>
                            Procurar Sala
                        </Link>

                        {
                            authenticated ? (
                                <>
                                </>
                            ) :
                            <Link className="button-class" to={`/User/Login`} style={{backgroundColor: "#2b80ff"}}>
                                Entrar como administrador
                            </Link>
                        } 
                        {
                            authenticated ? (
                                <>
                                    <div style={{width: "100%", border: "1px solid #d3e2e5", marginBottom: "10px"}}>
                                    </div>
                                    <Link className="button-class" id="btn" type="button" to={`/Map/CreateRoom`}>Criar sala</Link>
                                    <Link className="button-class" id="btn" type="button" to={`/Map/DeleteRoom`}>Deletar sala</Link>
                                    <button className="button-class" type="button" onClick={handleSair} style={{backgroundColor: "#fa4c4c"}}>Fazer Logout</button>
                                </>
                            ) : null
                        } 
                        <div className="container-atencao">
                            <p>
                                ATENÇÃO!
                            </p>
                            <p>
                                A localização de algumas </p>
                            <p>
                                salas no mapa pode não ser exata!
                            </p>
                            <p>
                                O site ainda está em desenvolvimento
                            </p>

                        </div>
                    </div>
                </div>

                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
            </div>
        </div>
    );
}