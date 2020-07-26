import React from "react";

export const Formulario = () => {
  return (
    <form>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca Una imagen, ejemplo: fútbol o café"
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
    </form>
  );
};
