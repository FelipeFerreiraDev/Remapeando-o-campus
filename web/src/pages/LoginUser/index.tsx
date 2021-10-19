import './style.css';
import { Sidebar } from '../../components/Sidebar';

import { FormEvent, useState } from "react";

import { Context } from '../../Context/AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticated, handleLogin, handleLogout } = useContext(Context);
  const [submit, setSubmit] = useState(false);
  const history = useHistory();
  const [type, setType] = useState('password');

  async function check(aux: string) {
    if (aux === "email") {
      if (email === "") {
        const element = document.getElementById('name')!;
        element.style.border = "1px solid red";
        const status = document.getElementById('statusEmail')!;
        status.innerHTML = "* Campo obrigatório";
        status.style.display = "flex";
      } else {
        const element = document.getElementById('name')!;
        element.style.border = "1px solid #d3e2e5";
        const status = document.getElementById('statusEmail')!;
        status.style.display = "none";
      }
    }
    if (aux === "senha") {
      if (password === "") {
        const element = document.getElementById('senha')!;
        element.style.border = "1px solid red";
        const status = document.getElementById('statusSenha')!;
        status.innerHTML = "* Campo obrigatório";
        status.style.display = "flex";
      } else {
        const element = document.getElementById('senha')!;
        element.style.border = "1px solid #d3e2e5";
        const status = document.getElementById('statusSenha')!;
        status.style.display = "none";
      }
    }
  }

  async function handleSubmit(event: FormEvent) {
    let index = 0;
    if (email !== "") {
      index += 1
    } else {
      const element = document.getElementById('name')!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusEmail')!;
      status.innerHTML = "* Email inválido";
      status.style.display = "flex";
    }

    if (password !== "") {
      index += 1
    } else {
      const element = document.getElementById('senha')!;
      element.style.border = "1px solid red";
      const status = document.getElementById('statusSenha')!;
      status.innerHTML = "* Senha inválida";
      status.style.display = "flex";
    }
    event.preventDefault();

    if (index === 2){
      handleLogin(email, password);
    }
    setSubmit(true)
    const status = document.getElementById('status')!;
    if(authenticated === false){
      status.innerHTML = "Login inválido";
      status.style.display = "flex";
    }else{
      status.style.display = "none";
    }
  }

  async function handleSair() {
    handleLogout();
    history.push('/');
  }

  function handleShowPassword() {
    const eye = document.getElementById('eye')!;
    const eyeSlash = document.getElementById('eye-slash')!;
    if(type==='password') {
      eye.style.display = "none"
      eyeSlash.style.display = "block"
      setType('text')
    } else {
      eyeSlash.style.display = "none"
      eye.style.display = "block"
      setType('password')
    }
  }

  
  return (
    <div id="page-create-room">
      <main>
        <Sidebar />
        <form className="create-room-form" onSubmit={handleSubmit}>
          {
            authenticated ? (
              <>
                <div className="container-atencao">
                  <p>
                    ATENÇÃO!
                  </p>
                  <p>
                    Você está logado como Administrador
                  </p>
                </div>
                <br></br>
              </>
            ) : null
          }


          {
            authenticated === false ?
            <fieldset>
              <legend>Login de usuário</legend>
              <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="name">Email</label>
                <div id="statusEmail" className="status">status</div>
              </div>
              <input
                type="text"
                placeholder="Digite o seu email de login"
                id="name"
                value={email}
                onChange={e => {setEmail(e.target.value)}}
                onSelect={() => check("email")}
              />
              </div>
              <div className="input-block">
              <div className="statusContainer">
                <label htmlFor="name">Senha</label>
                <div id="statusSenha" className="status">status</div>
              </div>
              
              <div className="showpass">
                <input
                  type={type}
                  placeholder="Digite a sua senha"
                  id="senha"
                  value={password}
                  onChange={e => {setPassword(e.target.value)}}
                  onSelect={() => check("senha")}
                />
                <span id="eye" className="fa fa-lg fa-eye field-icon toggle-password" onClick={handleShowPassword}></span>
                <span id="eye-slash" style={{display: "none"}} className="fa fa-lg fa-eye-slash field-icon toggle-password" onClick={handleShowPassword}></span>
                </div>
              </div>
              <div id="status" className="statusCenter">status</div>
              <button className="confirm-button" type="submit">
                Confirmar
              </button>
              </fieldset>
            : null
          }

          {
            authenticated ? (
              <>
                <button className="confirm-button" type="button" onClick={handleSair} style={{backgroundColor: "#fa4c4c"}}>
                  Fazer Logout | Sair do modo Administrador
                </button>
              </>
            ): null
          }
        </form>
      </main>
    </div>
  );
}