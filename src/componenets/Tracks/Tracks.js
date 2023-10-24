import React, { useCallback } from "react";

const Track = (props) => {
  const { track, onRemove, isRemoval, onAdd } = props;
  const addTrack = useCallback(
    (event) => {
      onAdd(track);
    },
    [onAdd, track]
  );

  const removeTrack = useCallback(
    (event) => {
      props.onRemove(track);
    },
    [onRemove, track]
  );

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button
          className="cursor-pointer py-2.5 text-1.05 transition-color duration-250 bg-transparent text-white hover:text-gray-200"
          onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button
        className="cursor-pointer py-2.5 text-1.05 transition-color duration-250 bg-transparent text-white hover:text-gray-200"
        onClick={addTrack}>
        +
      </button>
    );
  };

  return (
    <div className="flex items-center border-b border-gray-300">
      <div className="flex flex-col justify-center h-32">
        <h3 className="mb-2.22">{track.name}</h3>
        <p className="text-0.83 font-light text-gray-300">
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
