import {BarButton} from "../BarButton";
import Image from "next/image";

export const Siri: React.FC = () => {
  return (
    <BarButton>
      <BarButton.Button>
        <Image alt="Siri Logo" src="/images/siri.webp" width={14} height={14}/>
      </BarButton.Button>
    </BarButton>
  )
}
