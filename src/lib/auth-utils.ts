
export function requireRole(user: any, role: "ADMIN" | "CREATOR" | "USER") {
    if (!user) {
        throw new Error("Unauthorized");
    }

    const userRole = user.role;

    if (userRole === "ADMIN") return;

    if (userRole !== role) {
        throw new Error("Forbidden");
    }
}
