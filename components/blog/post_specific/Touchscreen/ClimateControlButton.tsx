import Image from "next/image";
import clsx from "clsx";

interface ClimateControlButtonProps {
  id: string;
  href: string;
  activeId: string;
  setActiveId: Function;
  color?: 'orange' | 'green';
}

export const ClimateControlButton: React.FC<ClimateControlButtonProps> = ({id, href, activeId, setActiveId, color}) => {
  const setId = () => {
    setActiveId(id);
  }

  const getBackgroundColor = (): string => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'orange': return 'bg-orange-500';
      default: return 'bg-orange-500';
    }
  }

  return (
    <button
      className="px-6 py-4 bg-zinc-700 flex items-center justify-center relative"
      onClick={setId}>
      <div className={clsx(
        activeId === id ? getBackgroundColor() : 'bg-black',
        'absolute top-1 left-1/2 -translate-x-1/2 h-1 w-3'
      )}/>
      <Image src={href} width={32} height={32}/>
    </button>
  )
}
