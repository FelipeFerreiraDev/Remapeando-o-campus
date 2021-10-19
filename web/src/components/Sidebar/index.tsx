import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import './style.css';

import { Context } from '../../Context/AuthContext';
import { useContext } from 'react';

import logoEquipe from '../../assets/logo2Equipe.png';

export function Sidebar() {
    const { goBack } = useHistory();
    const { authenticated, handleLogout } = useContext(Context);

    async function handleSair() {
        handleLogout();
        history.push('/');
      }
    
    
    let history = useHistory();


    return (
        <aside className="app-sidebar-adm">
            <button style={{marginBottom: "20px"}} type="button" className="button-img" onClick={() => history.push("/")}>
                <img src={logoEquipe} title="Voltar ao início" alt="Voltar" />
            </button>
            {
                authenticated ? (
                    <>
                        <button className="button2" id="select" type="button" onClick={() => history.push("/Map/CreateRoom")}>Criar sala</button>
                        <button className="button2" id="btn" type="button" onClick={() => history.push("/Map/DeleteRoom")}>Deletar sala</button>
                        <button className="button2" type="button" onClick={handleSair} style={{backgroundColor: "#fa4c4c"}}>Fazer Logout</button>
                    </>
                ) : null
            }
            
            <p className="icon2 goback" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </p>
        </aside>
    )
}

export function SidebarCreate() {
    const { authenticated, handleLogout } = useContext(Context);
    const { goBack } = useHistory();

    async function handleSair() {
        handleLogout();
        history.push('/');
      }
    

    let history = useHistory();

    return (
        <aside className="app-sidebar-adm">
            <button style={{marginBottom: "20px"}} type="button" className="button-img" onClick={() => history.push("/")}>
                <img src={logoEquipe} title="Voltar ao início" alt="Voltar" />
            </button>
            {
                authenticated ? (
                    <>
                        <button className="button1" id="select" type="button">Criar sala</button>
                        <button className="button2" id="btn" type="button" onClick={() => history.push("/Map/DeleteRoom")}>Deletar sala</button>
                        <button className="button2" type="button" onClick={handleSair} style={{backgroundColor: "#fa4c4c"}}>Fazer Logout</button>
                    </>
                ) : null
            }

            <p className="icon2 goback" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </p>
        </aside>
    )
}

export function SidebarDelete() {
    const { authenticated, handleLogout } = useContext(Context);
    const { goBack } = useHistory();

    async function handleSair() {
        handleLogout();
        history.push('/');
      }
    

    let history = useHistory();

    return (
        <aside className="app-sidebar-adm">
            <button style={{marginBottom: "20px"}}  type="button" className="button-img" onClick={() => history.push("/")}>
                <img src={logoEquipe} title="Voltar ao início" alt="Voltar" />
            </button>
            {
                authenticated ? (
                    <>
                        <button className="button2" id="select" type="button" onClick={() => history.push("/Map/CreateRoom")}>Criar sala</button>
                        <button className="button1" id="btn" type="button" >Deletar sala</button>
                        <button className="button2" type="button" onClick={handleSair} style={{backgroundColor: "#fa4c4c"}}>Fazer Logout</button>
                    </>
                ) : null
            }

            <p className="icon2 goback" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </p>
        </aside>
    )
}
