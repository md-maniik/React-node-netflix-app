import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useState, useEffect } from "react";
import axios from "axios"

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/lists${type ? "?type=" + type: ""}${genre? "&genre=" + genre : ""}`,
          {
            headers: {
              token:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYThhMzU3ODk5M2Y3OTViZmI3MTQzZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MjIzNjY0NiwiZXhwIjoxNjcyNjY4NjQ2fQ.CPmiakVS6PNG7gFsjCBr8GE2mGsQvLazURBjNtErPOA"
            },
          }
        );
        setLists(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type}/>
      {lists.map((list) => {
        return <List key={list._id} list={list}/>
      })}
    </div>
  );
};

export default Home;
