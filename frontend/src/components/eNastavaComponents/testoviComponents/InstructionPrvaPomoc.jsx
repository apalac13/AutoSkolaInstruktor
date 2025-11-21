import BlackButton from "@/components/buttons/BlackButton";

export default function InstructionPrvaPomoc({ setOption, setInstruction }) {
  const changeView = (viewValue) => {
    setOption(viewValue);
    setInstruction(false);
  };

  return (
    <div className="flex flex-col gap-8 items-start text-black-40 text-justify">
      <div className="flex flex-col gap-4 items-start ">
        <p className=" text-xl max-[400px]:text-lg">NAPOMENE:</p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <div className="flex gap-2  ">
              <p>1.</p>
              <p>Vrijeme za popunjavanje testa je 50 minuta.</p>
            </div>
          </div>
          <div className="flex gap-2 ">
            <p>2.</p>
            <div className="flex flex-col items-start">
              <p>
                Svako pitanje nosi po 1 bod te svako pitanje ima 1 točan
                odgovor.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <p>3.</p>
            <p>
              Ako ste zadovoljili najmanje 90% točnih odgovora, odnosno 9 točnih
              odgovora od ukupnog broja mogućih bodova (10) smatrat će se da ste
              položili ispit.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start ">
        <p className=" text-xl max-[400px]:text-lg">IZABERITE OPCIJU:</p>
        <div className="flex flex-col gap-3 mb-7 ">
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
        <div className="flex max-[480px]:flex-col gap-4 ">
          <span onClick={() => changeView("single")}>
            <BlackButton text={"OPCIJA 1"} />
          </span>
          <span onClick={() => changeView("all")}>
            <BlackButton text={"OPCIJA 2"} />
          </span>
        </div>
      </div>
    </div>
  );
}
