import React from "react";

export const ImageIcons = ({
  type = "",
  onClick = (e: React.MouseEvent) => { },
  size = 64,
  className = "",
}): any => {
  if (type === "arrow-right") {
    return (
      <img
        onClick={onClick}
        className={className}
        width={size}
        height={size}
        // src={`https://img.icons8.com/nolan/512/circled-right.png`}
        src="https://img.icons8.com/color/256/000000/circled-right-2--v2.png"
        alt={type}
      />
    );
  }

  if (type === "arrow-left") {
    return (
      <img
        onClick={onClick}
        className={className}
        width={size}
        height={size}
        // src={`https://img.icons8.com/nolan/512/circled-left--v1.png`}
        src={`https://img.icons8.com/color/256/000000/circled-left-2--v2.png`}
        alt={type}
      />
    );
  }
  if (type === "settings") {
    return (
      <img
        onClick={onClick}
        className={className}
        width={size}
        height={size}
        // src={`https://img.icons8.com/nolan/512/circled-left--v1.png`}
        src={`https://img.icons8.com/ultraviolet/256/000000/automatic.png`}
        alt={type}
      />
    );
  }
};
