import React, { useEffect, useState } from "react";
import { CardDeck, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
// import CardColumns from "react-bootstrap/CardColumns";
import Columns from "react-columns";

function App() {
  //use react hooks and store information inside string
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
        axios.get("https://corona.lmao.ninja/v3/covid-19/countries"),
      ])

      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  //search By filtering countryname and store in one variable
  //return country name from api and search country
  //collect inside filterCountry variable

  // const filterCountry = results.filter((item) => {
  //   //if the value inside search country is not empty show all the list
  //   return searchCountry !== "" ? item.country === searchCountry : item;
  // });

  const filterCountries = results.filter((item) => {
    //if the value inside search country is not empty show all the list
    return searchCountries !== ""
      ? item.country.includes(searchCountries)
      : item;
  });

  //we are using filterCountry which filter above. so it
  //will filter one country and map here
  const countries = filterCountries.map((data, i) => {
    return (
      <Card
        key={i}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img
          variant="top"
          height="300px"
          width="280px"
          src={data.countryInfo.flag}
        />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Population {data.population}</Card.Text>
          <Card.Text>Total Test {data.tests}</Card.Text>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recovered {data.recovered}</Card.Text>
          <Card.Text>Today's cases {data.todayCases}</Card.Text>
          <Card.Text>Today deaths {data.todayDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
          <Card.Text>Critical {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });
  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];
  return (
    <div>
      <br />
      <h2
        style={{
          textAlign: "center",
          color: "#2effa3",
          backgroundColor: "#660066",
          cursor: "pointer",
          padding: "20px",
        }}
      >
        Covid-19 Live Status
      </h2>

      <CardDeck>
        <Card
          bg="dark"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text={"white"}
          className="text-center "
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Label>Search Cases By Country:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search a Country"
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
