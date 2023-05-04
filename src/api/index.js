import service from "@/utils/request";

export const reqUserRegister = (data) => service.post("/user/register", data);
export const reqUserLogin = (data) => service.post("/user/login", data);

export const getNavDate = () => service.get("/resources");
