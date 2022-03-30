const { userHasRole } = require('../helpers/helpers')
const { unauthorizedRoute, invalidToken } = require('../helpers/responses')
const { roles } = require('../config/roles')

const hasCollegeAdminRole = async (req, res, next) => {
    const userId = res.locals.userId;
    const verify = await userHasRole(res.locals.userId, roles.COLLEGE_ADMIN);
    if(!userId) { 
        return invalidToken(res);
    }
    if(!verify) {
        return unauthorizedRoute(res);
    }
    next();
}

module.exports = {
    hasCollegeAdminRole
}