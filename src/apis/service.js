import axios from "axios";
export const getPlayList = async () => {
  try {
    return await axios.get(
      "https://jukebox-310122-default-rtdb.europe-west1.firebasedatabase.app/playlist.json"
    );
  } catch (err) {
    alert(err);
  }
};
