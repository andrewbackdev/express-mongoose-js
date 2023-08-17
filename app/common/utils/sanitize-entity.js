/**
 * Remove common fields like __v
 *
 * @param {object} entity
 */
function sanitizeEntity(entity) {
  delete entity.__v
}

module.exports = { sanitizeEntity }
