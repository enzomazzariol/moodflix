import { useRouter } from "expo-router";
import { useState } from "react";
import RandomizerSlider from "../../components/commoms/Slider";
import SubmitBtn from "../../components/commoms/SubmitBtn";
import { Title } from "../../components/commoms/Title";
import SelectInput from "../../components/randomizer/SelectInput";
import TabsScreen from "../../components/screens/TabsScreen";
import {
  DecadeOptions,
  GenreOptions,
  StreamingServiceOptions,
} from "../../lib/randomizerFields";

export default function Randomizer() {
  const [randomizerData, setRandomizerData] = useState({});
  const router = useRouter();

  const goToMovie = (id) => {
    router.push(`/randomizerMovie/${id}`);
  };

  return (
    <TabsScreen>
      <Title className="text-3xl p-5 font-outfitBold text-floralWhite">
        Encuentra una pelicula basada en
      </Title>

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
        textColor="text-floralWhite"
        bgColor="bg-raisinBlack"
        width="70%"
        height="5%"
        handleSubmit={() => goToMovie(278)}
      >
        Randomizar
      </SubmitBtn>
    </TabsScreen>
  );
}
