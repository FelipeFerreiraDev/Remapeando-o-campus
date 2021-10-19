import { useEffect, useState } from "react";
import { CardRoomList } from "../../components/CardRoomList";
import { Sidebar } from "../../components/Sidebar";
import api from "../../services/api";
import { removerAcentos } from '../../components/TextFunctions/index'

import './style.css';

interface RoomProps {
    id: number;
    name: string;
    nameShow: string;
    piso: number; 
    type: string;
    latitude?: number;
    longitude?: number;
    description: string;
    image: {
        id: number;
        url: string;
    }[];
    link?: string;
}

export function RoomList() {
    const [busca, setBusca] = useState('');
    const [rooms, setRooms] = useState<RoomProps[]>([]);
    const [campus, setCampus] = useState('');

    useEffect(() => {
        if (campus && busca && busca !== "") {
            api.get(`roomList/${campus}/${removerAcentos(busca)}`).then(response => {
                setRooms(response.data);
            });
        }

    }, [busca, campus]);

    if (!rooms) {
        return <div></div>
    }

    async function check(s: string) {
        const element = document.getElementById('input-text')!;
        element.removeAttribute("disabled");
        setCampus(s);
    }

    return (

        <div id="page-room">
            <Sidebar />
            <main>
                <div className="room-list">
                    <div className="room-list-container">
                        <h2>
                            Lista de Salas
                        </h2>
                        <div className="input-radio-roomlist" style={{marginBottom: "15px"}}>
                            <input type="radio" name="radiobutton" onChange={() => check("jacarezinho")} />
                            <label>Jacarézinho</label><br />
                            <input type="radio" name="radiobutton" onChange={() => check("cornelio")} />
                            <label>Cornélio procópio</label><br />
                            <input type="radio" name="radiobutton" onChange={() => check("bandeirantes")} />
                            <label>Bandeirantes</label>
                        </div>

                        <input disabled placeholder="Selecione um campus e digite o nome da sala" id="input-text" className="input-text" type="text" value={busca} onChange={e => setBusca(e.target.value)} />
                        {
                            rooms.map(room => {
                                return (
                                    <CardRoomList room={room} key={room.id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

//<button onClick={() => alert("Em desenvolvimento...")}>Filtrar Por</button>