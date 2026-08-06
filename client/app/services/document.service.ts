import api from "./api.service";

class DocumentService {

    async getAll(workspaceId: string) {

        const { data } = await api.get(
            `/documents/workspace/${workspaceId}`
        );

        return data;

    }

    async getById(documentId: string) {

        const { data } = await api.get(
            `/documents/${documentId}`
        );

        return data;

    }

    async upload(
        formData: FormData,
        onProgress?: (progress: number) => void
    ) {

        const { data } = await api.post(

            "/documents/upload",

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                },

                onUploadProgress: (event) => {

                    if (!event.total) return;

                    const progress = Math.round(

                        (event.loaded * 100) / event.total

                    );

                    onProgress?.(progress);

                }

            }

        );

        return data;

    }

    async update(documentId: string, payload: any) {

        const { data } = await api.patch(

            `/documents/${documentId}`,

            payload

        );

        return data;

    }

    async delete(documentId: string) {

        const { data } = await api.delete(

            `/documents/${documentId}`

        );

        return data;

    }

}

export default new DocumentService();