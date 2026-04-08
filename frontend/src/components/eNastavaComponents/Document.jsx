import Image from "next/image";
import Link from "next/link";

export default function Document({ document }) {
  return (
    <div
      key={document.file}
      className="flex flex-col items-center justify-center w-40"
    >
      <div className="flex flex-col gap-2 items-center justify-center">
        <Image src="/icons/pdf.svg" alt="pdf logo" width={64} height={64} />
        <p className="text-sm">{document.title}</p>
      </div>
      <div>
        <Link
          href={`/documents/${document.file}`}
          download
          className="flex flex-col "
        >
          <p className="text-sm text-red-71 hover:text-gray-50">
            klikni ovdje za preuzimanje
          </p>
        </Link>
      </div>
    </div>
  );
}
