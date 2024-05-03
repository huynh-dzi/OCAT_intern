const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;
      const result = await AssessmentService.submit(assessment);
      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters

      ResponseHandler(
        res,
        `Submitted assessment`,
        result,
        { assessment },
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      const assessments = await AssessmentService.getList();

      ResponseHandler(
        res,
        `Fetched assessments`,
        { assessments },
      );
    } catch (err) {
      next(err);
    }
  },

  assessmentRouter.delete(
    `/:id`,
    async (req, res, next) => {
      try {
        const { id } = req.params;
        await AssessmentService.delete(id);

        ResponseHandler(
          res,
          `Deleted assessment`,
          { id },
        );
      } catch (err) {
        next(err);
      }
    },
  ),
);

module.exports = { assessmentRouter };
