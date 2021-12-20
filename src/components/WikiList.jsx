import React, { useState, useEffect, useCallback } from 'react';
import Wiki from './Wiki';
import axios from "axios";
import AutoCompleteDataList from "./AutoCompleteDataList";

function WikiList() {
  const [wikis, setWikis] = useState([]);
  const [item, setItem] = useState({});
  const [term, setTerm] = useState("")
	const [results, setResults] = useState([])
	
	useEffect(() => {
	  const search = async () => {
		const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      })
		setResults(data?.query?.search || [])
	  }
	  search()
	}, [term])


  const onSelect = useCallback((selectedItem) => {
    console.log("selectedItem", selectedItem);
    setItem(selectedItem)
  }, []);

  const addWiki = () => setWikis(wikis => [item, ...wikis]);

  function removeWiki(id) {
    const removedArr = [...wikis].filter(wiki => wiki.pageid !== id);

    setWikis(removedArr);
  }

  return (
    <>
      <h1>My Wiki List</h1>
	  <div className="search-box">
		<AutoCompleteDataList myValues={results} setTerm={setTerm} onSelect={onSelect} />
		<button className="btn" onClick={addWiki}>Add wiki</button>
	  </div>
	  <div className="wiki-container">
		<Wiki
			wikis={wikis}
			removeWiki={removeWiki}
		/>
	  </div>
    </>
  );
}

export default WikiList;