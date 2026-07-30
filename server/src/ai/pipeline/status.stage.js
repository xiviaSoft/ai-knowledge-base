import documentRepository
from "../../repositories/document.repository.js";

class StatusStage {

    async execute(context) {

        await documentRepository.updateStatus(

            context.document.id,

            "READY"

        );

    }

}

export default new StatusStage();