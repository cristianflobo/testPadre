import React from 'react'
import carro1 from  "../image/carro1.jfif"
import carro2 from  "../image/carro2.jpg"
import carro3 from  "../image/carro3.jfif"
import carro4 from  "../image/carro4.jpg"
import Swal from 'sweetalert2'

export const Card = () => {
  const alerta = () => {
  
  Swal.fire(
    'Tienes que aceptar los terminos antes de comprar'
  )
  }
  return (
    <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
      <div style={{display:"flex", flexDirection:"column" , borderRadius:"50px"}}>       
        <img style={{width:"250px", height:"200px"}} src={carro1}/>
        <label>Carro 1</label>
        <button onClick={()=>alerta()}>Comprar</button>
      </div>
      <div style={{display:"flex", flexDirection:"column", width:"250px", borderRadius:"50px"}}>       
        <img style={{width:"250px", height:"200px"}} src={carro2}/>
        <label>Carro 1</label>
        <button onClick={()=>alerta()}>Comprar</button>
      </div>
      <div style={{display:"flex", flexDirection:"column", width:"250px", borderRadius:"50px"}}>       
        <img style={{width:"250px", height:"200px"}} src={carro3}/>
        <label>Carro 1</label>
        <button onClick={()=>alerta()}>Comprar</button>
      </div>
      <div style={{display:"flex", flexDirection:"column", width:"250px", borderRadius:"50px"}}>       
        <img style={{width:"250px", height:"200px"}} src={carro4}/>
        <label>Carro 1</label>
        <button onClick={()=>alerta()}>Comprar</button>
      </div>
      
      
    </div>
  )
}
