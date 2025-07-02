import HomePage from "@/templates/HomePage";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/todos")
  const todos = await res.json()
  return (
    <HomePage todos={todos}/>
  );
}
