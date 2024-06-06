import Image from "next/image";

export default function ProfilePicture({ src }: { src: string | undefined }) {
  return (
    <Image
      src={src ? src : "/blank_profile.webp"}
      alt={src ? src : "blank_profile"}
      width={200}
      height={200}
      className="rounded-full w-[24px] aspect-square"
    />
  );
}
