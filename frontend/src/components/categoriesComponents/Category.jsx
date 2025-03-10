import { motion } from "framer-motion";

export default function Category({ category }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col gap-5 w-[450px] "
    >
      <div
        style={{
          backgroundImage: `url(/${category.image})`,
        }}
        className=" bg-cover bg-no-repeat bg-center w-full h-[400px]  "
      >
        <div className="flex items-center justify-center w-full h-[400px] bg-[#000]/85 ">
          <div className="flex gap-2 ">
            <div className="w-1 h-8 bg-red-71 mb-[5px]"></div>
            <p className="text-white-60 text-xl font-semibold">
              {category.imageText}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-start">
        <div className="flex gap-1 ">
          <p className="text-lg text-red-71">OZNAKA:</p>
          <p className="text-lg text-white-60  ">{category.category}</p>
        </div>
        <div className="flex flex-col  ">
          <p className="text-lg text-red-71 leading-none">TIPOVI VOZILA:</p>

          <p className="text-base text-gray-50 font-light">{category.type}</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-lg text-red-71 leading-none">UVJETI ZA UPIS:</p>

          <p className="text-base text-gray-50 font-light">
            {category.conditions}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
