const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  try { const result = await Assessment.create(assessment);
    return result;
  } catch (err) {
    throw new Error(`Error submitting assessment, ${err}`);
  }
};

exports.getList = () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = Assessment.findAll();
  return assessments;
};

exports.delete = async (id) => {
  // use the sequelize model Assessments from packages/api/src/database/models to delete
  // the assessment data from the PostgreSQL database
  try {
    const result = await Assessment.destroy({ where: { id } });
    return result;
  } catch (err) {
    throw new Error(`Error deleting assessment, ${err}`);
  }
};
