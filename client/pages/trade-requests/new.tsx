import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { MajorCategoryMstEntity, MakerMstEntity, MinorCategoryMstEntity, ProductMstEntity } from "@entities";
import {
  Button,
  CircularProgress,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import client from "../../apollo-client";
import { checkAuthSSR } from "../../axios";
import { AlertDialog } from "../../components/alert-dialog";
import { DynamicSearcher } from "../../components/dynamic-searcher";
import Layout from "../../components/layout";
import { requireAuth } from "../../components/use-auth";
import { AuthNextPage } from "../../env";
import { AuthContext } from "../_app";

const ADD_NEW_REQUEST_GQL = gql`
  mutation addNewTradeRequest(
    $ownerId: String!
    $title: String!
    $content: String!
    $minor: NewMinorCategoryInput!
    $majorId: Float!
    $maker: NewMakerMstInput!
    $product: NewProductMstInput!
    $targetCountryCode: String!
  ) {
    addNewTradeRequest(
      data: {
        title: $title
        content: $content
        ownerId: $ownerId
        minorCategory: $minor
        majorCategoryId: $majorId
        maker: $maker
        product: $product
        targetCountryCode: $targetCountryCode
      }
    ) {
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

const AddNewTradeRequest: AuthNextPage<{ majorCategories: MajorCategoryMstEntity[]; makers: MakerMstEntity[] }> = ({
  majorCategories,
  makers,
  payload,
}) => {
  console.log(payload);
  const [auth] = useContext(AuthContext)!.authState!;
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
  const [productValue, setProductValue] = productValueState;
  const [makerValue, setMakerValue] = makerValueState;
  const openDialog = useState(false);
  const [isDialogOpened, setIsDialogOpened] = openDialog;
  const [isCompleted, setIsComplete] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [countryCode, setCountryCode] = useState("jpn");
  useEffect(() => {
    const submittable = !!minorValue && !!majorValue && !!makerValue && !!productValue && !!title;
    setSubmittable(submittable);
  }, [majorValue, makerValue, minorValue, productValue, title]);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minor = { ...minorValue, ...{ majorId: majorValue!.id } };
    const product = { ...productValue, ...{ makerId: makerValue!.id } };
    const variables = {
      title,
      content,
      majorId: Number(majorValue!.id),
      minor,
      maker: makerValue,
      product,
      ownerId: auth!.userId,
      targetCountryCode: countryCode,
    };
    console.log(variables);
    setIsDialogOpened(true);
    setIsComplete(false);
    addNew({ variables }).finally(() => setIsComplete(true));
  };
  useEffect(() => {
    if (majorValue) {
      getSubCategories({ variables: { majorId: Number(majorValue.id) } }).then(({ data }) => setMinorCategories(data!.getMinorCategoriesByMajorId));
    } else {
      setMinorCategories([]);
    }
    setMinorValue(null);
  }, [majorValue, setMajorValue]);
  useEffect(() => {
    if (makerValue) {
      getProducts({ variables: { makerId: Number(makerValue.id) } }).then(({ data }) => setProducts(data!.getProductsByMakerId));
    } else {
      setProducts([]);
    }
    setProductValue(null);
  }, [makerValue, setMakerValue]);
  return (
    <Layout pageTitle="取引を依頼" mainId="newTradeRequest" payload={payload}>
      <AlertDialog
        openState={[isDialogOpened, setIsDialogOpened]}
        title={"新規取引リクエスト登録"}
        buttons={
          isCompleted
            ? [
                <Button key={2} onClick={() => setIsDialogOpened(false)}>
                  完了
                </Button>,
              ]
            : [
                // <Button key={1} onClick={() => setIsDialogOpened(false)}>
                //   中止
                // </Button>,
              ]
        }
      >
        {isCompleted ? <DialogContentText>登録が完了しました</DialogContentText> : <CircularProgress />}
      </AlertDialog>
      <Paper style={{ padding: 10 }}>
        <form onSubmit={(e) => submit(e)} style={{ all: "inherit" }}>
          <Stack spacing={2}>
            <h1>取引を依頼</h1>
            <FormControl sx={{ width: "100ch" }} variant="outlined">
              <InputLabel htmlFor="title-input">タイトル</InputLabel>
              <OutlinedInput id="title-input" value={title} onChange={(e) => setTitle(e.target.value)} label="タイトル" type="text" />
            </FormControl>
            <Stack direction={"row"} spacing={2}>
              <FormControl>
                <InputLabel id="select-country">対象国</InputLabel>
                <Select
                  labelId="select-country"
                  id="select-country"
                  value={countryCode}
                  label="対象国"
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <MenuItem value={"jpn"}>日本</MenuItem>
                  <MenuItem value={"kor"}>韓国</MenuItem>
                </Select>
              </FormControl>
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
            <Stack direction={"row"} spacing={2}>
              <DynamicSearcher<MakerMstEntity>
                buildNewData={(name) => ({ id: 0, name, isVerificated: 0 })}
                addNewLabel={(inputValue) => ({ id: 0, name: `新しく"${inputValue}"を追加する`, inputValue, isVerificated: 0 })}
                labelKey="name"
                label="メーカー"
                valueState={makerValueState}
                searchTarget={makers}
              />
              <DynamicSearcher<ProductMstEntity>
                buildNewData={(name) => ({ id: 0, name, makerId: makerValue!.id, isVerificated: 0 })}
                addNewLabel={(inputValue) => ({
                  id: 0,
                  name: `新しく"${inputValue}"を追加する`,
                  inputValue,
                  isVerificated: 0,
                  makerId: makerValue!.id,
                })}
                labelKey="name"
                label="製品"
                valueState={productValueState}
                searchTarget={products}
                disabled={!makerValue || productLoading}
              />
            </Stack>
            <TextField
              id="outlined-multiline-flexible"
              label="メッセージ"
              multiline
              maxRows={4}
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
            <Button variant="outlined" type="submit" disabled={!submittable}>
              Send
            </Button>
          </Stack>
        </form>
      </Paper>
    </Layout>
  );
};

export default AddNewTradeRequest;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ params, req, res }) => {
    const GET_ALL_MAKERS_QUERY = gql`
      query {
        getAllMakers {
          id
          name
        }
      }
    `;
    const GET_MAJOR_CATEGORY_MSTS = gql`
      query {
        getMajorCategoryMsts {
          id
          name
        }
      }
    `;

    const [makers, majorCategories] = await Promise.all([
      client.query<NestedQuery<"getAllMakers", MakerMstEntity[]>>({ query: GET_ALL_MAKERS_QUERY }).then((res) => res.data.getAllMakers),
      client
        .query<NestedQuery<"getMajorCategoryMsts", MajorCategoryMstEntity[]>>({ query: GET_MAJOR_CATEGORY_MSTS })
        .then((res) => res.data.getMajorCategoryMsts),
    ]);
    return { props: { majorCategories, makers } };
  });
