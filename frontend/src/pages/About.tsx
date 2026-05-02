// About page — project background, goals, and team info drawn from the SOW and requirements doc.

export default function About() {
    const frontend = [
        { name: "Daniel Yoo", email: "dhy220000@utdallas.edu", role: "Typing interface & UI components" },
        { name: "Phuc Trinh", email: "ppt230000@utdallas.edu", role: "Content generation & navigation" },
        { name: "Adrian Trang", email: "alt210004@utdallas.edu", role: "Authentication UI & wireframes" }
    ];

    const backend = [
        { name: "Ahmad Zahid", email: "dal219265@utdallas.edu", role: "Database, auth, scoring logic" },
        { name: "Hunter Woodworth", email: "hww190000@utdallas.edu", role: "User profile & dashboard" },
        { name: "Karthik Yammanur", email: "ksy230000@utdallas.edu", role: "Test history & data management" }
    ];

    return (
        <div className="container" style={{ maxWidth: 720 }}>
            <div style={{ marginBottom: 48 }}>
                <h1 style={{ fontSize: 36, fontWeight: 600, marginBottom: 8 }}>
                    about Type&nbsp;<span style={{ color: "var(--danger)" }}>シ</span>
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7 }}>
                    CS 3354.009 · Group 09 · Spring 2026 · Prof. Priya Narayanasami · UT Dallas
                </p>
            </div>

            <section style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text)" }}>
                    why we built this
                </h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 12 }}>
                    TypeShi is a web-based typing performance application that helps users improve their
                    typing speed and accuracy. Built as our semester-long Software Engineering project,
                    it puts into practice everything from requirements gathering and system design all
                    the way through implementation and deployment.
                </p>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                    We took inspiration from platforms like Monkeytype and TypeRacer - apps our team
                    already used, and set out to build something clean and functional that covers the
                    full stack: a React + TypeScript frontend, a Node + Express + Prisma backend, and
                    Auth0 for authentication.
                </p>
            </section>

            <section style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text)" }}>
                    what it does
                </h2>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                        "Timed typing tests - 15 s, 30 s, 60 s, or 120 s",
                        "Real-time character-by-character feedback (green / red)",
                        "WPM and accuracy calculated on test completion",
                        "Word bank of 200+ common English words, randomised each test",
                        "Authenticated accounts via Auth0 - no passwords stored by us",
                        "Test history saved per user, viewable in your profile dashboard",
                        "Aggregate stats: average WPM, best WPM, total tests, average accuracy"
                    ].map(item => (
                        <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--text-muted)", fontSize: 15 }}>
                            <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0, fontSize: 10 }}>■</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: "var(--text)" }}>
                    the team
                </h2>

                <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 12, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                        front-end
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {frontend.map(m => <MemberCard key={m.name} {...m} />)}
                    </div>
                </div>

                <div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                        back-end
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {backend.map(m => <MemberCard key={m.name} {...m} />)}
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text)" }}>
                    tech stack
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                        ["Frontend", "React 18, TypeScript, Vite, React Router"],
                        ["Styling", "Handwritten CSS - no framework"],
                        ["Auth", "Auth0 (React SDK + JWT bearer)"],
                        ["Backend", "Node.js, Express, TypeScript"],
                        ["ORM / DB", "Prisma + PostgreSQL 16"],
                        ["Dev infra", "Docker Compose, ts-node-dev"]
                    ].map(([label, value]) => (
                        <div key={label} style={{ background: "var(--bg-elevated)", borderRadius: 8, padding: "14px 16px" }}>
                            <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                            <div style={{ fontSize: 14, color: "var(--text)" }}>{value}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function MemberCard({ name, email, role }: { name: string; email: string; role: string }) {
    return (
        <div style={{ background: "var(--bg-elevated)", borderRadius: 8, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{name}</div>
                <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 2 }}>{role}</div>
            </div>
            <a href={`mailto:${email}`} style={{ fontSize: 13, color: "var(--text-muted)" }}>{email}</a>
        </div>
    );
}
