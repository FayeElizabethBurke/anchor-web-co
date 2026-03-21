const raw: string = import.meta.env.BASE_URL ?? '/';
export const b: string = raw.endsWith('/') ? raw.slice(0, -1) : raw;
