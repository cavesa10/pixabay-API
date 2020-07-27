import React, { useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";
import { ListadoImagenes } from "./components/ListadoImagenes";

function App() {
  // statee de la app
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const consultaAPI = async () => {
      if (busqueda === "") return;

      const imagenesPorPagina = 30;
      const key = "487220-330e733ae3f41afdf0ee96178";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      if (resultado.total === 0) {
        setImagenes([]);
        setError(true);
        return;
      }
      setError(false)
      setImagenes(resultado.hits);

      // Calcular Total paginas
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      setTotalPaginas(calcularTotalPaginas);
      // mover la pantalla hacia arriba
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultaAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;

    if (nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    if (nuevaPaginaActual > totalPaginas) return;

    setPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          setBusqueda={setBusqueda}
          setPaginaActual={setPaginaActual}
        />
      </div>
      {error ? (
        <p>No hay resultados</p>
      ) : (
        <div className="row justify-content-center">
          <ListadoImagenes imagenes={imagenes} />
          {paginaActual === 1 ? null : (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaAnterior}
            >
              &laquo;Anterior
            </button>
          )}
          {paginaActual === totalPaginas ? null : (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaSiguiente}
            >
              Siguiente&raquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
