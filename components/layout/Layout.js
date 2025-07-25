import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import LogoutButton from "components/elements/LogoutButton";

const liStyles = "flex items-center gap-2.5 text-base font-medium ml-4 mb-2";

async function Layout({ children }) {
  return (
    <>
      <header className="bg-blue-700 text-white p-5 pb-15 text-lg font-bold h-32 flex justify-between items-center">
        <p>My Todo App</p>
        <LogoutButton />
      </header>
      <main className="flex min-h-[calc(100vh-128px)]">
        <aside className="pt-4 px-5 relative bottom-15 bg-white rounded-tr-2xl w-56 text-neutral-800">
          <p className="font-bold mb-7">Welcome 👋</p>
          <ul>
            <li className={liStyles}>
              <VscListSelection />
              <Link href="/">Todo</Link>
            </li>
            <li className={liStyles}>
              <BiMessageSquareAdd />
              <Link href="/add-todo">Add Todo</Link>
            </li>
            <li className={liStyles}>
              <RxDashboard />
              <Link href="/dashboard">Profile</Link>
            </li>
          </ul>
        </aside>
        <section className="bg-gray-200 w-full p-5">{children}</section>
      </main>
    </>
  );
}

export default Layout;
