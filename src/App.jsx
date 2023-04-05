import logo from "./logo.svg";
import "./App.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import imagen from "../src/image/check.png";
import medellin from "../src/image/rustico.png";
import nacional from "./image/nacional.png";
import junior from "./image/junior.png";


function App() {
  const [datoRecibido, setdatoRecibido] = useState("");
  const [activarIframe, setactivarIframe] = useState(false);
  const [imagenAct, setimagenAct] = useState("");
  const [submitData, setsubmitData] = useState("https://localhost:7283/Consentimientos/" );

  useEffect(() => {
    const urlPadre = [{name:"nacional-six.vercel.app",img:medellin}, {name:"medellinpoderoso.vercel.app", img:nacional}, {name:"juniortupapa.vercel.app", img:junior}]
    const selectImg = window.location.host
    const imagenFondo = urlPadre.find(item => item.name == selectImg)
  
    setimagenAct(imagenFondo.img)
  }, [])
  
  

  console.log(imagenAct)
  var parentWindow = window.parent;

  //--------------------------------------------envia mensaje al hijo--------------
  const carga = () => {
    const iframe = document.querySelector("iframe");
    iframe.contentWindow.postMessage(
      `${submitData.TenantId},${submitData.FormularioUUID},${submitData.CodigoIdioma}`,
      submitData.urlIfram
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
    setsubmitData( e.target[0].value);
    console.log(e);
    
    if (activarIframe) {
      setdatoRecibido("");
      setactivarIframe(false);
      setTimeout(() => {
        setactivarIframe(true);
      }, 2000);
    } else {
      setactivarIframe(true);
    }
  };
  console.log(submitData);
  return (
    <div className="App" style={{ backgroundImage:`url(${imagenAct})`}}>
      <div style={{display:"flex", justifyContent:"center", width:"90%"}}>

        <div style={{ display: "flex", flexDirection:"column", width:"70%" }}>
          <form
            onSubmit={(e) => onSumitData(e)}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              height:"40px",
            }}
          >
         
              {/* <div style={{ width: "100%", display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label>Tenan Id</label>
                  <input
                    name="TenantId"
                    placeholder={submitData.TenantId}
                  ></input>
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
              </div> */}
              <input
                name="urlIfram"
                style={{ width: "100%" }}
                placeholder={submitData.urlIfram}
              ></input>
           

            <button type="submit">Guardar y Iniciar</button>
          </form>
          <h1 >CONTACTANOS</h1>
        </div>
     
      </div>
      {datoRecibido === "ok" ? (
        <img src={imagen}></img>
      ) : (
        <div onLoad={() => carga()} style={{ borderRadius: "1rem" }}>
          {activarIframe ? (
            <iframe
              id="mainframe"
              style={{ height: "500px", width: "70%", border:"none", borderRadius:"10px", opacity:"0.9", flex:1 }}
              src={submitData}
            ></iframe>
          ) : null}
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
