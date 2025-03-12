const APIPath = "https://test.v5.pryaniky.com";

export default {
  loginPath: () => `${APIPath}/ru/data/v3/testmethods/docs/login`,
  getAllDataPath: () => `${APIPath}/ru/data/v3/testmethods/docs/userdocs/get`,
  createLinePath: () =>
    `${APIPath}/ru/data/v3/testmethods/docs/userdocs/create`,
  deleteLinePath: (id: string) =>
    `${APIPath}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
  updateLinePath: (id: string) =>
    `${APIPath}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
  tablePagePath: () => "/table",
  loginPagePath: () => "/login",
};
