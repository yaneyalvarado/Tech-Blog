const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// writing out the code to try and get all posts

// router.get('/', withAuth, (req, res) => {
//     Post.findAll({
//         where: {
//             // Utilizing the ID from the session
//             user_id: req.session.user_id
//         },
//         attributes: [
//             'id', 'title', 'created_at', 'post_content'
//         ],
//         include: [
//             {
//                 model: Comment, 
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User, 
//                     attributes: ['username', 'github']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username', 'github']
//             }
//         ]
//     })
//      // connecting all data before passing through the template
//     .then(dbPostData => {
//        const posts = dbPostData.map(post => post.get({ plain: true }));
//        res.render('dashboard', { posts, loggedIn: true });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// obtaining one post/single post
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 'title', 'created_at', 'post_content'
        ],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'github']
                }
            },
            {
                model: User, 
                attributes: ['username', 'github']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        // connecting all data and passing through the template
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
            post, 
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
