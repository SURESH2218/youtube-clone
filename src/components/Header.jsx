import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

export const Header = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showsuggestions, setshowSuggestions] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const searchCache = useSelector((store) => store.search);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // console.log(searchQuery);
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
    // getSearchSuggestions();
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const response = await data.json();
    // console.log(response[1]);
    setSuggestions(response[1]);

    //update cache
    dispatch(cacheResults({ searchQuery: response[1] }));
  };

  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleMenu());
  };
  const handleButton = (setvalue) => {
    // console.log(setvalue);
    setsearchQuery(setvalue);
    setshowSuggestions(false);
  };
  return (
    <div className="grid grid-flow-col shadow-xl m-2 p-2 items-center">
      <div className="flex items-center ">
        <img
          onClick={handleToggle}
          className="h-8 cursor-pointer"
          src="https://static.thenounproject.com/png/683452-200.png"
          alt="hamburger"
        />
        <a href="/">
          <img
            className="h-10 "
            src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg"
            alt="youtubeLogo"
          />
        </a>
      </div>
      <div className="col-span-10 flex flex-col w-full">
        <div className="flex justify-center">
          <input
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
            type="text"
            placeholder=""
            onFocus={() => setshowSuggestions(true)}
            // onBlur={() => setshowSuggestions(false)}
            className="w-[60%] rounded-l-full border p-2 border-gray-500"
          />
          <button className="rounded-r-full p-2 border-gray-400 bg-gray-200 border">
            <img
              className="h-5 mix-blend-color-burn"
              src="data:image/png;base64,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"
              alt="searchIcon"
            />
          </button>
        </div>
        {showsuggestions && (
          <div
            className={`fixed mt-11 shadow-lg border-gray-400 ml-56 bg-white px-5 w-[43rem] rounded-lg ${
              scrollPosition > 0 ? "hidden" : ""
            }`}
          >
            <ul>
              {suggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => handleButton(s)}
                  className="shadow-sm relative z-50 cursor-pointer py-2 hover:bg-gray-100"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="">
        <img
          className="h-8"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcEBQgBAwL/xABHEAABAwMBBAgBBwgHCQAAAAABAAIDBAURBgcSITETQVFhcYGRoRQiIzJCUsHSFRZDU2JjsdEXVXKCksLhJCUzRFSDk6Oy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALxREQEREBEysC73i3WWm+JudZFTRdRkdxcewDmT4IM9eZVTX7bJGxzo7DbzIAOFRVHdHkwcceJCi35xa/1RvfBSV8sbx9Gih6Jg8HcPdyDoIuAGXEAd6+XxVPnd6eLPZvhUJHs11pcQH1sW6T/1lbvu9i5fX+h7UeM5tuezpT+FBfYcCMjiO5ern6TZrrS2guoot4jj/sVb0Z9y1fn84tf6Xwa2S4RxtHKti6SPzcfucg6DRVJYdssby2O/UBjB/wCYpDvDzYeI8iVZlnvFuvVN8Ta6yKpi6yx3FvcRzB8UGeiZCICIiAiIgIiIC8Jwh5cFUW1DaE7pJrFYZiCCY6urjPHrBjYRyPafIcc4Dba72m09nfLb7H0dVXt4PmPGKA9n7Tu7kPZQKy6U1LrysNxrZpGwP51tVxBHZG3rHLgMBSfZ5szD2xXXU0PAgOgoXDGB2yD/AC+vYLcYxrGhrWgNbwAAwAgiGntm+nrKGyOpvjqnrmqgHejeQ/j3qXtYGgBoAA5ADAX6RARYdyutvtcXS3KupqSPqdPK1gPqVpvz+0nv7n5eovHf4evJBJV+XMDmlrgC09RHBYtuulvukXS22upquP7UErXj2KzEEP1Fs409eg6RtN8DU8SJaXDcnvbyKqq9aV1NoOtFyop5XU7MkVtLwaB2SN6hx68hdCr8vY17S1zQWkYIIyCEFdaE2m014dHb72I6S4HDWSjhFOezj9F3ceHZ2KxgcqotomzMMZLddMw4wN6agaOHjGB/8+nYvNl+0J3SQ2G/zk5IjpKuR3HPIRvPb2HyPVkLfReA969QEREBEWPcKyG30U9ZVPEcEEbpJHHqaBkoIPtY1e6w20W63y7txrGH5TTxhj5F3cTyHn2KN7JNENqTHqK7Rl0YOaKJ4yHn9ac8x2evYo3Z6Wq2ia8fJV73QyvM0/P5uBpwGDyw3zJXQkEMcELIYWNZGxoa1rRgNA4ABB9EREBVdtF2lPttRJadPFjqpnyZ6twy2I/ZZ1F3bngO8qT7SNQSad0vPUUzg2rmIhgJ6nO5nyaCfHC5x4niSSesk5JQfWqqqmtqHVFbUS1E7jkyTPL3HzK+XkERB9aOqqaKobUUc8tPO05EkLy1w8wri2d7Szcqhlq1C6NlW/DYKoDdbKfsu7HdmOB7jzphASCCCQQeBHMFB1wiiuzfUL9RaXp6iodvVcJMFR3ubyd5twfNSpB4RlU5tc0S2lMmo7RHuxl2ayFg4NP60Y5fteR7Vci+c8Uc8L4ZmNkikaWvY4ZDgeYKCB7J9Xuv1tNtuEu9caNoG84/Kmi5B/eRyPketWAudrxS1ezrXbJKTeMMT+mgz+kgccFh78Zb5AroG31kFwooKylkEkE8bZI3DraRkIMhERAVc7bbwaLT0FticRJXy4fg/o2cT6ndCsUqhtstZJcdbNt8Jz8NDHC0ftv+V97UE32K2VtBpt9ykZiouEm8CRx6JvBo9d4+asNYlqoo7dbaShhGI6aFkTfBoAWWgIiIKe2+VDxPY6UH5stnlcO1w6MD+LvVVQrl28W501utdyY0kU0r4XnsEgac+rAPNU0gIiICIiC19gVQ/p77SE/NhsEoHY49ID7BvorhVWbCLa6G3XS5vBAqZWQs7xGHEn1efRWmgIiIK7202Rtfpxlzjb8/b37xcOfRO4OHrunyX52JXh1Zp2e2zOzJQS4Zx/Rv4j0O8PRTu60UdxtlXQyjLKiF8TvBwIVIbG6uS362fQSnHxEMkLx+8Zx/yuQX0iBEHhVAXIC4bY915y03WNpHc0t/CugFz/COi2yt3uq7n3Jx/FB0AiIgIiINdf7RTX20VVtrRmGobgnraQctcO8EA+S5nvtnrLDdJrbcWbs0XIj6L2nk5vcf9F1StHqnS9s1NRinuUJ3mZMU8Zw+I9x+48EHMaKfXzZPqCgc51s6K5xZ4BhEUmP7Ljj0K0P5kaqzu/kCt3uzDceuce6CPrPsVnrL7dIbdbmb08vWeTG9bj3BS+xbJ9QV5a65mK2Rde+RLJj+y0491b2ltLWvTFG6nt0B3346WeQ5fKe8/cOCDLsFop7FaKW20YxDTs3QTzcSclx7yST5rYoiAiIgLn+2/wC79sYYw4a26ytHg4n8S6AXP83zm2R4H9cDHkR/JB0AiIgLn7WRNo2ry1LvktbW09Rn9khpJ9iugVS23e19Hc7fc2tO5UQmneR9ppyPZx9EF0A55civVodDXUXrSttrS4OkdCGSkfrG/Jd7grfICLw8lXu0HaPFYHvttoEdRcwMSOdxZT+Pa7u9UE4uNyorZTme41UNLEPryvDQobX7WdMUxIp31VYR+phIB83YVHXS41t2rHVdyqpamd315HZx3AcgO4LFQXUds9nzwtVyP/j/ABJ/TPZ/6puX/r/EqVRBdY2z2cnjarkB/wBv8S2FBtZ0xUkCofVUZ/fQ5HqzKoREHVtuudDc6cVFuqoaqE/XheHD2WVlcpWy5VtpqxV2yqlpZx9aJ2M9xHIjuKuvZ9tHiv72W27NZTXMj5Dm8I6jtx2O7vTuCw0Xg5L1B4TgZPJc/wCjD+WNq8dS35TXVk9RnuG8Qf4equPXF1Fl0rcq0O3ZGwlkR/eO+S33IVabCbZv3S4XNzctp4W07HftOOT7AeqC6QiBEBRbaTY3X7SdZBCzfqoB09OOsvb1eYyPNSlEFN7D9QCGqqrDUOw2bNRT5+2MB7fQA+TlcioDaLYp9H6riulrJip6ib4ime0nEcoOXM8OZx2EjqVyaQ1FTamskNwpiA/6E8WeMUgAJb7gjuIQafabqw6ZsoZSub+UavLKcE8WAfSfjuyPMhc9uc57i57nPc4kuc45JJ6ye1TTa/NXTa1nFbFJHFHG1lLvcnx8y4eLifRQpAREQEREBERAXrHOY9r2OcxzSC1zTgtI5EHqK8RB0Nsz1WdTWTdqnN/KNIQyfH1x9V+O/B8wVMScLn3ZBPWw61gFFFJLDLG5lVu/RZHjIcf7wb6q59YaiptM2Sa41JaXj5EERODLIQcN9snsAJQVvtx1AJaqlsNO7LYf9oqCOpxBDW+mT5hTvZrYzYdJ0kErN2pnHTzg8w93UfAYHkqq2dWKfV+rJLrdMy08E3xFS85xJLkFrPDrx2DHWr+AwgIiICIiDU6msNJqOzT22tGGyDLJAAXRP6nDPWP9FRlpuN32b6qkp6thczg2ohH0aiPPB7M9fYfEHu6JUd1npOh1Vb/h6odHUR8YKho+VGezvB6x96DFultsW0LT0crZA9jhvQVDABJC/sx1d7T/ACVF6m0zc9M1vw1zi+Q4noqhgPRyjuPUe48QtxT1Go9ml9dG9m6yQ5dG7JgqW/aB7e/mOvsVs2LU2ndc0DqOVkTpHt+doaloLuHWPtDvHsg52RW1qXY+S58+mqsDPH4SrdwHc14GfUHxVdXfTd7szyLlbKmFo/Sbm8w/3hke6DVIvMgnAK9QEXmQOZW2tGm71eXBtttlTMD+k6MtZ/iOAg1S3OmNM3PU1Z8PbYjuNI6WoeCI4h2k9vYBxKsLTOx/BZUamqmuwcmkpXcDz4OeRns5AeKlt81Np3QtvZRwxxNkY35mhpgAfE/ZHefdB9LXbbHs909JLJK2ONo3p6l4+cmd2d/c0KortcbvtJ1TFBSx7rM4p4Sctp488Xv7+WT4AdSVNTqPaXfWRMZvMYctjaCIKVvLJPaR18z1cOVz6M0nQaWt5gph0tRJgz1Lm4dIfuA6ggzNM2Kl07Z4LdRDLWcXyEAOleebjjrP8gtsg4IgIiICIiAiIgwLxaKC9UTqO50sdRA7juvHI9oPMHvCp/VGyi5W2b4vTsjq2Fri8RF27PH2bp5O6+PA+Ku9eEZQULZdpupLDKaK7xGtEfB0dWDHM3+9j+IPip5a9rGm6wBlcaigeRxE0Rc3/E3PvhS672S13mHorpQwVTerpGZI8DzHkoTc9j9iqcut9TV0Luob3StHk7j7oN26o0LexmSSx1RPXJ0effivx+bWgv8Aifk6x47cR4UFqNi1eCegvNLKOySncz7ysT+hi9b+Pi7bj7Xyv4bqCyBUaFsgyySxUu79jo8j0Wsum1nTdGC2iNTXPA4CGItb6ux7ZUWpti9ecdPeqaIfu6dz/vCkFr2P2Kmw64VNXXO6xno2+jePughl52m6kv0go7TEaESHDY6MGWZw7N7GfQDxWZpbZTdLlN8ZqSV9HE4hzow4Pnl7cn6vjxPgretFjtdmh6K1UEFK3r6NgBPieZWxQYFms9BZKJlHa6WOngbx3WDi49pPWe8rPREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/9k="
          alt="userIcon"
        />
      </div>
    </div>
  );
};
