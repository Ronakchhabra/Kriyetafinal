import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

function DocumentationContent({selectedDocs}) {
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(false);
    console.log(selectedDocs);
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: 300, marginTop: 100 }}>
        <div>
          {isloading ? (
            <div className="spinner" />
          ) : (
                <div dangerouslySetInnerHTML={{__html: selectedDocs.subContent}}></div>
              )
          }
        </div>
      </div>
    </>
  );
}

export default DocumentationContent;
