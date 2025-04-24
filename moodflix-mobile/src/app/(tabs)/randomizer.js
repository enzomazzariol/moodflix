import { useRouter } from "expo-router";
import { useState } from "react";
import { heightPercentageToDP } from "react-native-responsive-screen";
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
  // TODO: Añadir boton de resetear cuando haya cambio en los inputs
  const [randomizerData, setRandomizerData] = useState({});
  const router = useRouter();

  const goToMovie = (id) => {
    router.push({
      pathname: `/randomizerMovie/${id}`,
      params: randomizerData,
    });
  };

  return (
    <TabsScreen>
      <Title
        className="text-3xl font-spaceGroteskBold text-floralWhite"
        style={{ paddingVertical: heightPercentageToDP("3%") }}
      >
        Encuentra una pelicula basada en
      </Title>

      <SelectInput
        label="Género"
        placeholder="Todos"
        value={randomizerData.genre}
        onChange={(val) => setRandomizerData({ ...randomizerData, genre: val })}
        options={GenreOptions}
      />

      <SelectInput
        label="Decada"
        placeholder="Todos"
        value={randomizerData.year}
        onChange={(val) => setRandomizerData({ ...randomizerData, year: val })}
        options={DecadeOptions}
      />

      <SelectInput
        label="Servicio de streaming"
        placeholder="Todos"
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
