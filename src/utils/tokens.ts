export const setTokenCookies = (res: any, access: string, refresh: string) => {
    res.cookie("accessToken", access, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refresh, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};
