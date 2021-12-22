import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const Wiki = ({ wikis, removeWiki }) => {

  return wikis?.map((wiki, index) => (
    <div
	className='wiki-row'
	key={index}
	>
		<h3>{wiki.title}</h3>
		<p dangerouslySetInnerHTML={{ __html: wiki.snippet  }}></p>
		<a href={`https://en.wikipedia.org/?curid=${wiki.pageid}`} target="_blank" rel="noreferrer">Read more</a>
		<div className='icons'>
			<RiCloseCircleLine
			onClick={() => removeWiki(wiki.pageid)}
			className='delete-icon'
			/>
		</div>
    </div>
  ));
};

export default Wiki;