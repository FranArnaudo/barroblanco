import { PhHeartDuotone } from "@/ui/icons/Icons";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-bold text-7xl text-center inline">Hola Ma </h1>
        <PhHeartDuotone color="red" className="text-7xl inline" />
      </div>
    </main>
  );
}
