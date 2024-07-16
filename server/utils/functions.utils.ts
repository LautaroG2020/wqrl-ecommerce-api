export const EmptyOrNull = (input: any): boolean => {
    if (input == null) return true;
    if (input.toString().trim() === "") return true;

    return false;
};

export const GetString = (input: any): string | null => {
    if (input == null) return null;

    const result = input.toString().trim();
    if (result === "" || result === "undefined") return null;

    return result;
};
export const GetSafeString = (input: any) => {
    return GetString(input) ?? "";
};

export const GetNumber = (input: any): number => {
    const parsedValue = parseFloat(input);
    if (Number.isFinite(parsedValue)) return parsedValue;

    throw new Error(`Can't convert ${input} to number!`);
};

export const GetSafeNumber = (input: any): number | null => {
    const parsedValue = parseFloat(input);
    if (Number.isFinite(parsedValue)) return parsedValue;
    return null;
};

export const GetNormalizedDate = (date: Date): Date => {
    // TODO: Complete the logic for normalizing the date
    // You can use libraries like moment.js or the built-in Date methods
    return date;
};

export const SetObjectFromOther = (objFrom: any, objTo: any): any => {
    for (const prop in objTo)
        objTo[prop] = objFrom[prop] ?? null;

    return objTo;
};

/**
 * @param {string} password
 */
export const ValidatePassword = (password: string): boolean => {
    if (password == null) return false;

    if (password.length < 8) return false;

    return true;
};

export const isProd = () => {
    return process.env.NODE_ENV === "production";
};
