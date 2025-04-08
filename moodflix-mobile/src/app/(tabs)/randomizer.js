import { useState } from "react";
import { Text } from "react-native";
import SelectInput from "../../components/randomizer/SelectInput";
import TabsScreen from "../../components/screens/TabsScreen";
import {
  DecadeOptions,
  GenreOptions,
  StreamingServiceOptions,
} from "../../lib/randomizerFields";

export default function Randomizer() {
  const [randomizerData, setRandomizerData] = useState({});

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
    </TabsScreen>
  );
}
