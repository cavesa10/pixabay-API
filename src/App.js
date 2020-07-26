import React, { useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";

function App() {
  // statee de la app
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    
    const consultaAPI = async () => {
      if (busqueda === "") return;

      const imagenesPorPagina = 30;
      const key = "487220-330e733ae3f41afdf0ee96178";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      const respuesta = await fetch (url)
      const resultado = await respuesta.json()
      console.log(resultado.hits)
    };
    consultaAPI();
  }, [busqueda]);

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario setBusqueda={setBusqueda} />
      </div>
    </div>
  );
}

export default App;
