import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { MajorCategoryMstEntity, MinorCategoryMstEntity } from "@entities";
import { Autocomplete, Button, createFilterOptions, FormControl, InputLabel, OutlinedInput, Paper, Stack, TextField } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import client from "../../apollo-client";
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
const filter = createFilterOptions<OptionType<MajorCategoryMstEntity>>();
const minoFilter = createFilterOptions<OptionType<MinorCategoryMstEntity>>();

const MajorCategorySearcher: React.FC<{
  initSearchTarget: MajorCategoryMstEntity[];
  majorValueState: State<OptionType<MajorCategoryMstEntity> | null>;
}> = ({ initSearchTarget, majorValueState }) => {
  const [value, setValue] = majorValueState;
  const [searchTarget, setSearchTarget] = useState<OptionType<MajorCategoryMstEntity>[]>(initSearchTarget);
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            id: 0,
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            id: 0,
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={searchTarget}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="大カテゴリー" />}
    />
  );
};

const MinorCategorySearcher: React.FC<{
  majorValueState: State<OptionType<MajorCategoryMstEntity> | null>;
  minorValueState: State<OptionType<MinorCategoryMstEntity> | null>;
}> = ({ majorValueState, minorValueState }) => {
  const [majorCategory, setMajorCategory] = majorValueState!;
  const [value, setValue] = minorValueState;
  const [searchTarget, setSearchTarget] = useState<OptionType<MinorCategoryMstEntity>[]>([]);
  const [q] = useLazyQuery<NestedQuery<"getMinorCategoriesByMajorId", MinorCategoryMstEntity[]>>(query);
  useEffect(() => {
    setValue(null);
    setSearchTarget([]);
    if (majorCategory) {
      q({ variables: { majorId: Number(majorCategory.id) } }).then(({ data }) => setSearchTarget(data!.getMinorCategoriesByMajorId));
    } else {
      setSearchTarget([]);
    }
  }, [majorCategory, q, setMajorCategory, setValue]);
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (majorCategory) {
          if (typeof newValue === "string") {
            setValue({
              majorId: majorCategory.id,
              id: 0,
              name: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              majorId: majorCategory.id,
              id: 0,
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }
      }}
      disabled={setSearchTarget.length === 0}
      filterOptions={(options, params) => {
        const filtered = minoFilter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting && majorCategory) {
          filtered.push({
            inputValue,
            name: `新しく"${inputValue}"を追加する`,
            id: 0,
            majorId: majorCategory.id,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={searchTarget}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="小カテゴリー" />}
    />
  );
};

const AddNewTradeRequest: NextPage<{ majorCategories: MajorCategoryMstEntity[] }> = ({ majorCategories }) => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addNew] = useMutation(ADD_NEW_REQUEST_GQL);
  const majorValueState = React.useState<OptionType<MajorCategoryMstEntity> | null>(null);
  const minorValueState = React.useState<OptionType<MinorCategoryMstEntity> | null>(null);
  const [major] = majorValueState;
  const [subCategory, setSubcategory] = useState<OptionType<MinorCategoryMstEntity> | null>(null);
  console.log(major);
  useEffect(() => {}, [subCategory]);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNew({
      variables: {
        title,
        content,
      },
    });
  };
  console.log(auth);
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
              <MajorCategorySearcher initSearchTarget={majorCategories} majorValueState={majorValueState} />
              <MinorCategorySearcher majorValueState={majorValueState} minorValueState={minorValueState} />
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
      getAllMajorCategoryMsts {
        id
        name
      }
    }
  `;
  const { getAllMajorCategoryMsts: majorCategories } = await client
    .query<NestedQuery<"getAllMajorCategoryMsts", MajorCategoryMstEntity[]>>({ query })
    .then((res) => res.data);
  return { props: { majorCategories } };
};
