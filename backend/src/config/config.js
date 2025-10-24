export const cookiesOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'lax', // Prevent CSRF attacks
    maxAge: 60 * 60 * 1000, // 5 minutes expiration
};