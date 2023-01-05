import "./listItem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useEffect, useState } from "react";
import axios from "axios"
import {Link} from "react-router-dom"
export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState([])

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/movies/find/63a8b88623ab585ccc7fae3e`,
        {
          headers: {
            token:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYThhMzU3ODk5M2Y3OTViZmI3MTQzZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3Mjc1NjMxNCwiZXhwIjoxNjczMTg4MzE0fQ.W1D3WrTlVM9YT66ZTAHZzJ2dxb57tV52xRYJ-3N9Aro"
          },
        })
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMovie()
  },[item])
    return (
    <Link to={{pathname:"/watch"}} state={{movie}}>
      <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>
            <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon className="icon" />
              <AddIcon className="icon" />
              <ThumbUpAltOutlinedIcon className="icon" />
              <ThumbDownOutlinedIcon className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+16</span>
              <span>1999</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}
