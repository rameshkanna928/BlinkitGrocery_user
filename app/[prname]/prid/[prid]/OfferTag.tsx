import { OfferTagWrapper, OfferText } from "@/app/assets/style";
import React from "react";




function OfferTag({discount}:{discount:number}) {
  return (
    <OfferTagWrapper>
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z"
          fill="#538CEE"
        ></path>
      </svg>
      <OfferText>{discount}%</OfferText>
    </OfferTagWrapper>
  );
}

export default OfferTag;
