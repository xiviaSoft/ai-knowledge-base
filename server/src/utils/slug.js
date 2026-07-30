export function generateSlug(name) {
    return (
        name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") +
        "-" +
        Date.now()
    );
}

export function serializeBigInt(data) {
    return JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === "bigint"
                ? value.toString()
                : value
        )
    );
}