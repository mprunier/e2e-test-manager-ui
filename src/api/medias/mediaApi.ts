import { UUID } from "../models/UUID.ts";

const api = `${process.env.API_URL}`;

export const downloadScreenshotsApiRoute = (id: UUID) => `${api}/medias/screenshots/${id}`;

export const downloadVideosApiRoute = (id: UUID) => `${api}/medias/videos/${id}`;
