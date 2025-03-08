import Navigacija from "@/components/Navigacija";
import PageTransition from "@/components/PageTransition";

export default function OnlineTestvoviLayout({ children }) {
  return (
    <div className="mb-24">
      <div className=" bg-online-testovi bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/80 ">
          <Navigacija />
          <div className="absolute top-[30%] justify-self-center self-center">
            <p className=" text-4xl font-bold italic  text-white-60">
              ONLINE TESTOVI
            </p>
            <p className="text-xl text-white-60 font-light italic ">
              Testirajte svoje znanje online uz pomoć testova koje vam nudimo
            </p>
          </div>
        </div>
      </div>
      <PageTransition>
        <div className="p-10">{children}</div>
      </PageTransition>
    </div>
  );
}
