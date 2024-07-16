const allowedFiles = [".html", ".css", ".js", ".webp", ".png", ".json", ".ttf", ".otf", ".woff2"];

const isStaticFile = (url: string): boolean => {
    const requiredPath = url.toLowerCase() === "/" ? "index.html" : url.toLowerCase();

    return allowedFiles.some(extension => requiredPath.includes(extension));
};

export { isStaticFile };