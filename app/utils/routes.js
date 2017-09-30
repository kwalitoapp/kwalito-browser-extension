export const diets    = () => '/diets';
export const dietInfo = (id = ':id') => `${diets()}/${id}/info`;
export const sign     = () => '/sign';
export const signIn   = () => `${sign()}/in`;
export const signUp   = () => `${sign()}/up`;
