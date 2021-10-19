import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import iconMap from '../../assets/MapIcon.png';
import { removerAcentos } from '../../components/TextFunctions/index'
import './style.css';
import { SidebarCreate } from '../../components/Sidebar';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';

const happyMapIcon = L.icon({
  iconUrl: iconMap,

  iconSize: [48, 48],
  iconAnchor: [23, 48],
  popupAnchor: [0, -60]
})

export function CreateRoom() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [type, setType] = useState('');
  const [piso, setPiso] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [link, setLink] = useState('');
  const [latitudeUser, setLatitudeUser] = useState('');
  const [longitudeUser, setLongitudeUser] = useState('');

  useEffect(() => {
    if(campus=== ''){
      getLocation();
    } else {
      if(campus === 'bandeirantes') {
        setLatitudeUser('-23.108');
        setLongitudeUser('-50.3594239');
      } else if(campus === 'cornelio') {
        setLatitudeUser('-23.1747224');
        setLongitudeUser('-50.6700414');
      } else if(campus === 'jacarezinho') {
        setLatitudeUser('-23.1497471');
        setLongitudeUser('-49.9795701');
      }
    }
    
  }, [campus]);

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position: any) {
    setLatitudeUser(position.coords.latitude);
    setLongitudeUser(position.coords.longitude);
  }

  
  function handleMapClick(event: LeafletMouseEvent) {
    check("map")

    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
    check("image")
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;
    let index = 0;
    const data = new FormData();


    if (link === "") {
      index += 1;
      const element = document.getElementById('link')!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusLink')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }


    if (name === "") {
      index += 1;
      const element = document.getElementById('name')!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusName')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }

    if (campus === "") {
      index += 1;
      const element = document.getElementById("campus")!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusCampus')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }

    if (type === "") {
      index += 1;
      const element = document.getElementById("type")!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusType')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }

    if (piso === 0) {
      index += 1;
      const element = document.getElementById('piso')!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusPiso')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }


    if (description === "") {
      index += 1;
      const element = document.getElementById("description")!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusDescription')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }

    if (String(latitude) === "0") {
      index += 1;
      const status = document.getElementById('statusMap')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }

    if (String(longitude) === "0") {
      index += 1;
      const status = document.getElementById('statusMap')!;
      status.innerHTML = "* Campo obrigatório";
      status.style.display = "flex";
    }

    index += 1;
    const element = document.getElementById("set-image")!;
    element.style.border = "1px solid red";
    element.style.borderRadius = "20px";
    element.style.padding = "10px 10px 3px 10px";
    const status = document.getElementById('statusImage')!;
    status.innerHTML = "* Campo obrigatório";
    status.style.display = "flex";

    images.forEach(image => {
      if(image != null){
        index -= 1;
        const element = document.getElementById("set-image")!;
        element.style.border = "none";
        const status = document.getElementById('statusImage')!;
        status.style.display = "none";
      }
    })
    if (index === 0) {
      data.append('name', removerAcentos(name));
      data.append('nameShow', name)
      data.append('campus', removerAcentos(campus));
      data.append('type', (type));
      data.append('description', description);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('link', link);
      data.append('piso', String(piso));
      images.forEach(image => {
        data.append('images', image);
      })

      await api.post('/room', data);
      alert('Cadastro realizado com sucesso!');
    }else{
      alert('Cadastro incompleto, verifique se os campos estão preenchidos');
    }

  }

  async function check(aux: string) {
    if (aux === "name") {
      if (name === "") {
        const element = document.getElementById('name')!;
        element.style.border = "1px solid red";
        const status = document.getElementById('statusName')!;
        status.innerHTML = "* Campo obrigatório";
        status.style.display = "flex";
      } else {
        const element = document.getElementById('name')!;
        element.style.border = "1px solid #d3e2e5";
        const status = document.getElementById('statusName')!;
        status.style.display = "none";
      }
    }
    if (aux === "campus") {
      const element = document.getElementById('campus')!;
      element.style.border = "1px solid #d3e2e5";
      const status = document.getElementById('statusCampus')!;
      status.style.display = "none";
    }
    if (aux === "description") {
      if (description === "") {
        const element = document.getElementById("description")!;
        element.style.border = "1px solid red";
        const status = document.getElementById('statusDescription')!;
        status.innerHTML = "* Campo obrigatório";
        status.style.display = "flex";
      } else {
        const element = document.getElementById('description')!;
        element.style.border = "1px solid #d3e2e5";
        const status = document.getElementById('statusDescription')!;
        status.style.display = "none";
      }
    }

    if (aux === "link") {
      if (link === "") {
        const element = document.getElementById("link")!;
        element.style.border = "1px solid red";
        const status = document.getElementById('statusLink')!;
        status.innerHTML = "* Campo obrigatório";
        status.style.display = "flex";
      } else {
        const element = document.getElementById('link')!;
        element.style.border = "1px solid #d3e2e5";
        const status = document.getElementById('statusLink')!;
        status.style.display = "none";
      }
    }

    if (aux === "map") {
      const status = document.getElementById('statusMap')!;
      status.style.display = "none";

      const status2 = document.getElementById('statusMap')!;
      status2.style.display = "none";

    }

    if (aux === "type") {
      const element = document.getElementById('type')!;
      element.style.border = "1px solid #d3e2e5";
      const status = document.getElementById('statusType')!;
      status.style.display = "none";
    }

    if (aux === "piso") {
      const element = document.getElementById('piso')!;
      element.style.border = "1px solid #d3e2e5";
      const status = document.getElementById('statusPiso')!;
      status.style.display = "none";
    }

    if(aux === "image"){
      const element = document.getElementById("set-image")!;
      element.style.border = "none";
      const status = document.getElementById('statusImage')!;
      status.style.display = "none";

    }
  }

  return (
    <div id="page-create-room">
      <main>
        <SidebarCreate/>
        <form className="create-room-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Cadastrar Sala</legend>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="campus">Selecione o Campus</label>
                <div id="statusCampus" className="status">status</div>
              </div>
              <div id="campus" className="input-radio">
              <div>
                <input type="radio" name="radiobutton" onChange={() => { setCampus("jacarezinho"); check("campus")}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Jacarézinho</p>
                </div>
                
                <div>
                <input type="radio" name="radiobutton" onChange={() => { setCampus("cornelio"); check("campus")}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Cornélio procópio</p>
                </div>
                
                <div>
                <input type="radio" name="radiobutton" onChange={() => { setCampus("bandeirantes"); check("campus")}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Bandeirantes</p>
                </div>
              </div>
            </div>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="name">Localização da Sala</label>
                <div id="statusMap" className="status">status</div>
              </div>
            </div>
            <Map
              center={[Number(latitudeUser), Number(longitudeUser)]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0 ?
                  <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} /> :
                  null
              }

            </Map>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="name">Nome da Sala</label>
                <div id="statusName" className="status">status</div>
              </div>
              <input type="text" placeholder="Digite o nome da sala" id="name" value={name} onSelect={() => check("name")} onChange={e => setName(e.target.value)} />
            </div>
            
            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="about">Descrição<span>Máximo de 300 caracteres</span></label>
                <div id="statusDescription" className="status">status</div>
              </div>
              <textarea placeholder="Deixe aqui uma descrição sobre a sala" id="description" maxLength={300} value={description} onSelect={() => check("description")} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="type">Selecione o tipo da sala</label>
                <div id="statusType" className="status">status</div>
              </div>
              <div id="type" className="input-radio" onChange={()=>{check("type")}}>
                <div>
                  <input type="radio" value="sala" name="radioType" onChange={e => { setType(e.target.value)}}/>
                  <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Sala</p>
                </div>
                <div>
                <input type="radio" value="laboratório" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Laboratório</p>
                </div>
                <div>
                <input type="radio" value="secretaria" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Secretaria</p>
                </div>
                <div>
                <input type="radio" value="biblioteca" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Biblioteca</p>
                </div>
                <div>
                <input type="radio" value="banheiro" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Banheiro</p>
                </div>
                <div>
                <input type="radio" value="auditório" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Auditório</p>
                </div>
                <div>
                <input type="radio" value="clínica" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Clínica</p>
                </div>
                <div>
                <input type="radio" value="lanchonete" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Lanchonete</p>
                </div>
                <div>
                <input type="radio" value="lazer" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Lazer</p>
                </div>
                <div>
                <input type="radio" value="evento" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Evento</p>
                </div>
                <div>
                <input type="radio" value="acessibilidade" name="radioType" onChange={e => { setType(e.target.value)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Acessibilidade</p>
                </div>
              </div>
            </div>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="piso">Selecione o piso da sala</label>
                <div id="statusPiso" className="status">status</div>
              </div>
              <div id="piso" className="input-radio" onChange={()=>{check("piso")}}>
                <div>
                  <input type="radio" name="radioType" onChange={e => { setPiso(1)}}/>
                  <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Piso 1</p>
                </div>
                <div>
                <input type="radio" name="radioType" onChange={e => { setPiso(2)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Piso 2</p>
                </div>
                <div>
                <input type="radio" name="radioType" onChange={e => { setPiso(3)}}/>
                <p style={{marginLeft: "5px", color: "#5c8599", marginRight: "40px"}}>Piso 3</p>
                </div>
              </div>
            </div>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="images">Fotos</label>
                <div id="statusImage" className="status">status</div>
              </div>
              <div id="set-image" className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#0443d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImage} type="file" name="" id="image[]" />

            </div>

            <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="link">Link</label>
                <div id="statusLink" className="status">status</div>
              </div>
              <input type="text" placeholder="Digite o link da imagem" id="link" value={link} onChange={e => setLink(e.target.value)} onSelect={() => check("link")} />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}