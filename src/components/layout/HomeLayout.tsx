import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <main className="mx-auto flex w-full max-w-260 flex-col px-3 pt-24 pb-20 md:pb-10 sm:px-4">
      <section className="w-full flex-1">
        <Outlet />
      </section>
    </main>
  );
}
