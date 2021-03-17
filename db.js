const Sequelize = require('sequelize');
const clave = require('./secret')

const sql = new Sequelize('msj_board_dbs', 'root', clave.clave, {
    host: 'localhost',
    dialect: 'mysql'
});
    
const Message_db = sql.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name1: {
        type: Sequelize.STRING,
        allowNull: false, 
        validate: {
            notNull: {
              msg: 'Debe indicar un nombre'
            },
            len: {
              args: [3],
              msg: 'El nonbre debe ser de largo al menos 3'
            }
          }    
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'Debe ingresar un mensaje'
            }
        }
    }
   
}, {timestamps: true });

    const Comment_db = sql.define('Comment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name2: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Debe indicar un nombre'
                },
                len: {
                  args: [3],
                  msg: 'El nonbre debe ser de largo al menos 3'
                }
              }
        },
            comment: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Debe ingresar un comentario al mensaje'
                }
              }
        }
    }, {timestamps: true });
    
   


sql.sync()
    .then(() => {
        console.log('Base de datos y tablas creadas');

    });

    Message_db.hasMany(Comment_db);
    Comment_db.belongsTo(Message_db);
    

module.exports = {
    Message_db, Comment_db
};