import { ClassModel } from "../models/Class.model";
import { UserResponse } from "../types/User.types";
import { ClassDocument } from "../models/Class.model";

export const verifyClassOwnership = async (classId: string, user: UserResponse): Promise<ClassDocument> => {
    const classDoc = await ClassModel.findOne({ userId: user.userId, classId })
    if (!classDoc)
        throw new Error("Class does not exist or belong to user.");

    return classDoc;
}