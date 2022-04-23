/// <reference types="react" />
/// <reference types="@entities" />

type State<T> = [T | null, (data: T) => void];
type AuthContext = Context<State<UserEntity | null>>;
