import React from "react";
import VideoItem from "./VideoItem";
import AddToPlayListButton from "./AddToPlayListButton";

const SearchList = ({ listVideo, addToPlaylist }) => {
  let hasVideos;
  if (listVideo.length > 0) hasVideos = true;
  return (
    <div className="relative mt-4 rounded-lg md:mt-0 md:col-span-1 md:h-full border dark:border-primary border-opacity-50 shadow-md dark:shadow-primary ">
      {hasVideos ? (
        listVideo.map((el) => (
          <div
            key={el.etag}
            className="dark:bg-gray-400 bg-gray-200 shadow-lg grid grid-cols-1 lg:grid-cols-3 p-1 gap-2 rounded-md m-2"
          >
            <VideoItem video={el} />
            <AddToPlayListButton addToPlaylist={addToPlaylist} video={el} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center md:mt-4 p-4">
          <p className="text-xl font-bold text-gray-700 dark:text-gray-100">
            Search List is empty.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchList;
