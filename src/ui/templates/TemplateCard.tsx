/* eslint-disable @next/next/no-img-element */
import { Bebas_Neue } from "next/font/google";
import productExample from "../../../assets/product-example.png";
import { Template } from "../../../types";
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

type TemplateCardProps = {
  template: Template;
};
const TemplateCard = ({ template }: TemplateCardProps) => {
  console.log(
    "🚀Fran ~ file: TemplateCard.tsx:11 ~ TemplateCard ~ template:",
    template
  );
  return (
    <>
      <div className="peer flex z-10 flex-col bg-white rounded-lg shadow-2xl hover:relative aspect-[1/2] hover:scale-105 duration-300">
        <img
          src={template.img}
          width={"300px"}
          className="rounded-t-lg"
          alt="template"
        />
        <div className="p-2 flex flex-col gap-2">
          <h3 className={`text-4xl ${bebasNeue.className}`}>{template.name}</h3>
          <div className="flex flex-col">
            <div className="flex gap-1">
              <span>Último precio calculado:</span>
              <span className="font-semibold">{template.cost}</span>
            </div>
            <div className="flex gap-1">
              <span>Última actualización:</span>
              <span className="font-semibold">
                {template.lastUpdated.toISOString().split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden hover:hidden z-0 peer-hover:flex peer-hover:absolute peer-hover: peer-hover:backdrop-blur-md peer-hover:top-0 peer-hover:bottom-0 peer-hover:left-0 peer-hover:right-0 "></div>
    </>
  );
};

export default TemplateCard;
