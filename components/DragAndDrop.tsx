import React, { SetStateAction, useState } from "react";

type Props = {
  setFile: SetStateAction<any>;
  handleInputChange?: (e:any) => void;
  children: React.ReactNode;
};

const DragAndDrop = (props: Props) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef(null);

  // handle drag events

  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input
        type="file"
        id="input-file-upload"
        className="hidden"
        ref={inputRef}
        onChange={props.handleInputChange}
      />
      <label htmlFor="input-file-upload">{props.children}</label>
      {dragActive && (
        <div
          className="absolute top-0 right-0 left-0 bottom-0 w-full h-full"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

export default DragAndDrop;
