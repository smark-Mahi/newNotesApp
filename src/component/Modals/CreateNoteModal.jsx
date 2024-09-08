import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RxCross1 } from "react-icons/rx";
import { IoAddSharp } from "react-icons/io5";
import { ThemeContext } from "../../context/DarkAndLightMode";
import { useMutation } from "@apollo/client";
import { ADD_Note, GET_NOTES } from "../graphql/queries";
import Snakbar from "../snakbar";

const CreateNoteModal = ({ setOpen }) => {
  const { isDark } = useContext(ThemeContext);
  const [showColors, setShowColors] = useState(false);
  const [showSnakbar, setShowSnakbar] = useState(false);
  const [setWidth, setSetWidth] = useState(0);
  const [setColor, setSetColor] = useState(
    `${isDark ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)"}`
  );
  const [setColorWidth, setSetColorWidth] = useState(0);
  const [body, setbody] = useState("");

  function handleBody(e) {
    console.log(e, "quill");
    setbody(e);
  }

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {}, [setWidth]);
  useEffect(() => {}, [setColor]);

  function getColorHandler(colorr, key, event) {
    //event bubbling is happening(target to top) this is also called event delegation
    //to resolve this issue we are stoping it fron stopProgation()
    console.log(colorr, key, "infunc");
    event.stopPropagation();
    setSetColor(colorr);
    setSetWidth(90);
    setColorWidth(90);
  }
  const dataArr = body.split("<p><br></p>");
  const dataArrTitle = dataArr[0].replace(/(<([^>]+)>)/gi, "");
  const content = dataArr[1];

  const [addNote] = useMutation(ADD_Note, {
    variables: { title:dataArrTitle, detail:content },
    refetchQueries: [GET_NOTES, "getNotes"],
  });

  function saveNoteHandler() {
    if (dataArrTitle && content) {
      addNote(dataArrTitle, content);
      setbody("");
      setShowSnakbar("You have successfully added your note.");
      setOpen(false)
    } else {
      setShowSnakbar("Please fill in all the details.");
    }
  }
  return createPortal(
    <>
      <div className="popup-container">
      {showSnakbar && (
          <Snakbar
            setShowSnakbar={setShowSnakbar}
            showSnakbar={showSnakbar}
            state={"signIn"}
          />
        )}
        <div
          data-theme={isDark ? "dark" : "light"}
          className="popup-internal-container relative"
        >
          <h1 className=" font-semibold text-p-secondary">Add Note...</h1>
          <RxCross1
            className="absolute top-8 right-8 text-3xl cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <div className="modal-body">
            <div className="editor-container">
              <ReactQuill
                placeholder={"create your note here..."}
                modules={CreateNoteModal.modules}
                formats={CreateNoteModal.formats}
                onChange={handleBody}
                value={body}
                // onKeyDown={handleCompositionStart}
                // onKeyUp={handleCompositionEnd}
              />
            </div>
            <div className="customize-container relative">
              <h1 className="text-4xl font-medium text-p-primary ">
                Customize Your Note.
              </h1>
              <div className="mt-6">
                <div className="absolute right-28 w-96 ">
                  <div className="relative rounded-lg bg-p-primaryContaine flex items-center">
                    <input
                      type="range"
                      id="inputHandler"
                      value={+setWidth}
                      className="w-full cursor-pointer"
                      onChange={(e) => setSetWidth(e.target.value)}
                    />
                    <div
                      style={{ width: setWidth + "%" }}
                      className="rounded-lg absolute h-full bg-p-primary"
                    ></div>
                  </div>
                </div>
                {/* color slider */}
                <div className="absolute right-28 w-96 top-32">
                  <div className="relative rounded-lg bg-p-primaryContaine flex items-center">
                    <input
                      type="range"
                      id="inputHandler"
                      value={+setColorWidth}
                      className="w-full cursor-pointer"
                      onChange={(e) => {
                        setSetColorWidth(e.target.value);
                        setSetColor(setColor.substring(0, 5) + setColorWidth);
                      }}
                    />
                    <div
                      style={{ width: setColorWidth + "%" }}
                      className="rounded-lg absolute h-full bg-p-primary"
                    ></div>
                  </div>
                </div>
                <div
                  className={`${showColors && "addNote"} cursor-pointer w-8 h-8 flex justify-center items-center rounded-full bg-p-primary mt-12 colors-btn`}
                  onClick={() => setShowColors(!showColors)}
                >
                  <IoAddSharp className="text-white text-lg" />
                </div>
                {showColors && (
                  <div
                    className="showColors showColors0 bg-p-surface3"
                    onClick={(event) => getColorHandler("#cdd9b1", 1, event)}
                    key={1}
                  >
                    <div
                      className="showColors showColors1 bg-p-surface4"
                      onClick={(event) => getColorHandler("#6cb196", 2, event)}
                      key={2}
                    >
                      <div
                        className="showColors showColors2 bg-p-surface5"
                        onClick={(event) =>
                          getColorHandler("#abc578", 3, event)
                        }
                        key={3}
                      >
                        <div
                          className="showColors showColors3 bg-p-surface2"
                          key={4}
                          onClick={(event) =>
                            getColorHandler("#ead5e1", 4, event)
                          }
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                {/* note preview */}
                <div
                  className={`h-[268px] p-4 rounded-md overflow-auto text-xl text-black  absolute right-12 bottom-4`}
                  style={{
                    minWidth: `${4 * setWidth}px`,
                    backgroundColor: `${setColor}`,
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: body,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <button
            className={`custom-button absolute right-20 bottom-px cursor-pointer }`}
            onClick={saveNoteHandler}
            // disabled={!dataArrTitle && !content}
          >
            Add note
          </button>
        </div>
      </div>
    </>,
    document.getElementById("myPortalModalDiv")
  );
};

export default CreateNoteModal;

CreateNoteModal.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [false, "20px"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["emoji"],
    [{ list: "ordered" }, { list: "bullet" }],
    // ["link", "images", "video"],
    // ["clean"],
    ["code-block"],
  ],
};
CreateNoteModal.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  // "link",
  // "images",
  // "video",
  "code-block",
];
