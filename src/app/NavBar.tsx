
import LoginComponent from "./login/LoginComponent";

import Logo from "./logo";
import Selector from "./admin/selector";

export default function NavBar() {

  return (
    <header className="flex items-center justify-between px-8 py-2 border-b border-tinta-vino bg-tinta-natural" >
      <Logo />
      
      <LoginComponent />
    </header>
  )
}
