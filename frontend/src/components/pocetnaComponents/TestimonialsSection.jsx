import Section from "../Section";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: '"Autoškola Instruktor je odlična! Instruktori su izuzetno strpljivi i profesionalni, a obuka je temeljita i prilagođena svakom učeniku. Vozila su moderna i dobro održavana, što dodatno ulijeva povjerenje. Posebno mi se svidjela fleksibilnost u terminima i mogućnost plaćanja na rate. Preporučujem svima koji žele kvalitetnu i sigurnu obuku."',
      person: "Luka Lukić",
    },
    {
      text: '"Autoškola Instruktor je odlična! Instruktori su izuzetno strpljivi i profesionalni, a obuka je temeljita i prilagođena svakom učeniku. Vozila su moderna i dobro održavana, što dodatno ulijeva povjerenje. Posebno mi se svidjela fleksibilnost u terminima i mogućnost plaćanja na rate. Preporučujem svima koji žele kvalitetnu i sigurnu obuku."',
      person: "Mara Marić",
    },
    {
      text: '"Autoškola Instruktor je odlična! Instruktori su izuzetno strpljivi i profesionalni, a obuka je temeljita i prilagođena svakom učeniku. Vozila su moderna i dobro održavana, što dodatno ulijeva povjerenje. Posebno mi se svidjela fleksibilnost u terminima i mogućnost plaćanja na rate. Preporučujem svima koji žele kvalitetnu i sigurnu obuku."',
      person: "Jure Jurić",
    },
    {
      text: '"Autoškola Instruktor je odlična! Instruktori su izuzetno strpljivi i profesionalni, a obuka je temeljita i prilagođena svakom učeniku. Vozila su moderna i dobro održavana, što dodatno ulijeva povjerenje. Posebno mi se svidjela fleksibilnost u terminima i mogućnost plaćanja na rate. Preporučujem svima koji žele kvalitetnu i sigurnu obuku."',
      person: "Irena Irenić",
    },
  ];

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <section className="flex flex-col gap-20 p-10 ">
      <Section number={"05"} text={"KANDIDATI O NAMA"} />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full h-full flex flex-col ">
              <div className="flex flex-col gap-5 mb-9">
                <Image
                  src={"icons/mark_quote.svg"}
                  alt="mark quote icon"
                  width={33}
                  height={25}
                />
                <blockquote className="text-base max-lg:text-sm italic text-justify">
                  {testimonial.text}
                </blockquote>
              </div>
              <div className="flex max-[350px]:flex-col justify-between items-end ">
                <div className="flex ">
                  {[...Array(5)].map((_, index) => (
                    <Image
                      key={index}
                      src={"/icons/star.svg"}
                      alt="star icon"
                      width={32}
                      height={32}
                      className="max-xl:w-7 max-xl:h-7 max-lg:w-6 max-lg:h-6"
                    />
                  ))}
                </div>
                <div className="flex items-end leading-none">
                  <Image
                    src={"/icons/user_male.svg"}
                    alt="User male icon"
                    width={42}
                    height={42}
                    className="max-lg:w-9 max-lg:h-9"
                  />
                  <p className="text-base leading-none">{testimonial.person}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </section>
  );
}
