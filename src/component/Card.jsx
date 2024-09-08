import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE, GET_NOTES } from "./graphql/queries";
import { useMemo } from "react";

const Card = ({ note }) => {
  dayjs.extend(relativeTime);
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: { id: note.id },
    refetchQueries: [GET_NOTES, "getNotes"],
  });
  const User_Name = JSON.parse(
    localStorage.getItem("token") || "{access: ''}"
  )?.username;
  const days = dayjs(note.createdAt).toNow().split(" ")[1];
  const isDay = dayjs(note.createdAt).toNow().split(" ")[2];
  const colorArr = ["#d9d4ee", "#ead5e1", "#cdd9b1", "#6cb196", "#87d0b7"];
  const randomArr = useMemo(() => {
    return Math.floor(Math.random() * colorArr.length);
  }, [note]);
  
  return (
    <div
      className="notesBorder basis-80 relative overflow-hidden flex pt-2"
      style={{ backgroundColor: colorArr[randomArr] }}
    >
      {((days < 1 && isDay != "days") || days == "a" || isDay != "days") && (
        <div className="bg-p-primary w-12 h-10 flex justify-center items-center  isNew">
          <p className="text-xs font-thin z-50 text-white -rotate-45">New</p>
        </div>
      )}
      <div className=" flex flex-col w-full">
        <div className="flex ml-2 gap-4 items-center">
          <div
            className={`w-8 h-8 rounded-full flex justify-center items-center bg-p-secondary`}
          >
            <p className="text-md text-black">{User_Name[0]}</p>
          </div>
          <h1 className="text-2xl font-medium text-black">{User_Name}</h1>
        </div>
        <div className="p-2 text-black">
          {" "}
          <h3 className="text-lg font-bold">{note.title}</h3>
          <p
            className="text-sm "
            dangerouslySetInnerHTML={{
              __html: note.detail,
            }}
          ></p>
        </div>
        <div className="flex gap-2 items-center text-black p-2 text-sm mt-auto">
          <RiDeleteBin6Line
            className="text-lg cursor-pointer hover:opacity-45"
            onClick={deleteNote}
          />{" "}
          |
          <CiEdit className="text-lg cursor-pointer" />
          <p className="ml-auto">{dayjs(note.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
