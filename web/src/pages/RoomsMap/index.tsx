import './style.css';

import { Map, TileLayer, Marker, Popup, Polygon, Rectangle, Pane, Path } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import Leaflet from 'leaflet';
import { useEffect } from 'react'
import { CardRoomSearch } from "../../components/CardRoomList";
import { FiArrowRight } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';
import iconUser from '../../assets/UserIcon.png';
import icon1 from '../../assets/Markers/01.png';
//import icon2 from '../../assets/Markers/02.png';
//import icon3 from '../../assets/Markers/03.png';
//import icon4 from '../../assets/Markers/04.png';
import icon5 from '../../assets/Markers/05.png';
//import icon6 from '../../assets/Markers/06.png';
import icon7 from '../../assets/Markers/07.png'

import { ExceptionLocation } from '../../components/Exceptions';

import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useState } from 'react';
import { removerAcentos } from '../../components/TextFunctions/index'

interface RoomsProps {
    id: number;
    name: String;
    nameShow: String;
    piso: number;
    type: String;
    latitude: number;
    longitude: number;
    weight: number;
}

interface RoomProps {
    id: number;
    name: string;
    type: string;
    nameShow: string;
    piso: number;
    latitude?: number;
    longitude?: number;
    description: string;
    image: {
        id: number;
        url: string;
    }[];
}

interface RouteParamsProps {
    latitude: string;
    longitude: string;
}

