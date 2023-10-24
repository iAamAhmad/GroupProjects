import React from "react";


import Track from "../Tracks/Tracks";

const TrackList = (props) => {
   const { tracks, onAdd, isRemoval, onRemove } = props;
// to sesolve error jab search bar ma kuch na ho aur
// search kro to track-list ma error ki jagha "no track available" aayi ga
   if (!tracks || !Array.isArray(tracks)) {
      return <div>No tracks available.</div>;
    }
//-----------------------------------

   return (
      <div className="w-full">
         {tracks.map((track) => {
            return (
               <Track
                  track={track}
                  key={track.id}
                  onAdd={onAdd}
                  isRemoval={isRemoval}
                  onRemove={onRemove}
               />
            );
         })}
      </div>
   );
};

export default TrackList;
