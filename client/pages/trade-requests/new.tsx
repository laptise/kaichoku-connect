import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { MajorCategoryMstEntity, MakerMstEntity, MinorCategoryMstEntity, ProductMstEntity } from "@entities";
import { Button, FormControl, InputLabel, OutlinedInput, Paper, Stack } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import client from "../../apollo-client";
import { DynamicSearcher } from "../../components/dynamic-searcher";
import Layout from "../../components/layout";
import { AuthContext } from "../_app";

const ADD_NEW_REQUEST_GQL = gql`
  mutation ($title: String!, $content: String!) {
    addNewTradeRequest(data: { title: $title, content: $content }) {
      id
    }
  }
`;

const query = gql`
  query getWithMajorId($majorId: Float!) {
    getMinorCategoriesByMajorId(majorId: $majorId) {
      id
      name
    }
  }
`;

const GET_PRODUCT_BY_MAKER_ID = gql`
  query getProductsByMakerId($makerId: Float!) {
    getProductsByMakerId(makerId: $makerId) {
      id
      name
    }
  }
`;

const AddNewTradeRequest: NextPage<{ majorCategories: MajorCategoryMstEntity[]; makers: MakerMstEntity[] }> = ({ majorCategories, makers }) => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addNew] = useMutation(ADD_NEW_REQUEST_GQL);
  const majorValueState = React.useState<OptionType<MajorCategoryMstEntity> | null>(null);
  const [majorValue, setMajorValue] = majorValueState;
  const minorValueState = React.useState<OptionType<MinorCategoryMstEntity> | null>(null);
  const [minorValue, setMinorValue] = minorValueState;
  const minorCategoriesState = useState<OptionType<MinorCategoryMstEntity>[]>([]);
  const [minorCategories, setMinorCategories] = minorCategoriesState;
  const productsState = useState<OptionType<ProductMstEntity>[]>([]);
  const [products, setProducts] = productsState;
  const [getSubCategories, { loading }] = useLazyQuery<NestedQuery<"getMinorCategoriesByMajorId", MinorCategoryMstEntity[]>>(query);
  const [getProducts, { loading: productLoading }] = useLazyQuery<NestedQuery<"getProductsByMakerId", ProductMstEntity[]>>(GET_PRODUCT_BY_MAKER_ID);
  const makerValueState = useState<OptionType<MakerMstEntity> | null>(null);
  const productValueState = useState<OptionType<ProductMstEntity> | null>(null);
  const [makerValue] = makerValueState;
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNew({
      variables: {
        title,
        content,
      },
    });
  };
  useEffect(() => {
    if (majorValue) {
      getSubCategories({ variables: { majorId: Number(majorValue.id) } }).then(({ data }) => setMinorCategories(data!.getMinorCategoriesByMajorId));
    } else {
      setMinorCategories([]);
    }
    setMinorValue(null);
  }, [majorValue]);
  useEffect(() => {
    if (makerValue) {
      getProducts({ variables: { makerId: Number(makerValue.id) } }).then(({ data }) => setProducts(data!.getProductsByMakerId));
    } else {
      setProducts([]);
    }
  }, [makerValue]);
  return (
    <Layout pageTitle="取引を依頼" mainId="newTradeRequest">
      <Paper style={{ padding: 10 }}>
        <form onSubmit={(e) => submit(e)} style={{ all: "inherit" }}>
          <Stack spacing={1}>
            <h1>取引を依頼</h1>
            <FormControl sx={{ width: "100ch" }} variant="outlined">
              <InputLabel htmlFor="title-input">タイトル</InputLabel>
              <OutlinedInput id="title-input" value={title} onChange={(e) => setTitle(e.target.value)} label="タイトル" type="text" />
            </FormControl>
            <Stack direction={"row"} spacing={1}>
              <DynamicSearcher<MajorCategoryMstEntity>
                buildNewData={(name) => ({ id: 0, name })}
                labelKey="name"
                label="大カテゴリー"
                valueState={majorValueState}
                searchTarget={majorCategories}
              />
              <DynamicSearcher<MinorCategoryMstEntity>
                buildNewData={(name) => ({ id: 0, name, majorId: majorValue!.id })}
                addNewLabel={(inputValue) => ({ id: 0, name: `新しく"${inputValue}"を追加する`, inputValue, majorId: majorValue!.id })}
                labelKey="name"
                label="小カテゴリー"
                valueState={minorValueState}
                searchTarget={minorCategories}
                disabled={!majorValue || loading}
              />
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <DynamicSearcher<MakerMstEntity>
                buildNewData={(name) => ({ id: 0, name, isVerificated: 0 })}
                labelKey="name"
                label="メーカー"
                valueState={makerValueState}
                searchTarget={makers}
              />
              <DynamicSearcher<ProductMstEntity>
                buildNewData={(name) => ({ id: 0, name, makerId: makerValue!.id, isVerificated: 0 })}
                labelKey="name"
                label="製品"
                valueState={productValueState}
                searchTarget={products}
              />
            </Stack>
            <Button variant="outlined">Send</Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default AddNewTradeRequest;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = gql`
    query {
      getAllMakers {
        id
        name
      }
      getAllMajorCategoryMsts {
        id
        name
      }
    }
  `;
  const { getAllMajorCategoryMsts: majorCategories, getAllMakers: makers } = await client
    .query<NestedQuery<"getAllMajorCategoryMsts" | "getAllMakers", MajorCategoryMstEntity[]>>({ query })
    .then((res) => res.data);
  return { props: { majorCategories, makers } };
};
