import React, { useEffect, useState } from "react";

const Color = ({ colors, clickable = true, multiple = false, click }) => {
  const [active, setActive] = useState({});

  useEffect(() => {
    colors.forEach((e, i) => {
      active[i] = false;
    });
    if (!clickable) return;
    if (!multiple) active[0] = true;
    if (click) click(active);
  }, [colors]);

  const handleClick = (index) => {
    if (!clickable) return;
    if (!multiple) {
      colors.forEach((e, i) => {
        active[i] = false;
      });
    }
    active[index] = !active[index];
    setActive({ ...active });
    if (click) click(active);
  };
  return (
    <>
      <ul className="filter-colors m-0 p-0">
        {colors.map((e, i) => (
          <li
            className={active[i] ? "active" : ""}
            onClick={() => handleClick(i)}
            style={{ color: e?.Value || e }}
            key={i}
          ></li>
        ))}
      </ul>
    </>
  );
};

export default Color;
