import { useRef, useEffect, useId } from "react"
import { useDispatch, useSelector } from "react-redux";
import { guardarPaises } from "../features/paisesSlice";
import SelectPaises from "./selectPaises";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const registro = () => {
  let nombre = useRef(null);
  let password = useRef(null);
  let pais = useRef(null);
  const nombreId = useId();
  const passwordId = useId();
  const paisId = useId();
  const navigate = useNavigate();

  let registrarUsuario = () => {
    fetch("https://movetrack.develotion.com/usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "usuario": nombre.current.value,
        "password": password.current.value,
        "idPais": pais.current.value
      })
    })
      .then(response => response.json())
      .then((datos) => {
        console.log(datos);
        if (datos.codigo === 200) {
          localStorage.setItem("apiKey", datos.apiKey);
          localStorage.setItem("id", datos.id);
          nombre.current.value = "";
          password.current.value = "";
          navigate("/dashboard");
          toast.success("Registro exitoso");
        } else if (datos.codigo === 409) {
          toast.warning(datos.mensaje);
        } else {
          toast.error("Error inseperado");
        }
      })
  }


  return (
    <section>
      <h2>Registro</h2>
      <form>
        <p>
          <label htmlFor={nombreId}>Nombre de usuario: </label>
          <input type="text" name="nombreRegistro" id={nombreId} ref={nombre} />
        </p>
        <p>
          <label htmlFor={passwordId}>Password: </label>
          <input type="text" name="passwordRegistro" id={passwordId} ref={password} />
        </p>
        <p>
          <label htmlFor={paisId}>Pais: </label>
          <SelectPaises ref={pais} />
        </p>
        <input type="button" value="Registrarse" onClick={registrarUsuario} />
      </form>
      <NavLink to="/">Iniciar sesion</NavLink>
    </section>
  )
}

export default registro