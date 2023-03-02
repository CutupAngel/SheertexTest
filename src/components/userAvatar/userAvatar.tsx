import { Card, CardMedia, Link, Typography } from "@mui/material";
import React from "react";
import { IUserAvatarProps } from "./userAvatar.type";

function UserAvatar(props: IUserAvatarProps) {
    const { userInfo } = props;
    return (
        <Card sx={{ textAlign: "center", borderWidth: "0px", boxShadow: "none" }}>
            <Link href={userInfo.html_url}>
                <CardMedia component="img" src={userInfo.avatar_url} sx={{ borderRadius: "50%", width: "100px" }} />
                <Typography>{userInfo.login}</Typography>
            </Link>
        </Card>
    );
}

export default UserAvatar;
