/* eslint-disable @next/next/no-img-element */
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import notFound from "../../assets/not-found.png";

const NotFound = () => {
  return (
    <CardWrapper>
      <span className="text-center font-bold">Oops! Esta pagina no existe</span>
      <span className="text-center ">
        Pero acá tenes una imagen generada por IA de un gato haciendo cerámica
      </span>
      <img width={"500px"} src={notFound.src} alt="Un gato haciendo cerámica" />
    </CardWrapper>
  );
};

export default NotFound;
