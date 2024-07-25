import React from "react";
import { Link } from "react-router-dom";
import Templates from "./../../component/Templates/Templates";

export const Documents = ({ idArray }) => {
  return (
    <div>
      <Templates />
      {console.log(idArray)}
      <h1>Documents</h1>
      <ul>
        {idArray.map((id) => (
          <li key={id}>
            <Link to={`/documents/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
