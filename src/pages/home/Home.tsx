import { FunctionComponent, useState, useEffect, useContext } from "react";
import CardWather from "../../components/cardWather/cardWather";
import { city, temp } from "../../types/types";
import "./Home.css";
import axios from "axios";
import { onTextChange } from "../../funtionsAux/functions";
import Switch from "react-switch";
import "../../fonts/weather-icons-master/css/weather-icons.css";
import FlatList from "flatlist-react";

const HomePage: FunctionComponent = () => {
  //varibles
  const [citiName, setcitiName] = useState<string>(""); //valor delinput
  const [cities, setCities] = useState<Array<city>>([]); //arreglo de ciudades disponibles segun se vas scribindo

  const [citiesList, setCitiesList] = useState<Array<city>>([]); //listado de ciudades par la lista de tarjetas

  const [cityselect, setcityselect] = useState<city>(); //ciudad seleccionada con todoslos valors desde  elAPI

  //selector de la unidad de la temperatura
  const [gradosF, setGrdosF] = useState<boolean>(true); //temperatura true en grados F , ale en grados C

  //para actualizar lalista
  useEffect(() => {
    let tptemp = citiesList;
    setCitiesList(tptemp);
  }, [citiesList]);

  //FUNCION PARA CARGAR LAS CIUADADES QUE SE VAN TECLEANDO
  async function loadCitys() {
    if (citiName.length > 0) {
      axios
        .get("https://geocoding-api.open-meteo.com/v1/search?name=" + citiName)
        .then((response) => {
          setCities(JSON.parse(JSON.stringify(response.data)).results);
        });
    }
  }

  //agegar cda ciudad de la tarjeta a la lista
  function saveCard() {
    let citemp: Array<city> = citiesList;
    if (cityselect && citiName != "") {
      citemp.push(cityselect);
    }
    setCitiesList(citemp);
    setcitiName("");
  }

  //eliminar una tarjeta
  function removeCaed(id: number) {
    let cititemp: Array<city> = [];
    citiesList.map((b) => {
      if (b.id != id) {
        console.log("no eliminar.....", b.id, "--->", b.name);
        cititemp.push(b);
      } else {
        console.log(" eliminar.....", b.id, "--->", b.name);
      }
    });
    console.log("Finl.........", cititemp);
    setCitiesList(cititemp);
    setcitiName("");
  }

  function card(car: city, id: string) {
    return (
      <div key={id} style={{ width: "10rem", marginRight: "5rem" }}>
        <CardWather
          carvValue={car}
          grade={gradosF ? "F" : "C"}
          key={id}
          setAtion={(value) => {
            removeCaed(value);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bodyPage">
      <header>
        <div className="toogle">
          <Switch
            onChange={() => {
              gradosF ? setGrdosF(false) : setGrdosF(true);
            }}
            checkedIcon={
              <p
                style={{
                  fontSize: 15,
                  position: "absolute",
                  marginLeft: "0.3rem",
                  marginTop: "0.2rem",
                }}
              >
                F
              </p>
            }
            uncheckedIcon={
              <p
                style={{
                  fontSize: 15,
                  position: "absolute",
                  marginLeft: "1.1rem",
                  marginTop: "0.2rem",
                }}
              >
                C
              </p>
            }
            height={30}
            width={60}
            checked={gradosF}
          />
        </div>
      </header>
      <div className="divider"></div>
      <div className="search">
        <div className="searchConten">
          <div className="input">
            <input
              placeholder="Enter a city name"
              value={citiName}
              onChange={(event) => {
                setcitiName(onTextChange(event));
                loadCitys();
              }}
            />
            <div className="citysContainer" style={{ marginTop: "0.5rem" }}>
              {cities?.map((ci, i) => {
                return (
                  <button
                    key={i}
                    className="selectCity"
                    onClick={() => {
                      setcitiName(ci.name);
                      setcityselect(ci);
                      setCities([]);
                    }}
                  >
                    {ci.name ? ci.name : ""}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="contenElemets">
            <button
              className="submit"
              onClick={() => {
                saveCard();
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="cardContainer">
          <FlatList
            list={citiesList}
            displayGrid
            minColumnWidth="20rem"
            renderItem={card}
            renderWhenEmpty={() => (
              <div className="row" style={{ color: "#9FAAAE", fontSize: 30 }}>
                <div style={{ fontSize: 100 }}>
                  {" "}
                  <i className="wi wi-day-cloudy"></i>
                </div>
                <h6 style={{ marginLeft: "2rem" }}>
                  Submit a city to fill up this space
                </h6>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
