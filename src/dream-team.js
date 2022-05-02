const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *  
 * @param {Array} members names of the members 
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 * 
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
 function createDreamTeam(members) {
  let team = [];
  let teamName = '';
  if (Array.isArray(members) && members.length > 0) {
    for (let item of members) {
      if (typeof(item) === 'string' && typeof(item.trim()[0]) === 'string') {
        team.push(item.trim()[0].toUpperCase())
      }
    };
    teamName = team.sort().join('');
    if (teamName.length > 0) {
      return teamName
    } else {
      return false;
    }
  } else {
    return false; 
  }
}

module.exports = {
  createDreamTeam
};
