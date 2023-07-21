const router = require('express').Router();
// const { UPSERT } = require('sequelize/types/query-types');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/dashboard', withAuth, (req, res) => {
    Post.findAll({
        where: {
            // Utilizing the ID from the session
            user_id: req.session.user_id
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
     // connecting all data before passing through the template
    .then(dbPostData => {
       const posts = dbPostData.map(post => post.get({ plain: true }));
       res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
})

module.exports = router;
