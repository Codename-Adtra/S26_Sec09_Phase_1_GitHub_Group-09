import { Session, User, store } from "../CommonData";

/**
 * Use case responsible for authenticating users and creating sessions.
 * This is intentionally simple for demonstration and testing purposes.
 */
export class LoginUseCase
{
    /**
     * Authenticate a user and create a new `Session`.
     * @throws Error when credentials are missing or invalid
     * @returns newly created `Session` on success
     */
    login(email: string, password: string): Session
    {
        if (email.trim() === "" || password.trim() === "")
        {
            throw new Error("Email and password cannot be empty.");
        }

        const foundUser = this.findUserByEmail(email);

        if (foundUser === null)
        {
            throw new Error("User not found.");
        }

        if (foundUser.password !== password)
        {
            throw new Error("Incorrect password.");
        }

        foundUser.isLoggedIn = true;

        const newSession = new Session(store.makeId("session"), foundUser.id);
        store.sessions.push(newSession);

        return newSession;
    }

    /**
     * Find a user by email in the demo store.
     * Returns `null` when not found.
     */
    private findUserByEmail(email: string): User | null
    {
        for (const user of store.users)
        {
            if (user.email === email)
            {
                return user;
            }
        }

        return null;
    }
}
