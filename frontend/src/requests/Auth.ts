import Http from "./Http";

interface ILoginUserData {
  email: string;
  password: string;
}
export default {
  login(data: ILoginUserData) {
    return Http.post("/user/login", { ...data });
  },
};
