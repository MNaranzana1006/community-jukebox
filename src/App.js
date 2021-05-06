import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import VideoPlayer from "./components/VideoPlayer";
import PlayList from "./components/PlayList";
import MostVoted from "./components/MostVoted";
import SearchFromYoutube from "./components/SearchFromYoutube";
import youtube from "./apis/youtube";
import SearchList from "./components/SearchList";
import axios from "axios";
import { useAlert } from "react-alert";
import { getPlayList } from "./apis/service";

function App() {
  const [listVideo, setListVideo] = useState([]);
  const [mostVotedVideo, setMostVotedVideo] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [playListVideo, setPlayListVideo] = useState([]);
  const [countAddVideo, setCountAddVideo] = useState(0);
  const alert = useAlert();

  useEffect(() => async () => {
    const list = await getPlayList();
    setPlayListVideo(Object.entries(list.data));
  });

  const toggleShowPlaylist = (isActive) => {
    setShowPlaylist(isActive);
  };
  const searchFromYoutube = async (searchText) => {
    await youtube
      .get("/search", {
        params: {
          q: searchText,
        },
      })
      .then((res) => {
        setShowPlaylist(false);
        setListVideo(res.data.items);
      });
  };

  const addToPlaylist = (video) => {
    if (playListVideo.length >= 10) {
      alert.error("Playlist is full!!!");
      return;
    }
    if (countAddVideo >= 2) {
      alert.error("You are 2 videos added.");
      return;
    }
    axios
      .post(
        "https://jukebox-310122-default-rtdb.europe-west1.firebasedatabase.app/playlist.json",
        { video, vote: 0 }
      )
      .then((res) => {
        setPlayListVideo(getPlayList());
        setShowPlaylist(true);
        if (listVideo.indexOf(video) > -1) {
          listVideo.splice(listVideo.indexOf(video), 1);
        }
        alert.success("Added to playlist");
        setCountAddVideo(countAddVideo + 1);
      })
      .catch((err) => alert.show(err));
  };

  return (
    <div className="w-full min-h-screen dark:bg-black bg-gray-200">
      <div className="container p-4 mx-auto max-w-screen-xl">
        <Navbar />
        <div className="grid md:grid-cols-3 md:gap-4 mt-4 md:mt-0">
          <div className="md:col-span-2">
            <VideoPlayer />
            <div className="w-full md:w-2/3 m-auto mt-4">
              <SearchFromYoutube searchFromYoutube={searchFromYoutube} />
              <MostVoted video={mostVotedVideo} />
            </div>
          </div>
          <div className="md:col-span-1 mt-4 md:mt-0">
            <button
              className={showPlaylist ? "tab-active" : "tab-deactive"}
              onClick={() => toggleShowPlaylist(true)}
            >
              Playlist
            </button>
            <button
              className={!showPlaylist ? "tab-active" : "tab-deactive"}
              onClick={() => toggleShowPlaylist(false)}
            >
              Search List
            </button>
            {showPlaylist ? (
              <PlayList listVideo={playListVideo} />
            ) : (
              <SearchList listVideo={listVideo} addToPlaylist={addToPlaylist} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
