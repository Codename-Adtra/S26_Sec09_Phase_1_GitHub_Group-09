import { Session, User, store } from "../CommonData";

/**
 * Use case that ends a user's active session and updates their login state.
 */
export class LogoutUseCase
{
    /**
     * End the active session for the provided `userId`.
     * @returns `true` when logout succeeded
     * @throws Error if the user or active session cannot be found
     */
    logout(userId: string): boolean
    {
        const user = this.findUserById(userId);

        if (user === null)
        {
            throw new Error("User not found.");
        }

        const session = this.findActiveSessionByUserId(userId);

        if (session === null)
        {
            throw new Error("Active session not found.");
        }

        session.isActive = false;
        user.isLoggedIn = false;

        return true;
    }

    /** Find a user by id in the demo store. Returns `null` when not found. */
    private findUserById(userId: string): User | null
    {
        for (const user of store.users)
        {
            if (user.id === userId)
            {
                return user;
            }
        }

        return null;
    }

    /**
     * Locate an active `Session` for the given user id.
     * Returns `null` when no active session exists.
     */
    private findActiveSessionByUserId(userId: string): Session | null
    {
        for (const session of store.sessions)
        {
            if (session.userId === userId && session.isActive === true)
            {
                return session;
            }
        }

        return null;
    }
}
