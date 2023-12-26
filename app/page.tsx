"use client";

import DynamicButton from "./components/buttons/DynamicButton";
import CampaignCard from "./components/cards/CampaignCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CampaignSliderSettings } from "./utils/data";
import {
  Wrapper,
  Banner,
  BannerInfo,
  BannerText,
  BannerSubText,
  CategoryListContainer,
  CategoryListWrapper,
  LoaderFlexContainer,
  SCTitle,
  SCIMGTAG,
  SCLINK,
  SCCategoryImgBox,
} from "./assets/style";
import CategoryProductSlider from "./components/sliders/CategoryProductSlider";
import { useRouter } from "next/navigation";
import { AllCategory, BannerArrProps } from "./assets/style/interface";
import HomeProductSliders from "./components/sliders/HomeProductSliders";
import CampaignCardLoader from "./Loading UI/campaignCardLoader";
import CategoryListWrapperLoader from "./Loading UI/categoryListWrapperLoader";
import { getAllCategoryWithTypes, getBanner } from "./service/api/data";
import { useEffect, useState, useContext } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getAllBanners, getProductsByCategoryId } from "./service/query";
import { MyContext } from "../app/myContext";
import {
  setCategoryProducts,
  setUpdateCategoryProducts,
} from "./myContext/action";
import ProductCardLoader from "./Loading UI/productCardLoader";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {

  const [
    getBanners,
    { data: allBanners, loading: bannerLoader },
  ] = useLazyQuery(getAllBanners,{
    fetchPolicy:"no-cache"
  });

  const { allCategories, allCategoryLoader } = getAllCategoryWithTypes();
  const [sliderDatas, setSliderDatas] = useState([]);
  const staticCategoryId = [
    "65549be6b8cc555881cb43f3",
    "6555c9459ad354780c2e6c4c",
  ];
  const { cartItems, categoryProducts, dispatch } = useContext(MyContext);
  const [getProductsByCategory, { loading }] = useLazyQuery(
    getProductsByCategoryId
  );

  useEffect(() => {
    const cloneData = JSON.parse(JSON.stringify(sliderDatas));
    const intialLoad = async () => {
      staticCategoryId.map(async (value) => {
        const response = await getProductsByCategory({
          variables: { getCategoryWithProductTypesId: value, sliceCount: 10 },
        });
        cloneData.push(response?.data?.getCategoryWithProductTypes);
        setCategoryProducts(
          dispatch,
          response?.data?.getCategoryWithProductTypes
        );
      });
      setSliderDatas(cloneData);
    };

    intialLoad();

    getBanners();
  }, []);

  useEffect(() => {
    setUpdateCategoryProducts(dispatch);
  }, [cartItems]);

  return (
    <Wrapper>
      <Banner>
        <BannerInfo>
          <BannerText>Don't miss out on tasty Grocery Deals</BannerText>
          <BannerSubText>
            Your Favourite grocery shop is now online
          </BannerSubText>
          <DynamicButton name="Shop Now" />
        </BannerInfo>
      </Banner>

      <CategoryProductSlider settings={CampaignSliderSettings}>
        {bannerLoader
          ? [0, 1, 2, 3, 4].map((_, id) => <CampaignCardLoader key={id} />)
          : allBanners &&
            allBanners?.getAllBanner?.map((e) => (
              <CampaignCard key={e.id} e={e} />
            ))}
      </CategoryProductSlider>

      <CategoryListContainer>
        {allCategories?.getAllCategories?.map((data: AllCategory) => (
          <SCLINK
            $variant=""
            href={`/productType/${data?.id}/${data?.productTypes?.[0]?.id}`}
            key={data?.id}
          >
            <CategoryListWrapper $Loader={allCategoryLoader}>
              <SCCategoryImgBox $variant="w-100">
                <SCIMGTAG src={data?.image} />
              </SCCategoryImgBox>

              <SCTitle $variant="H16CAT600">{data?.name}</SCTitle>
            </CategoryListWrapper>
          </SCLINK>
        ))}
        {allCategoryLoader && (
          <CategoryListWrapperLoader loaderState={allCategoryLoader} />
        )}
      </CategoryListContainer>
      {loading && (
        <LoaderFlexContainer>
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <ProductCardLoader key={i} />
            ))}
        </LoaderFlexContainer>
      )}
      {categoryProducts?.map((data) => (
        <HomeProductSliders key={data?.id} data={data} />
      ))}
    </Wrapper>
  );
}
