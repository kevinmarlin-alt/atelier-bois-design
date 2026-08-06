export const apiJsonResponse = {
    success(message: string|null = null, data: any) {
        return {
            "success": true,
            "message": message,
            "data": data
        }
    },

    failure(message: string) {
        return {
            "success": false,
            "message": message
        }
    }
}