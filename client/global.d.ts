/// <reference types="react" />
/// <reference types="@entities" />

type State<T> = [T, (data: T) => void];
type AuthContext = Context<State<JWTPayload>>;
type NestedQuery<KeyName, ResType> = {
  [key in KeyName]: ResType;
};
type NestedQueries<KeyName, ResType> = {
  [key in KeyName]: ResType;
};
type OptionType<T> = T & { inputValue?: string };
