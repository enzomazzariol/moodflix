import { heightPercentageToDP } from "react-native-responsive-screen";
import { useRandomizer } from "../../../../shared/hooks/useRandomizer";
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
  const { randomizerData, setRandomizerData, handleSubmit, isLoading } =
    useRandomizer();

  return (
    <TabsScreen>
      <Title
        className="text-3xl font-spaceGroteskBold text-floralWhite text-center"
        style={{
          paddingVertical: heightPercentageToDP("3%"),
          paddingHorizontal: heightPercentageToDP("5%"),
        }}
        maxFontSizeMultiplier={1.3}
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
        value={randomizerData.decade}
        onChange={(val) =>
          setRandomizerData({ ...randomizerData, decade: val })
        }
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
        value={randomizerData.rating}
        onChange={(val) =>
          setRandomizerData({ ...randomizerData, rating: val })
        }
      />

      <RandomizerSlider
        label="Duración máxima"
        minValue={60}
        maxValue={240}
        suffix="min"
        value={randomizerData.duration}
        onChange={(val) =>
          setRandomizerData({ ...randomizerData, duration: val })
        }
      />

      <SubmitBtn
        textColor="text-floralWhite"
        bgColor="bg-raisinBlack"
        width="70%"
        height="6%"
        textStyles={"mt-1"}
        handleSubmit={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Cargando..." : "Randomizar"}
      </SubmitBtn>
    </TabsScreen>
  );
}
