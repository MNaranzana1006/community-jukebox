import React from "react";
import VideoItem from "./VideoItem";

const PlayList = ({ listVideo }) => {
  let hasVideos;
  if (listVideo.length > 0) hasVideos = true;
  return (
    <div className="relative mt-4 rounded-lg md:mt-0 md:col-span-1 md:h-full border dark:border-primary border-opacity-50 shadow-md dark:shadow-primary ">
      {hasVideos ? (
        listVideo.map((el) => (
          <div
            key={el[0]}
            className="dark:bg-gray-400 bg-gray-200 shadow-lg grid grid-cols-1 lg:grid-cols-3 p-1 gap-2 rounded-md m-2"
          >
            <VideoItem video={el[1].video} />
            <div className="lg:col-span-1 flex items-center justify-end">
              <button className="px-4 py-2 border-gray-300 dark:border-secondary border-2 text-gray-800 dark:shadow-secondary shadow-md dark:text-gray-800 rounded-xl text-md focus:outline-none">
                <span>Vote</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center md:mt-4 p-4">
          <p className="text-xl font-bold text-gray-700 dark:text-gray-100">
            Playlist is empty.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayList;
