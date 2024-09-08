import { MdOutlineDarkMode } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import CreateNoteModal from "./Modals/CreateNoteModal";

const Sidebar = ({isDark,setDark}) => {
  const [open,setOpen]=useState(false)
  return (
    <>
    <nav className="group">
      <ul>
      <li className="w-12 h-12  bg-p-primaryContaine flex items-center justify-center gap-4 
      rounded-2xl ml-12 mt-12 group-hover:min-w-fit group-hover:min-h-fit group-hover:px-4
      " onClick={()=>setOpen(true)}>
          <MdOutlineEdit className="text-xl" />
          <span className="hidden group-hover:block text-sm font-medium">Add Note</span>
        </li>
        <li className="sidebaractive li">
          <span>
            <IoHomeOutline className="text-xl" />
          </span>
          <a href="" style={{textDecoration:'none',fontWeight:"600"}}>Home</a>
        </li>
        <li className="li">
         <div className="flex justify-center items-center gap-4">
         <input type="checkbox" id="check" className="theme-toggle" onChange={()=>setDark(!isDark)} checked={isDark} />
         <label htmlFor="check"  ></label>
         </div>
         <a href="" style={{textDecoration:'none',fontWeight:"600"}}>Dark Mode</a>
        </li>
      </ul>
    </nav>
    {open && <CreateNoteModal open={open} setOpen={setOpen}/>}
    </>
  );
};

export default Sidebar;
