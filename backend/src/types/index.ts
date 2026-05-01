// Shared type augmentations — adds req.user populated by extractUser middleware.

export {};

declare global {
    namespace Express {
        interface Request {
            user?: {
                auth0Id: string;
                email: string;
            };
        }
    }
}
