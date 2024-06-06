export default function Heading({ text }: { text: string | undefined }) {
  return (
    <h1 className="text-xl font-medium text-white">{text ? text : "null"}</h1>
  );
}
