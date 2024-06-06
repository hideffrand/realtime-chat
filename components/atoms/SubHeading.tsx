export default function SubHeading({ text }: { text: string | undefined }) {
  return (
    <h4 className="text-md font-semibold text-white">{text ? text : ""}</h4>
  );
}
