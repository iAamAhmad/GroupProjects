import React from "react";


import TrackList from "../TrackList/TrackList";

const SearchResults = (props) => {
   const { onAdd, searchResults } = props;
   return (
      <div className="w-full min-h-screen p-1 bg-opacity-70 bg-blue-900 shadow-md border-solid
       border-2 border-neutral-950 me-4">
         <h2>Results:</h2>
         <TrackList tracks={searchResults} onAdd={onAdd} />
      </div>
   );
};

export default SearchResults;
