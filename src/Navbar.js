import "bootstrap/dist/css/bootstrap.min.css";
import { DebounceInput } from "react-debounce-input";
// import { useState } from "react";

export default function Navbar({ getSearchPhotos }) {
  //Saving past inputs in the local storage display functionality to be done.
  function handleChange(e) {
    getSearchPhotos(e.target.value);

    if (localStorage.getItem("searchedArr") === null) {
      let arr = [e.target.value];
      localStorage.setItem("searchedArr", JSON.stringify(arr));
    } else {
      let arr = JSON.parse(localStorage.getItem("searchedArr"));
      arr.push(e.target.value);
      localStorage.setItem("searchedArr", JSON.stringify(arr));
    }
  }

  return (
    <nav className="navbar navbar-light bg-dark fixed-top">
      <div className="container-fluid d-flex flex-column justify-content-center">
        <h2 style={{ color: "white" }}>Search Photos</h2>
        <form className="d-flex">
          {/* Debouncing search for 0.5s */}
          <DebounceInput
            className="form-control me-2"
            placeholder="Type Something ..."
            type="text"
            minLength={3}
            debounceTimeout={500}
            aria-label="Search"
            onChange={handleChange}
          />
        </form>
      </div>
    </nav>
  );
}
