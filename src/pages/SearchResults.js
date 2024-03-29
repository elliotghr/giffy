import React, { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ListOfGifs from "../components/ListOfGifs";
import SearchForm from "../components/SearchForm";
import Spinner from "../components/Spinner";
import useGifs from "../hooks/useGifs";
import useNearScreen from "../hooks/useNearScreen";
// import useTitle from "../hooks/useSEO";
// import debounce from "just-debounce-it";

const SearchResults = () => {
  let { keyword } = useParams();
  const { loading, gifs, setPage } = useGifs(keyword);
  const { isNearScreen, lazyElement } = useNearScreen("10px", false);
  // const debounceHandleNextPage = useRef();
  const title = gifs ? `${gifs.length} resultados de ${keyword}` : "";
  // useTitle({ title });

  const handleNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, [setPage]);
  // const handleNextPage = (e) => {
  //   console.log("next page");
  // };

  // const debounceHandleNextPage = useCallback(
  //   debounce(() => console.log("next page"), 1000),
  //   []
  // );

  useEffect(() => {
    // if (isNearScreen) debounceHandleNextPage();
    if (isNearScreen) handleNextPage();
  }, [isNearScreen, handleNextPage]);

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <article>
            <SearchForm></SearchForm>
          </article>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={title}></meta>
          </Helmet>
          <h3>{keyword}</h3>
          <ListOfGifs gifs={gifs}></ListOfGifs>
          {/* Creamos un punto de referencia para detectar el final y hacer el scroll infinito */}
          <div id="visor" ref={lazyElement}></div>
          <button onClick={handleNextPage}>Get next page</button>
        </>
      )}
    </>
  );
};

export default SearchResults;
