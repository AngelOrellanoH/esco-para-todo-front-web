import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

const Buscador = ({ onBuscar }) => {

    const [consulta, setConsulta] = useState("");
  const [numResultados, setNumResultados] = useState([10]);
  const [modeloEmbeddings, setModeloEmbeddings] = useState("all-MiniLM-L6-v2");

  const manejarBusqueda = () => {
    if (!consulta.trim()) return;
    onBuscar(consulta, numResultados[0]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="!flex !items-center !gap-2">
          <Search className="!h-5 !w-5" />
          Buscador
        </CardTitle>
      </CardHeader>

      <CardContent className="!space-y-6">
        {/* Campo de búsqueda */}
        <div className="!space-y-2">
          <Input
            placeholder="Ejemplo: informática"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            className="!text-lg !py-3"
            onKeyDown={(e) => e.key === "Enter" && manejarBusqueda()}
          />
        </div>

        {/* Controles */}
        <div className="!grid !gap-6 md:!grid-cols-2">
          <div className="!space-y-3">
            <label className="!text-sm !font-medium">Número de resultados</label>
            <div className="!space-y-2 !mt-2">
              <Slider
                value={numResultados}
                onValueChange={setNumResultados}
                max={50}
                min={5}
                step={5}
                className="!w-full"
              />
              <div className="!flex !justify-between !text-xs !text-muted-foreground">
                <span>5</span>
                <span className="!font-medium">{numResultados[0]}</span>
                <span>50</span>
              </div>
            </div>
          </div>

          <div className="!space-y-3">
            <label className="!text-sm !font-medium">Modelo de Embeddings</label>
            <select
              value={modeloEmbeddings}
              onChange={(e) => setModeloEmbeddings(e.target.value)}
              className="!w-full !px-3 !py-2 !border !border-input !rounded-md !bg-background"
            >
              <option value="all-MiniLM-L6-v2">all-MiniLM-L6-v2 (por defecto)</option>
              <option value="all-mpnet-base-v2">all-mpnet-base-v2</option>
              <option value="distilbert-base-nli">distilbert-base-nli</option>
              <option value="sentence-transformers">sentence-transformers</option>
            </select>
          </div>
        </div>

        {/* Botón de búsqueda */}
        <Button
          onClick={manejarBusqueda}
          disabled={!consulta.trim()}
          className="!w-full !bg-black hover:!bg-gray-800 !text-white !py-3 !text-lg"
          size="lg"
        >
          Buscar competencias
        </Button>
      </CardContent>
    </Card>
  )
}

export default Buscador;