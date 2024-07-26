import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Templates from "./../../component/Templates/Templates";
import "./Documents.scss";
import { useSelector } from "react-redux";

export const Documents = () => {
  const idArray = useSelector((state) => state.documents.value);

  return (
    <div className="documents">
      <Templates />
      <section className="documents__section">
        <h2 className="documents__title">Your Documents: </h2>
        <ul className="documents__container">
          {idArray?.map((item) => (
            <Link to={`/documents/${item.id}`}>
              <li className="documents__file" key={item.id}>
                <h3 className="documents__name">{item.title}</h3>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
};
