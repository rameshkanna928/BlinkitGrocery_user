import {
  FlexBox,
  FooterContainer,
  SCLINK,
  SCTitle,
} from "@/app/assets/style";
import { JSONServerData } from "@/app/utils/data";
import { Grid } from "@mui/material";
import Link from "next/link";
import React from "react";
import { AllCategory } from "@/app/assets/style/interface";
import { getAllCategoryWithTypes } from "@/app/service/api/data";

const FooterComponent = () => {
  const { allCategories } = getAllCategoryWithTypes();
  const CategoryLinks: AllCategory = allCategories?.getAllCategories;
  console.log("productTypesLinks",CategoryLinks);
  

  return (
    <FooterContainer container>
      <Grid item sm={12} xl={3.8}>
        <SCTitle $variant="600">Useful Links</SCTitle>

        <Grid rowGap={1} my={2} container>
          {JSONServerData.useFullLinks.map((data, i) => (
            <Grid  item xs={12} md={4} key={i}>
              <SCLINK href={""} $variant="A14CAPSHover">
                {data}
              </SCLINK>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xl={8.2}>
        <FlexBox $variant="between" $disable={false}>
          <SCTitle $variant="600">Categories </SCTitle>
          <SCLINK $variant="GR" href={"/category"}>
            see all
          </SCLINK>{" "}
        </FlexBox>
        <Grid container  rowGap={1} my={2}>
          {CategoryLinks?.map((data) => (
            <Grid  item xs={12} md={4} key={data?.id}>
              <SCLINK  href={`/productType/${data?.id}/${data?.productTypes?.[0]?.id}`} $variant="A14CAPSA14CAPSHover">
                {data.name}
              </SCLINK>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </FooterContainer>
  );
};

export default FooterComponent;
