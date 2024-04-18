import logo from "./logo.svg";
import "../src/assets/index2.css"
import "./App.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import imagen from "../src/image/check.png";
import medellin from "./image/medellin.png";
import nacional from "./image/nacional.png";
import junior from "./image/junior.png";
import index2 from "../src/assets/index2"


function App() {
  const [datoRecibido, setdatoRecibido] = useState("");
  const [activarIframe, setactivarIframe] = useState(false);
  const [activarWeb, setactivarWeb] = useState(false);
  const [imagenAct, setimagenAct] = useState("");
  const [submitData, setsubmitData] = useState(
   {urlIfram:"", webWc:""}
  );

  useEffect(() => {
    // const urlPadre = [{name:"nacional-six.vercel.app",img:nacional}, {name:"medellinpoderoso.vercel.app", img:medellin}, {name:"juniortupapa.vercel.app", img:junior}]
    // const selectImg = window.location.host
    // const imagenFondo = urlPadre.find(item => item.name == selectImg)
    // setimagenAct(imagenFondo.img)
    const scripjs = document.createElement("script");
    scripjs.href = index2;
    document.head.appendChild(scripjs);
    return () => {
      document.head.removeChild(scripjs);   
    };
  }, []);
  

  console.log(imagenAct);
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
const cambioInput =(e) => {
  setsubmitData({...submitData, [e.target.name]:e.target.value});
}

  const onSumitData = (e) => {
    e.preventDefault();
    console.log(submitData)
    if (submitData.urlIfram != "") {
      setdatoRecibido("");
      setactivarIframe(false);
      setTimeout(() => {
        setactivarIframe(true);
      }, 2000);
    } else {
      setactivarIframe(true);
    }
    if (submitData.webWc != "") {
      setdatoRecibido("");
      setactivarWeb(false);
      setTimeout(() => {
        setactivarWeb(true);
      }, 2000);
    } else {
      setactivarWeb(true);
    }
  };
  console.log(submitData);
  return (
    <div className="App" style={{ backgroundImage: `url(${imagenAct})` }}>
      <div style={{ display: "flex", justifyContent: "center", width: "90%" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
          <form
            onSubmit={(e) => onSumitData(e)}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              height: "40px",
            }}
          >
            <input
              name="urlIfram"
              style={{ width: "100%" }}
              placeholder="iframe"
              onChange={(e)=>cambioInput(e)}
            ></input>
             <input
              name="webWc"
              style={{ width: "100%" }}
              placeholder="webComponent"
              onChange={(e)=>cambioInput(e)}
            ></input>

            <button style={{width:"150px"}} type="submit">Enviar</button>
          </form>
          <h1>CONTACTANOS</h1>
        </div>
      </div>

      <div  style={{ borderRadius: "1rem" }}>
        {activarIframe ? (
          <iframe
            id="mainframe"
            style={{
              height: "500px",
              width: "100%",
              border: "none",
              borderRadius: "10px",
              opacity: "0.9",
              flex: 1,
            }}
            src={submitData.urlIfram}
          ></iframe>
        ) : null}
        {
          activarWeb?    
          <div style={{width: "100%", height: "95vh"}}>
          <wc-dprivatus-form
            url={submitData.webWc}
          ></wc-dprivatus-form>
        </div>:null
        }
      </div>
    </div>
  );
}

export default App;

//----------------------APUNTES------------------------
//--el padre debe poner la url de nuestra pagina para que cualquer otro sitio no reciba los datos
//iframe.contentWindow.postMessage("datos", "https://localhost:7283/Consentimientos");
//--el padre debe hacer una rutina para darse cuentas que nuestro sitio
