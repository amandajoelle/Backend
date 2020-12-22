import { ModelCtor, Model } from 'sequelize';

export const truncate = async (model: ModelCtor<Model>) => {
    return await model.destroy({ where: {}, truncate: true, cascade: true });
    // return await model.truncate({ where: {}, force: true });
};
