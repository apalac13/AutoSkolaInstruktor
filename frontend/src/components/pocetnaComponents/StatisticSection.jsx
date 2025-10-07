import Section from "../Section";
import { motion } from "framer-motion";
import Counter from "./Counter";

export default function StatisticSection() {
  const experience = new Date().getFullYear() - 1990;

  const statisticsItems = [
    { number: experience, symbol: "+", item: "Godina iskustva" },
    { number: 4000, symbol: "+", item: "Položenih vozački" },
    { number: 100, symbol: "%", item: "Zadovoljnih kandidata" },
  ];

  return (
    <section className="flex flex-col gap-20 pb-32 p-10 ">
      <Section number={"01"} text={"STATISTIKA"} />
      <div className="w-full flex flex-row max-xl:flex-col gap-24 max-xl:gap-12 items-center">
        <div className="max-xl:self-start max-xl:pl-10 max-lg:self-center">
          <p className="text-base text-start text-red-71">UKRATKO</p>
          <div className="flex flex-col  text-5xl max-sm:text-4xl  font-semibold  text-black-40 text-start leading-tighter  ">
            <p>AUTOŠKOLA</p>
            <p>INSTRUKTOR</p>
          </div>
        </div>
        <div className="w-full flex justify-around max-lg:flex-col max-lg:gap-12 max-lg:items-center ">
          {statisticsItems.map((statsItem, index) => (
            <div
              key={index}
              className="w-[300px] flex flex-col items-center text-black-40"
            >
              <p className="text-6xl max-sm:text-5xl font-extralight leading-tight">
                <Counter from={0} to={statsItem.number} />
                {statsItem.symbol}
              </p>
              <div className="w-full relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  viewport={{ once: true }}
                  className="absolute z-20 w-[300px] h-[1px] bg-red-71 mb-[5px] "
                ></motion.div>
              </div>
              <p className="text-xl max-sm:text-lg font-light">
                {statsItem.item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
