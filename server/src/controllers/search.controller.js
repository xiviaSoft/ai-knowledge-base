import searchService from "../services/search.service.js";

class SearchController {

    async search(req, res, next) {

        try {
            const data =
                await searchService.search(

                    req.body.workspaceId,

                    req.body.query

                );

            res.status(200).json({

                success: true,

                data

            });

        }

        catch (error) {

            next(error);

        }

    }

}

export default new SearchController();