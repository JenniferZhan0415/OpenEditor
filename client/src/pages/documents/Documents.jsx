import React from "react";
import { Link } from "react-router-dom";
import Templates from "./../../component/Templates/Templates";
import "./Documents.scss";

export const Documents = ({ idArray }) => {
  return (
    <div className="documents">
      <Templates />
      {console.log(idArray)}
      <h1 className="documents__title">Documents</h1>
      <ul>
        {idArray.map((item) => (
          <li className="documents__file" key={item.id}>
            <Link to={`/documents/${item.id}`}>
              <h3>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
