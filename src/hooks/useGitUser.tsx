import { GITHUB_ACCESS_TOKEN, GITHUB_API } from "../config";
import { IUserInfo } from "../types";

const getFollowersEndpoint = (userId: string, perPage: number = 30, pageNumber: number = 1) =>
    GITHUB_API + userId + "/followers?per_page=" + perPage + "&page=" + pageNumber;

export async function getGitUser(userId: string) {
    try {
        let userInfor = [];
        let index = 1;
        let userWholeInfo: IUserInfo[] = [];
        let response;
        do {
            if (!GITHUB_ACCESS_TOKEN) {
                response = await fetch(getFollowersEndpoint(userId, 100, index++));
            } else {
                response = await fetch(getFollowersEndpoint(userId, 100, index++), {
                    method: "GET",
                    headers: {
                        Authorization: GITHUB_ACCESS_TOKEN,
                    },
                });
            }

            userInfor = await response.json();
            userWholeInfo = [...userWholeInfo, ...userInfor];
        } while (response.status === 200 && userInfor.length !== 0);
        return userWholeInfo;
    } catch (error) {
        console.log("error", error);
    }
}
