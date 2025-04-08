import { useState } from "react";
import { Text } from "react-native";
import RandomizerSlider from "../../components/commoms/Slider";
import SubmitBtn from "../../components/commoms/SubmitBtn";
import SelectInput from "../../components/randomizer/SelectInput";
import TabsScreen from "../../components/screens/TabsScreen";
import {
  DecadeOptions,
  GenreOptions,
  StreamingServiceOptions,
} from "../../lib/randomizerFields";

export default function Randomizer() {
  const [randomizerData, setRandomizerData] = useState({});

  const handleSubmit = () => {
    console.log("Randomizer data:", randomizerData);
    // Aquí puedes agregar la lógica para manejar el envío de datos
    // Por ejemplo, hacer una llamada a la API o navegar a otra pantalla
  };

  return (
    <TabsScreen>
      <Text className="text-3xl p-5 font-outfitBlack text-coral">
        Encuentra una película basada en
      </Text>

      <SelectInput
        label="Género"
        placeholder="todos"
        value={randomizerData.genre}
        onChange={(val) => setRandomizerData({ ...randomizerData, genre: val })}
        options={GenreOptions}
      />

      <SelectInput
        label="Decada"
        placeholder="todos"
        value={randomizerData.year}
        onChange={(val) => setRandomizerData({ ...randomizerData, year: val })}
        options={DecadeOptions}
      />

      <SelectInput
        label="Servicio de streaming"
        placeholder="todos"
        value={randomizerData.streaming}
        onChange={(val) =>
          setRandomizerData({ ...randomizerData, streaming: val })
        }
        options={StreamingServiceOptions}
      />
      <RandomizerSlider
        label="Rating"
        minValue={1}
        maxValue={100}
        suffix="/100"
        onChange={(val) =>
          setRandomizerData({ ...randomizerData, rating: val })
        }
      />
      <RandomizerSlider
        label="Duración máxima"
        minValue={60}
        maxValue={240}
        suffix="min"
        onChange={(val) =>
          setRandomizerData({ ...randomizerData, duration: val })
        }
      />

      <SubmitBtn
        text="Randomizar"
        textColor="black"
        width="70%"
        height="5%"
        handleSubmit={handleSubmit}
      />
    </TabsScreen>
  );
}
