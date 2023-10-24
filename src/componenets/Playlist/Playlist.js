import React, { useCallback } from "react";

import TrackList from "../TrackList/TrackList";

const Playlist = (props) => {
   const { onSave, playlistTracks, onRemove, onNameChange } = props;
   const handleNameChange = useCallback(
      (event) => {
         onNameChange(event.target.value);
      },
      [onNameChange]
   );

   return (
      <div
         className="flex flex-col items-center w-37 max-h-950 px-10 py-5 bg-opacity-70 bg-blue-900 shadow-md border-solid border-2 border-neutral-950">
         <input
            onChange={handleNameChange}
            placeholder={"New Playlist"}
            className="p-2 text-slate-500 text-center rounded-md"
         />
         <TrackList
            tracks={playlistTracks}
            isRemoval={true}
            onRemove={onRemove}
            className='border-0 outline-none bg-transparent border-b border-gray-400 font-poppins text-2 text-white'
         />
         <button
            className="w-full h-12 px-1 text-indigo-100 transition-colors duration-150 bg-indigo-950 rounded-full focus:shadow-outline hover:bg-indigo-800 mt-4"
            onClick={onSave}>
            SAVE TO SPOTIFY
         </button>
      </div>
   );
};

export default Playlist;
