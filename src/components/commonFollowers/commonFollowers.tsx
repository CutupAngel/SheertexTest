import React, { useState, useEffect } from "react";

import { Grid, Box, Button, TextField, Typography } from "@mui/material";
import { getGitUser } from "../../hooks/useGitUser";
import { IUserInfo } from "../../types";
import UserAvatar from "../userAvatar/userAvatar";

function CommonFollowers() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [firstId, setFirstId] = useState<string>("");
    const [secondId, setSecondId] = useState<string>("");
    const [firstUserInfo, setFirstUserInfo] = useState<IUserInfo[] | undefined>([]);
    const [secondUserInfo, setSecondUserInfo] = useState<IUserInfo[] | undefined>([]);
    const [commonInfo, setCommonInfo] = useState<IUserInfo[] | undefined>([]);

    const handleClick = () => {
        setIsLoading(true);
        getGitUser(firstId).then((res) => setFirstUserInfo(res));
        getGitUser(secondId).then((res) => setSecondUserInfo(res));
        setIsLoading(false);
    };

    useEffect(() => {
        if (firstUserInfo?.length === 0 || secondUserInfo?.length === 0) {
            return;
        }
        setCommonInfo(secondUserInfo?.filter((item) => firstUserInfo?.find((fItem) => fItem.login === item.login)));
    }, [firstUserInfo, secondUserInfo]);

    return (
        <Box sx={{ m: "10px" }}>
            <Box display="flex" justifyContent={"space-around"} sx={{ my: "50px", alignItems: "center" }}>
                <Box>
                    <TextField
                        id="firstId"
                        label="firstId"
                        variant="outlined"
                        value={firstId}
                        onChange={(e) => setFirstId(e.target.value)}
                        sx={{ m: "10px" }}
                    />
                    <TextField
                        id="secondId"
                        label="secondId"
                        variant="outlined"
                        value={secondId}
                        onChange={(e) => setSecondId(e.target.value)}
                        sx={{ m: "10px" }}
                    />
                </Box>
                <Box>
                    <Button variant="contained" onClick={handleClick} sx={{ px: 3 }}>
                        Find Common
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                {!isLoading && commonInfo && commonInfo.length > 0 ? (
                    commonInfo.map((item, index) => (
                        <Grid item key={index}>
                            <UserAvatar
                                userInfo={item}
                                handleClick={() => {
                                    console.log("click");
                                }}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography>Loading....</Typography>
                )}
            </Grid>
        </Box>
    );
}

export default CommonFollowers;
