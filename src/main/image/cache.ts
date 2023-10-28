import path from "path";
import { getAppPath, getPortableExeDir } from "@/main/environment";

const userDataRoot = getPortableExeDir() || getAppPath("userData");
export const imageCacheDir = path.join(userDataRoot, "image_cache");