export function RoomMap() {
    const [zoomIcon, setScale] = useState(48);
    const [anchorIcon, setAnchor] = useState(23);
    const [popAnchor, setPopAnchor] = useState(-60);


    const mapIcon = Leaflet.icon({
        iconUrl: icon1,
    
        iconSize: [zoomIcon, zoomIcon],
        iconAnchor: [anchorIcon, zoomIcon],
        popupAnchor: [0, popAnchor]
    })
    
    const userIcon = Leaflet.icon({
        iconUrl: iconUser,
    
        iconSize: [zoomIcon, zoomIcon],
        iconAnchor: [anchorIcon, zoomIcon],
        popupAnchor: [0, popAnchor]
    })
    
    const mapBiblioteca = Leaflet.icon({
        iconUrl: icon5,
    
        iconSize: [zoomIcon, zoomIcon],
        iconAnchor: [anchorIcon, zoomIcon],
        popupAnchor: [0, popAnchor]
    })
    
    const mapEvento = Leaflet.icon({
        iconUrl: icon7,
    
        iconSize: [zoomIcon, zoomIcon],
        iconAnchor: [anchorIcon, zoomIcon],
        popupAnchor: [0, popAnchor]
    })
    

    const [state, setState] = useState(false)
    let history = useHistory();
    const [position, setPosition] = useState({ lat: 0, long: 0 })
    const { latitude, longitude } = useParams<RouteParamsProps>();
    const [rooms, setRooms] = useState<RoomsProps[]>([]);
    const [roomss, setRoomss] = useState<RoomProps[]>([]);
    const [busca, setBusca] = useState('');
    const [campus, setCampus] = useState('');
    const [inputCheck, setCheck] = useState(true);

    const [loading, setLoading] = useState(false);
    const [latitudeUser, setLatitudeUser] = useState('');
    const [longitudeUser, setLongitudeUser] = useState('');

    const [config, setConfig] = useState("");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    function showPosition(position: any) {
        setLatitudeUser(position.coords.latitude);
        setLongitudeUser(position.coords.longitude);
    }


    useEffect(() => {
        api.get('room').then(response => {
            setRooms(response.data)
            setLoading(true);
        });

    }, []);


    useEffect(() => {
        api.get('room').then(response => {
            setRooms(response.data)
            setLoading(true);
        });

        if(latitude === String(-23.108)){
            setCampus("bandeirantes")
        }
        if(latitude === String(-23.1497471)){
            setCampus("jacarezinho")
        }
        if(latitude === String(-23.1747224)){
            setCampus("cornelio")
        }
        
        if (campus && busca) {
            api.get(`roomList/${campus}/${removerAcentos(busca)}`).then(response => {
                setRoomss(response.data);
            });
        }
    }, [busca, campus, latitude]);

    if (!rooms) {
        return <div></div>
    }

    async function configMenu(x: string) {
        if(x === "bandeirantes"){
            const m1 = document.getElementById('bandeirantes')!;
            m1.style.color = "black"
            const op1 = document.getElementById('jacarezinho')!;
            op1.style.color = "white"
            const op2 = document.getElementById('cornelio')!;
            op2.style.color = "white"
        }
        if(x === "jacarezinho"){
            const m2 = document.getElementById('jacarezinho')!;
            m2.style.color = "black"
            const op3 = document.getElementById('bandeirantes')!;
            op3.style.color = "white"
            const op4 = document.getElementById('cornelio')!;
            op4.style.color = "white"
        }
        if(x === "cornelio"){
            const m3 = document.getElementById('cornelio')!;
            m3.style.color = "black"
            const op5 = document.getElementById('bandeirantes')!;
            op5.style.color = "white"
            const op6 = document.getElementById('jacarezinho')!;
            op6.style.color = "white"
        }
        
    }

    function handleMapClick(event: LeafletMouseEvent) {    
        const { lat, lng } = event.latlng;

        setPosition({
          lat: lat,
          long: lng
        });
      }

    getLocation();

    if (!loading) {
        return null;
    }

    function yourLocation(){
        if(latitudeUser !== "" && longitudeUser !== ""){
            history.push(`/Map/Room/${latitudeUser}/${longitudeUser}`)
        }else{
            setState(true)
            setTimeout(() => setState(false), 8000);
        }
    }

    async function showMenu() {
        const toggle = document.getElementById('toggle')!;
        const nav = document.getElementById('sidebar');
        nav?.classList.toggle('active');
        const card = document.getElementById('card')!;

        if( nav?.classList.contains('active')){
            toggle.style.display = "none"
            card.style.display = "none"
        }else{
            toggle.style.display = "block"
            card.style.display = "block"
        }
    }

    async function range(params: string) {
        const value = Number(params)
        if(value === 1){
            setAnchor(7)
            setScale(16)
            setPopAnchor(-20)

        }
        if(value === 2){
            setAnchor(10)
            setScale(23)
            setPopAnchor(-30)

        }
        if(value === 3){
            setAnchor(11)
            setScale(25)
            setPopAnchor(-35)
        }
        if(value === 4){
            setAnchor(13)
            setScale(28)
            setPopAnchor(-40)
        }
        if(value === 5){
            setAnchor(14)
            setScale(30)
            setPopAnchor(-45)
        }
        if(value === 6){
            setAnchor(16)
            setScale(34)
            setPopAnchor(-50)
        }
        if(value === 7){
            setAnchor(20)
            setScale(42)
            setPopAnchor(-55)
        }
        if(value === 8){
            setAnchor(23)
            setScale(48)
            setPopAnchor(-60)
        }
    }
    const pathBlack= {fillOpacity: 0.4, color: "black"};
    const pathWhite= {fillOpacity: 0.4, color: "white"};
    const pathGray= {fillOpacity: 0.4, color: "gray"};
    const pathGreen= {fillOpacity: 0.4, color: "green"};
    const pathOrange= {fillOpacity: 0.4, color: "orange"};

    
    return (
        <div className="pageMap">
            {
                state ? (
                    <>
                        <ExceptionLocation></ExceptionLocation>
                    </>
                ): ''
            }
            <div className="topnav-map">
                <div className="search" id="toggle">
                    <button onClick={showMenu}>
                        <i className="fa fa-bars fa-lg" style={{color: "black", cursor: "pointer", top: 0, left: 0}}></i>
                    </button>
                    <input onChange={e => setBusca(e.target.value)} placeholder="Digite o nome da sala" id="input-text" type="text" />
                </div>
                <div id="card">
                {
                    roomss.map(room => {
                        return (
                            <CardRoomSearch room={room} key={room.id}/>
                        )
                    })
                }
                </div>
            </div>
            <div className="topnav-map" id="sidebar">
                <ul>   
                <div className="tag"> 
                    <div className="div">
                        <button style={{cursor: "pointer"}} type="button" className="button-img-bar" onClick={() => history.push("/")}>
                            <img src='https://cdn.discordapp.com/attachments/885546266912776233/895855746066055219/header.png' alt="logo"/>
                        </button>
                    </div> 
                    <button className="button-close" style={{color: "white", position: "absolute", right: 0, marginRight: "10px"}} onClick={showMenu}></button>
                </div>
                <div className="tag"> 
                    <ul>
                        <li><i className="fa fa-map " style={{color: "white", marginRight: "10px", fontSize: "20px", marginBottom: "10px"}}></i>
                        <label style={{fontWeight: "bold"}}>Campus</label></li>
                        <div className="radio">
                            <label id="jacarezinho">Jacarézinho
                            <input type="button" value="" onClick={() => {history.push("/Map/Room/-23.1497471/-49.9795701");configMenu('jacarezinho')}}/>
                            </label><br />
                            <label id="cornelio">Cornélio Procópio
                            <input type="button" value="" onClick={() => {history.push("/Map/Room/-23.1747224/-50.6700414");configMenu('cornelio')}}/>
                            </label><br />
                            <label id="bandeirantes">Bandeirantes
                            <input type="button" value="" onClick={() => {history.push("/Map/Room/-23.108/-50.3594239");configMenu('bandeirantes')}}/>
                            </label><br />
                        </div>
                    </ul>
                </div>
                <div className="tag"> 
                    <ul>
                        <div className="radio">
                            <label>
                            <i className="fa fa-user " style={{color: "white", marginRight: "10px", fontSize: "20px", marginBottom: "10px"}}></i>
                            <input type="button" value="" onClick={yourLocation}/>
                            Sua localização
                            </label><br />
                        </div>
                    </ul>
                </div>
                <div className="tag"> 
                    <ul>
                        <li><i className="fa fa-cog" style={{color: "white", marginRight: "10px", fontSize: "20px", marginBottom: "10px"}}></i>
                        <label style={{fontWeight: "bold"}}>Configurações</label></li>
                        <label style={{fontSize: "15px", lineHeight: "20px", fontWeight: 100}}>Tamanho icone:&nbsp;&nbsp;&nbsp;
                            <input style={{cursor: "pointer", width: "110px"}} type="range" min="1" max="8" step="1" onChange={e => {range(e.target.value)}}/>
                        </label><br/>
                        <div className="radio" style={{lineHeight: "25px"}}>
                            <label>
                                <input checked={inputCheck} id="input-checked" type="radio" name="radioConfig" value="" onChange={e => { setConfig(e.target.value); setCheck(true)}}/>  Todas opções
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="evento" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Evento
                            </label><br/>
                            <label>
                                <input id="sala" type="radio" name="radioConfig" value="sala" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Sala
                            </label><br/>                            
                            <label>
                                <input type="radio" name="radioConfig" value="laboratório" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Laboratório
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="secretaria" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Secretaria
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="biblioteca" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Biblioteca
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="banheiro" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Banheiro
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="auditorio" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Auditório
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="clínica" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Clinica
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="lanchonete" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Lanchonete
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="lazer" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Lazer
                            </label><br/>
                            <label>
                                <input type="radio" name="radioConfig" value="acessibilidade" onChange={e => { setConfig(e.target.value); setCheck(false)}}/>  Acessibilidade
                            </label><br/>
                        </div>
                    </ul>
                </div>
                <div className="tag"> 
                    <ul>
                        <li><i className="fa fa-info-circle " style={{color: "white", marginRight: "10px", fontSize: "20px", marginBottom: "10px"}}></i>
                        <label style={{fontWeight: "bold"}}>Informações</label></li>
                        <li><label>Latitude: {position.lat}</label></li>
                        <li><label>Longitude: {position.long}</label></li>
                    </ul>
                </div>
                </ul>
            </div>
            <div>
                
            </div>
            <Map id='map' 
            center={[Number(latitude), Number(longitude)]} 
            zoom={17} 
            zoomControl={false} 
            className="map" 
            style={{width: '100%', height: '100%', zIndex: 0}}
            onclick={handleMapClick}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {
                position.lat !== 0 ?
                  <Marker interactive={false} icon={mapBiblioteca} position={[position.lat, position.long]} /> :
                  null
              }
                {
                    latitudeUser ? (
                        <Marker
                            icon={userIcon}
                            position={[Number(latitudeUser), Number(longitudeUser)]}
                        >
                            <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                Você está aqui!
                            </Popup>
                        </Marker>
                    ) : null
                }

                {
                    config === "lazer" ?
                        <div>
                            <Polygon positions={[[-23.107799402867197, -50.36403715610504], [-23.107419482752665, -50.363388061523445], [-23.108243463976237, -50.362851619720466], [-23.10859377781491, -50.36351144313812]]} {...pathBlack} />
                            <Polygon positions={[[-23.107162912716614, -50.36326467990876], [-23.106403067811016, -50.361955761909485], [-23.10838161602175, -50.360641479492195], [-23.109240129118405, -50.36217570304871], [-23.108445757994584, -50.36270141601563], [-23.108317474018303, -50.36250829696656]]} />
                        </div> : null
                }

                {
                    config === "" ?
                        <div>
                            <Polygon positions={[[-23.107799402867197, -50.36403715610504], [-23.107419482752665, -50.363388061523445], [-23.108243463976237, -50.362851619720466], [-23.10859377781491, -50.36351144313812]]} {...pathBlack}>
                            <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                <div className="">
                                    <p style={{fontSize: "20px", fontWeight: 1000, marginBottom: "0", marginTop: "0"}}>Estádio Comendador Luiz Meneghel</p>
                                    <p style={{fontSize: "14px", fontWeight: 600, marginBottom: "0", marginTop: "0"}}>lazer</p>
                                </div>
                                <Link to={`/Map/Room/79`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                            </Polygon>
                            <Polygon positions={[[-23.107162912716614, -50.36326467990876], [-23.106403067811016, -50.361955761909485], [-23.10838161602175, -50.360641479492195], [-23.109240129118405, -50.36217570304871], [-23.108445757994584, -50.36270141601563], [-23.108317474018303, -50.36250829696656]]}>
                            <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                <div className="">
                                    <p style={{fontSize: "20px", fontWeight: 1000, marginBottom: "0", marginTop: "0"}}>Área 01</p>
                                </div>
                            </Popup>
                            </Polygon>
                        </div> : null
                }

                {
                    rooms.map(rooms => {
                        if(config === ""){
                            if (rooms.type === "evento"){
                                return(
                                    <Marker
                                    key={rooms.id}
                                    icon={mapEvento}
                                    position={[rooms.latitude, rooms.longitude]}
                                    >
                                        <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                            <div className="">
                                                <p style={{fontSize: "20px", fontWeight: 1000, marginBottom: "0", marginTop: "0"}}>{rooms.nameShow}</p>
                                                <p style={{fontSize: "14px", fontWeight: 600, marginBottom: "0", marginTop: "0"}}>{rooms.type} | Piso: {rooms.piso}</p>
                                            </div>
                                            <Link to={`/Map/Room/${rooms.id}`}>
                                                <FiArrowRight size={20} color="#FFF" />
                                            </Link>
                                        </Popup>
                                        
                                    </Marker>
                                )
                            }else{
                                return(
                                    <Marker
                                    key={rooms.id}
                                    icon={mapIcon}
                                    position={[rooms.latitude, rooms.longitude]}
                                    >
                                        <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                            <div className="">
                                                <p style={{fontSize: "20px", fontWeight: 1000, marginBottom: "0", marginTop: "0"}}>{rooms.nameShow}</p>
                                                <p style={{fontSize: "14px", fontWeight: 600, marginBottom: "0", marginTop: "0"}}>{rooms.type} | Piso: {rooms.piso}</p>
                                            </div>
                                            <Link to={`/Map/Room/${rooms.id}`}>
                                                <FiArrowRight size={20} color="#FFF" />
                                            </Link>
                                        </Popup>
                                        
                                    </Marker>
                                )
                            }

                        }if(rooms.type === config ){
                            if (rooms.type === "evento"){
                                return(
                                    <Marker
                                    key={rooms.id}
                                    icon={mapEvento}
                                    position={[rooms.latitude, rooms.longitude]}
                                    >
                                        <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                            <div className="">
                                                <p style={{fontSize: "20px", fontWeight: 1000, marginBottom: "0", marginTop: "0"}}>{rooms.nameShow}</p>
                                                <p style={{fontSize: "14px", fontWeight: 600, marginBottom: "0", marginTop: "0"}}>{rooms.type} | Piso: {rooms.piso}</p>
                                            </div>
                                            <Link to={`/Map/Room/${rooms.id}`}>
                                                <FiArrowRight size={20} color="#FFF" />
                                            </Link>
                                        </Popup>
                                        
                                    </Marker>
                                )
                            }else{
                                return(
                                    <Marker
                                    key={rooms.id}
                                    icon={mapIcon}
                                    position={[rooms.latitude, rooms.longitude]}
                                    >
                                        <Popup closeButton={false} minWidth={240} maxHeight={240} className="mapPopup">
                                            <div className="">
                                                <p style={{fontSize: "20px", fontWeight: 1000, marginBottom: "0", marginTop: "0"}}>{rooms.nameShow}</p>
                                                <p style={{fontSize: "14px", fontWeight: 600, marginBottom: "0", marginTop: "0"}}>{rooms.type} | Piso: {rooms.piso}</p>
                                            </div>
                                            <Link to={`/Map/Room/${rooms.id}`}>
                                                <FiArrowRight size={20} color="#FFF" />
                                            </Link>
                                        </Popup>
                                        
                                    </Marker>
                                )
                            }
                        }
                    })
                }
            </Map>        
        </div>
    )
}