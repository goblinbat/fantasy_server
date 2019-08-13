module.exports = function (sequelize, DataTypes) {
    return sequelize.define('post', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userName: {
            type:DataTypes.STRING,
            allowNull:false
        },
        type: {                         //campaign, story, or creature, item, class, or race (allows for searching, filtering, pulling up correct forms, etc)
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        likedBy: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        iName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        iCat: {                     // weapon category, monster type/ subtype, race size class
            type: DataTypes.STRING, 
            allowNull: true
        },
        iRange: {                   // weapon range, monster speed, race speed
            type: DataTypes.STRING, 
            allowNull: true
        },
        iDamage: {                  // weapon damage, monster hp, class hit die
            type: DataTypes.STRING,
            allowNull: true
        },
        iThrow: {                   // weapon thrown range, monster ac, class saving throws
            type: DataTypes.STRING, 
            allowNull: true
        },
        iProperties: {              // lists of weapon properties, monster abilities, class proficiencies, race proficiencies
            type: DataTypes.STRING, 
            allowNull: true
        },
        iAlign: {                   // monster alignment, race alignment
            type: DataTypes.STRING, 
            allowNull: true
        },
        iScores: {                   // lists of monster scores (order of: str, dex, con, int, wis, cha (use indexes to access specifics)), class proficiency choices and how many to choose, race bonuses (Same order as monsters)
            type: DataTypes.STRING, 
            allowNull: true
        },
        iVuln: {                   // monster damage vulnerabilities
            type: DataTypes.STRING, 
            allowNull: true
        },
        iResist: {                   // monster damage resistances
            type: DataTypes.STRING, 
            allowNull: true
        },
        iImmune: {                   // monster immunities, race subraces
            type: DataTypes.STRING, 
            allowNull: true
        },
        iLang: {                   // monster languages, race languages
            type: DataTypes.STRING,
            allowNull: true
        },
        iAction: {                   // monster actions, race traits
            type: DataTypes.STRING,
            allowNull: true
        },
        iCR: {                   // monster combat rating (CR)
            type: DataTypes.INTEGER, 
            allowNull: true
        }
    })
}