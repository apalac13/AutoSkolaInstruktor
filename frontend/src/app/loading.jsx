import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black-40 z-[9999] flex justify-center items-center">
      <div className="animate-pulse">
        <Image
          src="/icons/ASInstruktorLogoOrginalBW.svg"
          alt="Autoškola Instruktor logo"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}
