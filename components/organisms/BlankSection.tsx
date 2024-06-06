import { FaWhatsapp } from "react-icons/fa";

export default function BlankSection() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center text-center">
      <span className="opacity-20">
        <FaWhatsapp size={100} />
      </span>
      <p className="mt-8">WhatsApp Web Clone</p>
      <p className="mt-2 opacity-40 px-[20%] text-sm">
        Built entirely by Deffrand | Learning purposes only.
      </p>
    </section>
  );
}
