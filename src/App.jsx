/* eslint-disable no-unused-vars */
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Calendar,
  Button,
} from "@nextui-org/react";
import "./App.css";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";

function App() {
  const [recolector, setRecolector] = useState("");
  const [modulo, setModulo] = useState("");
  const [kilos, setKilos] = useState("");
  const [valorxkg, setValorxkg] = useState("");
  const [fecha, setFecha] = useState(today(getLocalTimeZone()));
  const [weekOfYear, setWeekOfYear] = useState(0);

  const [recolectores, setRecolectores] = useState([
    { value: "01", label: "CLAUDIA TORRES" },
    { value: "02", label: "YARLEDY HUEPENDO" },
    { value: "03", label: "MIRIAN HEREDIA" },
    { value: "04", label: "DIEGO AREVALO" },
    { value: "05", label: "EUGENIA PEÑA" },
    { value: "06", label: "HERSI GONZALEZ" },
    { value: "07", label: "CARLOS SANCHEZ" },
    { value: "08", label: "KATERINE SANTANA" },
    { value: "09", label: "HERMINDA ANTONIO" },
    { value: "10", label: "NAIN HERNANDEZ" },
    { value: "11", label: "NILSON" },
    { value: "12", label: "JENNY CORTEZ" },
    { value: "13", label: "CLAUDIA LOPEZ" },
    { value: "14", label: "ASIVIS BORJA" },
    { value: "15", label: "MARIA MARTINEZ" },
    { value: "16", label: "SANDRA ANZOLA" },
    { value: "17", label: "JENNY MARTINEZ" },
    { value: "18", label: "LENNY ANTONIO" },
    { value: "19", label: "MONICA RONCO" },
    { value: "20", label: "YOLANDA BARAJAS" },
    { value: "21", label: "YOLIMA CANDELA" },
    { value: "22", label: "ANA ANTONIO" },
    { value: "23", label: "DARLY DAYANA" },
    { value: "24", label: "ERIKA DURAN" },
    { value: "25", label: "NIDIA PARRA" },
    { value: "26", label: "LOLA TOUS" },
    { value: "27", label: "CARLOS DURAN" },
  ]);

  const [modulos, setModulos] = useState([
    { value: "01", label: "MODULO 1" },
    { value: "02", label: "MODULO 2" },
    { value: "03", label: "MODULO 3" },
    { value: "04", label: "MODULO 4" },
    { value: "05", label: "MODULO 5" },
    { value: "06", label: "MODULO 6" },
    { value: "07", label: "MODULO 7" },
  ]);

  useEffect(() => {
    const calculateWeekOfYear = (date) => {
      const currentDate = new Date(date.year, date.month - 1, date.day);
      const startOfYear = new Date(date.year, 0, 1);
      const days = Math.floor(
        (currentDate - startOfYear) / (24 * 60 * 60 * 1000)
      );
      const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
      return weekNumber;
    };

    setWeekOfYear(calculateWeekOfYear(fecha));
  }, [fecha]);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <div className="flex flex-col justify-start min-h-screen bg-gradient-to-bl from-purple-200 via-blue-100 to-purple-300">
      <h2 className="text-3xl font-bold text-center my-8">
        Reporte Diario por recolector
      </h2>
      <div className="grid grid-cols-12">
        <div className="col-span-1"></div>
        <Calendar
          color="primary"
          aria-label="Date (Controlled)"
          value={fecha}
          onChange={setFecha}
          className="col-span-4"
          minValue={today(getLocalTimeZone())}
        />
        <div className="col-span-5 flex flex-col items-center justify-start gap-4">
          <span className="text-2xl">
            {`${fecha.day} de ${getMonthName(fecha.month)} del ${fecha.year}`}
          </span>
          <span className="text-2xl">Semana {weekOfYear}</span>
          <Autocomplete
            color="primary"
            defaultItems={recolectores}
            label="Seleccionar Recolector"
            className="col-span-4"
            selectedKeys={["value"]}
            onSelectionChange={(e) => setRecolector(e)}
            value={recolector}
            isClearable
          >
            {(recolector) => (
              <AutocompleteItem key={recolector.value}>
                {recolector.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            color="primary"
            defaultItems={modulos}
            label="Seleccionar Modulo"
            className="col-span-4"
            selectedKeys={["value"]}
            onSelectionChange={(e) => setModulo(e)}
            value={modulo}
            isClearable
          >
            {(modulo) => (
              <AutocompleteItem key={modulo.value}>
                {modulo.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="col-span-1"></div>
      </div>
      <div className="col-span-12 grid grid-cols-12">
        <div className="col-span-5"></div>
        <Input
          color="primary"
          label="Kilos"
          value={kilos}
          onChange={(e) => setKilos(e)}
          className="col-span-3 pr-5"
        />
        <Input
          color="primary"
          label="Valor x Kg"
          value={valorxkg}
          onChange={(e) => setValorxkg(e)}
          className="col-span-2"
        />
        <div className="col-span-1"></div>
      </div>
      <div className="col-span-12 grid grid-cols-12 mt-8">
        <div className="col-span-5"></div>
        <Button variant="ghost" color="primary" className="col-span-2 mr-5">
          Calcular
        </Button>
        <Button
          variant="ghost"
          color="primary"
          className="col-span-2 mr-5 ml-5"
        >
          Generar Reporte
        </Button>
        <Button color="danger" className="col-span-1 ml-5">
          Limpiar
        </Button>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}

export default App;
