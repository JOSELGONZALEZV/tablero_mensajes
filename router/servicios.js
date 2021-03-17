
const { Router } = require('express');
const {Message_db, Comment_db} = require('../db');
const router = Router();

router.get ('/', async (req,res)=>{
	const messages_impdb = await Message_db.findAll({ include: [Comment_db]});
	
	res.render('index.ejs', {message_vws: messages_impdb});
	
});

router.post('/message', async (req,res) => {
	const name1 = req.body.name1;
	const message = req.body.message;
	//validacion
	if(name1 == '' || name1.length <=3) {
		return res.send ('error');
	} else if (message == ''){
		return res.send ('error')
		}
	
	const new_author = await Message_db.create({
		name1: req.body.name1,
		message: req.body.message
	});
	res.redirect('/');
	

});
	router.post('/comment', async (req,res) => {
		const name2 = req.body.name2;
		const comment = req.body.comment;
		const MessageId = req.body.MessageIdMessageId;
		
		if(name2 == '' || name2.length <=3) {
			return res.send ('error');
		} 	
		if (comment == ''){
			return res.send ('error')
		}
		else if (MessageId == ''){
			return res.send ('error')
		}
		
		const new_comment = await Comment_db.create({
			name2: req.body.name2,
			comment: req.body.comment,
			MessageId: req.body.MessageId
		});
		res.redirect('/');	
	});
 
	router.get('/delete/:id', async (req,res) => {
		const message_elim = await Message_db.findByPk(req.params.id);
		await message_elim.destroy();
		res.redirect("/");
	});

	
module.exports = router;
