import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-white px-6 text-center">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">Erro 404</p>
        <h1 className="mt-4 text-4xl font-medium leading-[0.95] tracking-tight text-stone-950 sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-4 text-sm text-stone-500">O endereço acessado não existe no Clube Adim.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-stone-950 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
