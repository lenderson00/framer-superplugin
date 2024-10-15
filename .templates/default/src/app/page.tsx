import { framer } from "framer-plugin";
import { useIsDevelopment } from "../hooks/use-is-development";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Stepper } from "../components/stepper";

framer.showUI({
  position: "top right",
  width: 360,
  height: 120,
})

const Page = () => {
  const isDevelopment = useIsDevelopment();
  const [count, setCount] = useState(0)

  useEffect(() => {
    const father = document.querySelector(".appPointerEvents_arpwu8w")

    if (father && father instanceof HTMLElement) {
      const size = generateRandonSize({width: 400, height: 300}, {width: 100, height: 100});
      father.style.width = `${size.width}px`
      father.style.height = `${size.height}px`
    }
  }, [])
 

  return (
    <motion.div className="transition-all duration-300 ease-in-out p-4" layout>
      <p>Page - {isDevelopment ? "Development" : "Production"}</p>
      <button
        onClick={async () => {
          const canvas = await framer.getCanvasRoot()
          console.log(canvas)
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Gerar Tamanho Aleatório
      </button>
      <Row title={"Row Gap"}>
                    <Stepper
                        value={count}
                        min={0}
                        step={10}
                        onChange={value => {
                              setCount(value)
                          
                        }}
                    />
                </Row>
    </motion.div>
  );
};

export default Page;


const generateRandonSize = (maxSize: {width: number, height: number}, minSize: {width: number, height: number} = {width: 100, height: 100}) => {
  return {
    width: Math.floor(Math.random() * (maxSize.width - minSize.width) + minSize.width),
    height: Math.floor(Math.random() * (maxSize.height - minSize.height) + minSize.height),
  }
}


function Row({ children, title }: { children: React.ReactNode; title: string }) {
  return (
      <div className="row">
          <label>{title}</label>
          {children}
      </div>
  )
}