import React, { useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/core";

const Loader = () => {
  const [color] = useState("#36D7B7");

  const override = css`
    position: absolute;
    top: 45%;
    left: 45%;
  `;

  return (
    <div>
      <RingLoader color={color} css={override} size={80} />
    </div>
  );
};

export default Loader;
