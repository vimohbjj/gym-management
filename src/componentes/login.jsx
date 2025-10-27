import React from 'react'
import { useRef, useId } from 'react'
import { toast } from 'react-toastify';
import registro from './registro';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const login = () => {
  const nombreUsu = useRef(null);
  const password = useRef(null);
  const idNomUsu = useId();
  const idPassword = useId();
  const navigate = useNavigate();

  let Login = () => {

    if (!nombreUsu.current.value || !password.current.value) {
      toast.warning("Por favor, complete todos los campos.");
      return;
    }

    fetch("https://movetrack.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "usuario": nombreUsu.current.value,
        "password": password.current.value
      })
    })
      .then(response => response.json())
      .then((datos) => {
        if(datos.codigo === 200){
          localStorage.setItem("apiKey", datos.apiKey);
          localStorage.setItem("id", datos.id);
          nombreUsu.current.value = "";
          password.current.value = "";
          navigate("/dashboard");
          toast.success("Login exitoso")
        } else if(datos.codigo === 409){
          toast.warning(datos.mensaje);
        } else {
          toast.error("error");
        }
      })
  }

  return (
    <section id="login">
      <h2>Login</h2>
      <form className='flex-col'>
        <p>
          <label htmlFor={idNomUsu}>Nombre usuario: </label>
          <input type="text" name="nombre" id={idNomUsu}  ref={nombreUsu} />
        </p>
        <p>
          <label htmlFor={idPassword}>Password: </label>
          <input type="password" name="password" id={idPassword}  ref={password} />
        </p>
        <input type="button" value="login" onClick={Login} />
      </form>
      <NavLink to="/registro">Crear cuenta</NavLink>
    </section>
  )
}

export default login