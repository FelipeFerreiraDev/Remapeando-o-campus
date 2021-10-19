import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import iconMap from '../../assets/MapIcon.png';

import './style.css';
import { Sidebar } from "../../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Context } from '../../Context/AuthContext';
import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import { removerAcentos } from '../../components/TextFunctions/index'

const happyMapIcon = L.icon({
  iconUrl: iconMap,

  iconSize: [48, 48],
  iconAnchor: [23, 48],
  popupAnchor: [0, -60]
})

interface RoomProps {
  name: string;
  nameShow: string;
  piso: number;
  type: string;
  campus: string;
  latitude?: number;
  longitude?: number;
  description: string;
  image: {
    id: number;
    url: string;
  }[];
  link: string;
}

interface RouteParamsProps {
  id: string;
  name: string;
  campus: string;
}

export default function RoomDetails() {
  const { authenticated } = useContext(Context);

  const history = useHistory();
  const { id, name, campus } = useParams<RouteParamsProps>();
  const [room, setRoom] = useState<RoomProps>();
  //const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`room/${id}`).then(response => {
      setRoom(response.data)
    });
  }, [id, name, campus]);

  if (!room) {
    return <div></div>
  }

  async function handleDeleteRoom() {
    await api.delete(`/room/${room?.campus}/${removerAcentos(String(room?.name))}`);
    alert('Sala Deletada Com Sucesso!');
    history.push('/');
  }

  return (
    <div id="page-room">
      <Sidebar />
      <main>
        <div className="room-details">
          <div className="center-images">
            <div className="image-thumb">
              <img  src={room.link} alt={room?.name} />
              <div className="images">
                
                {/*room.image.map((image, index) => {
                  return (
                    <button
                      key={room.link}
                      className={activeImageIndex === index ? 'active' : ''}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={room.link} alt={room.name} />
                    </button>
                  )
                })*/}
              </div>
            </div>
          </div>


          <div className="room-details-content">
            <h1 style={{borderTop: "1px solid gray", paddingTop: "50px"}}>{room?.nameShow}</h1>
            <p><b>Tipo:</b>&nbsp;&nbsp;{room?.type} |&nbsp;<b>Piso:</b>&nbsp;&nbsp;{room?.piso}</p>
            <p><b>Descrição:</b>&nbsp;&nbsp;{room?.description}</p>

            <div className="map-container">
              <Map
                center={[
                  room?.latitude ? room.latitude : 0,
                  room?.longitude ? room.longitude : 0
                ]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[
                  room?.latitude ? room.latitude : 0,
                  room?.longitude ? room.longitude : 0
                ]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${room?.latitude},${room?.longitude}`}>
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>
            {
              authenticated ? (
                  <>
                    <button type="button" className="delete" onClick={handleDeleteRoom}>
                      Deletar Sala
                      <FiTrash2 color="white" size="28" />
                    </button>
                  </>
              ) : null
            }
          </div>
        </div>
      </main>
    </div>
  );
}