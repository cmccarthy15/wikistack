var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'closed'
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
}, {
  hooks: {
    beforeValidate: (user, options) => {
      user.urlTitle = user.title ? user.title.trim().replace(/\s/g, '_').replace(/\W/g, '') : Math.random().toString(36).substring(2, 7);
    }
  },
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User,
  db: db
};





// function getUrl(title){
//   if (title){
//     return title.replace(/\s/g, '_').replace(/\W/g, '');
//   } else {
//     return Math.random().toString(36).substring(2, 7);
//   }
// }
