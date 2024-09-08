import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import NoteLoader from "../component/NoteLoader";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/DarkAndLightMode";
import useDebounce from "../component/Hooks/useDebounce";
import { useNotes } from "../component/graphql/hooks";
import Card from "../component/Card";
import Pagination from "../component/Pagination";
import { getToken } from "../component/Interceptor";
const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavScroll, setIsNavScroll] = useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [addSearchValue, setAddSearchValue] = useState("");
  const { setGetSearchKey, getSearchKey } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [setPreviousPage] = useState(0);

  const { notes, error, totalPages } = useNotes(getSearchKey, currentPage);
  console.log(notes,error?.message, "key");

  if(error){
    getToken(error?.message,navigate)
  }

  useEffect(()=>{},[currentPage])

  //Hooks
  const searchKey = useDebounce(
    addSearchValue,
    setAddSearchValue,
    searchValue,
    1000
  );

  //Functions
  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    setGetSearchKey(searchKey);
  }, [searchKey]);

  useEffect(() => {
    const delay = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 6000); // 6 seconds delay
    });

    delay.then(() => {
      setIsLoading(false);
    });
  }, []);

  if (error || notes?.length === 0) {
    return (
      <div style={{ display:'flex',justifyContent:'center',alignItems:"center", color: "red", height: "100vh",width:'100vw', }}>
       <p> Data unavailable</p>
      </div>
    );
  }

  const changeNavColor = () => {
    if (window.scrollY >= 90) {
      setIsNavScroll(true);
    } else {
      setIsNavScroll(false);
    }
  };

  window.addEventListener("scroll", changeNavColor);

  return (
    <div
      className={` w-screen min-h-screen flex flex-col gap-4 justify-center relative`}
    >
      {isLoading ? (
        <NoteLoader />
      ) : (
        <>
          {/* search */}
          <div
            className={`sticky z-50 top-0 ${isNavScroll && "searchh"} w-full flex items-center gap-12`}
          >
            <div className=" bg-p-surface relative top-0 z-[999] w-[70%] h-12 mb-4 rounded-md mt-4 ml-4 flex gap-2 items-center p-2 cursor-pointer hover:ring-4 hover:ring-p-primary transition-all ease-linear hover:ring-opacity-30">
              <CiSearch className="text-3xl inline-block" />
              <input
                type="text"
                name="search"
                id="search"
                placeholder="search"
                className="bg-transparent w-full border-none outline-none "
                value={searchValue}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="button"
                className="btnn"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/auth");
                }}
              >
                LOG OUT
              </button>
            </div>
          </div>
          {/* notes */}
          <div className="min-h-screen p-2 pl-8 flex flex-col items-center">
            <div className="flex flex-wrap gap-8">
              {notes?.map((note,i) => (
                <Card note={note} key={i}/>
              ))}
            </div>
            <Pagination
            totalPages={totalPages}
            onPrevousPageChange={setPreviousPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
