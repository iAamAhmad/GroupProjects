import React from "react";


import Track from "../Tracks/Tracks";

const TrackList = (props) => {
   const { tracks, onAdd, isRemoval, onRemove } = props;
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
