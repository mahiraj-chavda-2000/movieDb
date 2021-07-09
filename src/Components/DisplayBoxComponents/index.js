import React, { useState, useEffect } from "react";
import Moment from "moment";
import "./Display.css";
import { useParams } from "react-router";
import { MovieDBApiKey } from "../../utils/config";

const GetMovieInfo = (props) => {
  const { id } = useParams(); //Id for Display
  const [actors, setActors] = useState([]);
  //Movie api
  const GetMovieApi = `https://api.themoviedb.org/3/movie/${id}?api_key=${MovieDBApiKey}&language=en-US`;
  const ActorApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${MovieDBApiKey}`;
  //states
  const [info, setInfo] = useState([]);

  //useEffect
  useEffect(async () => {
    await fetchMovieData();
    await fetchActor();
  }, []);

  //Function For fetch data from api
  const fetchMovieData = async () => {
    fetch(GetMovieApi)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setInfo(data);
      });
  };
  const fetchActor = async () => {
    fetch(ActorApi)
      .then((res) => res.json())
      .then((actdata) => {
        console.log(actdata.cast);
        setActors(actdata.cast);
      });
  };

  //Function for display data
  const renderDisplayMovieInfo = () => {
    const IMAGES = "https://image.tmdb.org/t/p/original";
    const NewDate = Moment(info.release_date).format("DD-MM-YYYY");
    const releseYear = Moment(info.release_date).format("YYYY");
    return (
      <div>
        <div className="movie_card" id="bright" key={info.id}>
          <div className="info_section">
            <div className="movie_header">
              <img
                className="locandina"
                src={IMAGES + info.poster_path}
                alt={props.title}
              />
              <h3>{info.title}</h3>
              <h4>{releseYear}</h4>
              <span className="minutes">{info.runtime} min</span>
              <p className="type">Language : {info.original_language}</p>
            </div>
            <div className="movie_desc">
              <p className="text">{info.overview}</p>
            </div>
            <div className="movie_social">
              <ul>
                <li>
                  <i className="material-icons">share</i>
                </li>
                <li>
                  <i className="material-icons"></i>
                </li>
                <li>
                  <i className="material-icons">chat_bubble</i>
                </li>
              </ul>
            </div>
          </div>
          <div className="blur_back bright_back"></div>
        </div>
      </div>
    );
  };

  const renderActorInfo = () => {
    const IMAGES = "https://image.tmdb.org/t/p/original";

    return actors.map((actor, index) => (
      <div>
        <div className="movie_card" id="bright" key={actor.id}>
          <div className="info_section">
            <div className="movie_header">
              <img
                className="locandina"
                src={IMAGES + actor.profile_path}
                alt={props.name}
              />
              <h3>{actor.name}</h3>

              <span className="minutes">Popularity :{actor.popularity}</span>
            </div>
          </div>
          {/* <div className="blur_back bright_back"></div> */}
        </div>
      </div>
    ));
  };

  //render Method
  return (
    <div className="movie-container">
      {renderDisplayMovieInfo()}
      {renderActorInfo()}
    </div>
  );
};

export default GetMovieInfo;
