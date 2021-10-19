import './style.css';

import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

interface RoomProps {
    room: {
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
            url?: string;
        }[];
        link?: string;
    }
}

export function CardRoomList({ room, ...rest }: RoomProps) {

    if (!room) {
        console.log(room)
        return <div></div>
    }

    return (
        <div className="containerList">
            <div className="containerTitle">
                {room.link ? <img src={room.link} alt={room.name} /> : <div></div>}
            </div>
            <div className="containerDescription">
                <div className="title">
                    {room.nameShow}
                </div>
                <h4>
                    Descrição
                </h4>
                <p>
                    {room.description}
                </p>
            </div>
            <div className="linkContainer">
                <Link to={`/Map/Room/${room.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                </Link>
            </div>
        </div>

    );
}

export function CardRoomSearch({ room, ...rest }: RoomProps) {

    if (!room) {
        return <div></div>
    }

    return (
        <Link to={`/Map/Room/${room.id}`} style={{textDecoration: "none"}}>
            <div className="containerList2">
                <div className="containerTitle2">
                    {room.link ? <img src={room.link} alt={room.name} /> : <div></div>}
                </div>
                <div className="containerDescription2">
                    <div className="title2">
                        {room.nameShow}
                    </div>
                    <p>
                        {room.type} | Piso: {room.piso}
                    </p>
                </div>
                <div style={{height: "100%", width: "60px", display: "flex", justifyContent: "flex-end"}}>
                </div>
            </div>
        </Link>

    );
}