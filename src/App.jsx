import logo from "./logo.svg";
import "./App.css";
import Swal from "sweetalert2";
import { useState } from "react";
import imagen from "../src/image/check.png";

function App() {
  const [datoRecibido, setdatoRecibido] = useState("");
  const [activarIframe, setactivarIframe] = useState(false);
  const [submitData, setsubmitData] = useState({
    TenantId: "123",
    FormularioUUID: "63d7d2b1787ff3cac5631894",
    CodigoIdioma: "Idioma",
    urlIfram: "https://localhost:7283/Consentimientos/",
  });

  var parentWindow = window.parent;

  //--------------------------------------------envia mensaje al hijo--------------
  const carga = () => {
    const iframe = document.querySelector("iframe");
    iframe.contentWindow.postMessage(
      `${submitData.TenantId},${submitData.FormularioUUID},${submitData.CodigoIdioma}`, submitData.urlIfram
    );
    console.log("padre");
  };
  //---------------------------------------------------------------------------------
  //--------------------------------------------recibe mensaje del hijo--------------
  window.addEventListener("message", (e) => {
    var data = e.data + `,${e.origin}`;
    if (e.data === "ok") {
      setdatoRecibido(e.data);
      Swal.fire("Good job!", "You clicked the button!", "success");
    }
  });
  //---------------------------------------------------------------------------------
  const onSumitData = (e) => {
    e.preventDefault();
    setsubmitData({
      ...submitData,
      [e.target[0].name]: e.target[0].value === "" ? "123" : e.target[0].value,
      [e.target[1].name]:e.target[1].value === ""
          ? "63d7d2b1787ff3cac5631894"
          : e.target[1].value,
      [e.target[2].name]:e.target[2].value === "" ? "Idioma" : e.target[2].value,
      [e.target[3].name]:e.target[3].value === "" ? "https://localhost:7283/Consentimientos/" :e.target[3].value 
    });
    console.log(e)
    if(activarIframe){
      setactivarIframe(false)
      setTimeout(() => {
        setactivarIframe(true)
      }, 2000);
    }else {
      setactivarIframe(true)
    }
  };
  console.log(submitData);
  return (
    <div className="App">
      <h1>CONSENTIMIENTOS</h1>
      <form
        onSubmit={(e) => onSumitData(e)}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ border: "1px solid" }}>
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Tenan Id</label>
              <input name="TenantId" placeholder={submitData.TenantId}></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Formulario ID</label>
              <input
                name="FormularioUUID"
                placeholder={submitData.FormularioUUID}
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Idioma</label>
              <input
                name="CodigoIdioma"
                placeholder={submitData.CodigoIdioma}
              ></input>
            </div>
          </div>
          <input
            name="urlIfram"
            style={{ width: "100%" }}
            placeholder={submitData.urlIfram}
          ></input>
        </div>

        <button type="submit">Guardar y Iniciar</button>
      </form>
      {datoRecibido === "ok" ? (
        <img src={imagen}></img>
      ) : (
        <div onLoad={() => carga()} style={{ borderRadius: "1rem" }}>
          {activarIframe?
            <iframe
              id="mainframe"
              style={{ height: "500px", width: "70%" }}
              src={submitData.urlIfram}
            ></iframe>:null
          }
        </div>
      )}
    </div>
  );
}

export default App;

//----------------------APUNTES------------------------
//--el padre debe poner la url de nuestra pagina para que cualquer otro sitio no reciba los datos
//iframe.contentWindow.postMessage("datos", "https://localhost:7283/Consentimientos");
//--el padre debe hacer una rutina para darse cuentas que nuestro sitio
