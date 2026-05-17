import React from "react";
import GridItem from "./GridItem";

const FooterNav = ({ gridCompany, gridHelp, gridResources }) => {
  return (
    <>
      <GridItem options={gridResources} />
      <GridItem options={gridHelp} />
      <GridItem options={gridCompany} />
    </>
  );
};

export default FooterNav;
