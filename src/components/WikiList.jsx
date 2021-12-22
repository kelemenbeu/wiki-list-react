import React, { useState, useEffect, useCallback } from 'react';
import Wiki from './Wiki';
import axios from "axios";
import AutoCompleteDataList from "./AutoCompleteDataList";
import { useAlert } from 'react-alert'

function WikiList() {
  const [wikis, setWikis] = useState([]);
  const [item, setItem] = useState({});
  const [term, setTerm] = useState("");
	const [results, setResults] = useState([]);
  const alert = useAlert();
	
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
	  term !== "" && search()
	}, [term])


  const onSelect = useCallback((selectedItem) => {
    setItem(selectedItem)
  }, []);

  const addWiki = () => {

    if(Object.entries(item).length !== 0 ) {
      if( wikis.length === 0 ) {
        setWikis(wikis => [item, ...wikis])
      }
      if( wikis.length > 0) {
        if(wikis.some(wiki => wiki.key === item.key)) {
          alert.show("This already exists") && setWikis(wikis)
        }
        else {
          setWikis(wikis => [item, ...wikis])
        }
      }
    }
    else {
      alert.show("Please search and select an item")
    }
  }

  function removeWiki(id) {
    const removedArr = [...wikis].filter(wiki => wiki.pageid !== id);

    setWikis(removedArr);
  }

  return (
    <>
      <h1>My Wiki List</h1>
	  <div className="search-box">
		<AutoCompleteDataList myValues={results} setTerm={setTerm} onSelect={onSelect} setItem={setItem}/>
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