import { useState } from "react";

export default function Instruction({ setOption, setInstruction }) {
  const changeView = (viewValue) => {
    setOption(viewValue);
    setInstruction(false);
  };

  return (
    <div className="flex flex-col gap-8 items-start text-black-40">
      <div className="flex flex-col gap-4 items-start ">
        <p className=" text-xl">NAPOMENE:</p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 ">
            <p>1.</p>
            <p>Vrijeme za popunjavanje testa je 50 minuta.</p>
          </div>
          <div className="flex gap-2">
            <p>2.</p>
            <div className="flex flex-col items-start">
              <p>Pitanja od 1-20 su vrednovana sa 2 boda</p>
              <p>Pitanja od 21-30 su vrednovana sa 3 boda</p>
              <p>Pitanja od 31-40 su vrednovana sa 5 bodova</p>
              <p>
                Dodatna pitanja za kategorije C i D su vrednovana sa 2 boda.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <p>3.</p>
            <p>
              Ako ste zadovoljili najmanje 90% točnih odgovora od ukupnog broja
              mogućih bodova smatrat će se da ste položili ispit.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start ">
        <p className=" text-xl">IZABERITE OPCIJU:</p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 ">
            <p>*</p>
            <p>
              <span>OPCIJA 1:</span> prikaz pitanja pojedinačno i da Vam odmah
              prikaže rezultat.
            </p>
          </div>
          <div className="flex gap-2">
            <p>*</p>
            <p>
              <span>OPCIJA 2:</span> prikaz svih pitanja i da na kraju vidite
              rezultat.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => changeView("single")}
            className="w-[200px] h-14  border border-black-40 bg-black-40 "
          >
            <p className=" text-white-60 text-base font-light  text-center ">
              OPCIJA 1
            </p>
          </button>
          <button
            onClick={() => changeView("all")}
            className="w-[200px] h-14  border border-black-40 bg-black-40 "
          >
            <p className=" text-white-60 text-base font-light  text-center ">
              OPCIJA 2
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}