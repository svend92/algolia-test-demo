import algoliasearch from 'algoliasearch/lite';
import React, { Component, useState } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  RatingMenu,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';
import ReactImageFallback from "react-image-fallback";
import fallbackImg from "./no-image-480x480.png";

const searchClient = algoliasearch(
  'XABU3JL0ZT',
  '63fb7f174ee62393915f9f2cb100d71a'
);

function Putstar(nb) {
  return ("★★★★★".substring(0, nb));
}

function Navbar() {
  const [navbar, setNavbar] = useState(false);

const changeBackg = () => {
if (window.scrollY >= 100)
  setNavbar(true);
else { setNavbar(false);
}
}
window.addEventListener('scroll', changeBackg);
  return (
    <header className={navbar ? 'navbar active' : 'navbar'}>
      {navbar ? '' : <p className="navbar-title">Your Next Movie is just a Click Away!</p>}
        <SearchBox
        showLoadingIndicator
          translations={{
            placeholder: 'Search for Films by Title, Actors ...',
          }}
        />
    </header>

  );
}

class App extends Component {

  render() {
    return (
      <>
        <InstantSearch indexName="demo_MOVIES" searchClient={searchClient}>
        
          <Navbar />
          <div className="content">
<div className="extra-padding" />
            <div className="content-middle">

      <div className="left-panel">
            <h2>Filters</h2>
            <ClearRefinements />
            <h2>Actors</h2>
            <RefinementList attribute="actors" />
            <h2>Genre</h2>
            <RefinementList attribute="genre" />
            <h2>Rating</h2>
            <RatingMenu attribute="rating"/>
            <Configure hitsPerPage={8} />
          </div>
          <div className="right-panel">
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
          </div>
          <div className="div-footer">
          <footer>
            Made with ❤ by Svend - Algolia's next Intern
          </footer>
          </div>
          </div>
        </InstantSearch>
      </>
    );
  }
}

function Hit(props) {
  console.log(props.hit);
  return (
    <>
    <div className="imgblock">
    <ReactImageFallback
                    src = {props.hit.image}
                    align="left"
                    alt={props.hit.name}
                    fallbackImage={fallbackImg}
                    width="154px"
                    height="231px"
            />
            </div>
      <div className="textblock">
      <div className="hit-name">
        <Highlight attribute="title" hit={props.hit} />
      </div>
      <div className="stars">
      {Putstar(props.hit.rating)}
      </div>
      <div className="hit-description">
        <Highlight attribute="actors" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="year" hit={props.hit} />
      </div>
      <div className="hit-description"> 
        <Highlight attribute="genre" hit={props.hit} />
      </div>
      </div>
    </>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
