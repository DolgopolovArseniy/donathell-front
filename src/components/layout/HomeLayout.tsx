import { Outlet } from "react-router";
import NavList from "../common/NavList";
import Nav from "../common/Nav";
import { NAV_LINKS_GENERAL, NAV_LINKS_WIDGETS } from "../../constants/navLinks";

export default function HomeLayout() {
  return (
    <main className="mx-auto flex w-full max-w-310 flex-col px-3 pt-16 sm:px-4 md:flex-row">
      <aside className="w-full shrink-0 border-[#101115] border-b md:fixed md:top-16 md:h-[calc(100dvh-4rem)] md:w-58 md:border-b-0 md:border-r">
        <Nav>
          <section className="flex flex-col gap-0.5">
            <h3 className="text-[#b7b8b7]">General</h3>
            <NavList navLinks={NAV_LINKS_GENERAL} />
          </section>

          <section className="flex flex-col gap-0.5">
            <h3 className="text-[#b7b8b7]">Widgets</h3>
            <NavList navLinks={NAV_LINKS_WIDGETS} />
          </section>
        </Nav>
      </aside>
      <section className="mt-4 min-w-0 flex-1 pb-20 md:mt-7 md:pl-88">
        <Outlet />
      </section>
    </main>
  );
}
