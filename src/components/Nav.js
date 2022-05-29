import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic} from "@fortawesome/free-solid-svg-icons";

function Nav({ setLibraryStatus, libraryStatus }) {
  return (
    <nav>
        <h4>Waves</h4>
      <button
        onClick={() => setLibraryStatus(!libraryStatus)}
        className={`nav-library`}
      >
        Library <FontAwesomeIcon icon={faMusic} />
      </button>     
    </nav>
  );
}

export default Nav;
