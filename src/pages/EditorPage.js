import { useParams } from "react-router-dom";

export default function EditorPage() {
  const { id } = useParams();
  return <div>{id == 1 ? "Hello yash" : id}</div>;
}
