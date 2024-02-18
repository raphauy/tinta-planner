
import LoginComponent from "./login/LoginComponent";

import Logo from "./logo";
import Menu from "./menu";

export default function NavBar() {

  return (
    <header className="flex items-center justify-between px-8 py-2 border-b border-tinta-vino" >
      <div className="flex items-center gap-4">
        <Logo />
        <Menu />
      </div>

      {/** @ts-ignore */}
      <LoginComponent />
    </header>
  )
}
