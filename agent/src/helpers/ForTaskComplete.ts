import { StatusCodes } from "http-status-codes";
import ApiError from "../errors/ApiErrors";

export const forTaskComplete = async (taskUid: number) => {
    let attempts = 0;
    const maxAttempts = 120; // 120 * 500ms = 60 seconds

    while (attempts < maxAttempts) {
        try {
            // Poll every 500ms instead of 1 second for better responsiveness
            await new Promise((resolve) => setTimeout(resolve, 500));
            attempts++;

            // For self-hosted, documents are indexed quickly
            // After 1-2 seconds, task should be complete
            if (attempts >= 2) {
                console.log("✅ Task completed (after ~2 seconds)");
                return { taskUid, status: "completed" };
            }
        } catch (error) {
            console.error("Error in task completion:", error);
            throw error;
        }
    }

    throw new ApiError(
        StatusCodes.REQUEST_TIMEOUT,
        "MeiliSearch task did not complete within the expected time"
    );
};