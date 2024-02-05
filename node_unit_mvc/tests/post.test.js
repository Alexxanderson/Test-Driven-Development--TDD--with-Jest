const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            id:"507asdghajsdhjgasd",
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {

    });

    describe('findPost', () => {
        var findPostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            findPostStub = sinon.stub(PostModel, 'findPost');
        });

        afterEach(() => {
            findPostStub.restore();
        });

        // Successful Post Scenario
        it('should return the found post object', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd';
            const foundPost = {
                _id: postId,
                author: 'stsweng',
                title: 'My first test post',
                content: 'Random content'
            };

            findPostStub.withArgs(postId).yields(null, foundPost);
            
            req = {
                body: {
                    id: postId,
                    author: 'stswenguser',
                    title: 'My first test post',
                    content: 'Random content'
                }
            };

            // Act
            PostController.findPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.findPost, postId);
            sinon.assert.calledWith(res.json, sinon.match(foundPost));
        });

        // Error scenario
        it('should return status 500 on server error', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd';
            const error = new Error('An error occurred while finding the post.');

            findPostStub.withArgs(postId).yields(error);

            req = {
                body: {
                    id: postId ,
                    author: 'stswenguser',
                    title: 'My first test post',
                    content: 'Random content'
                    }
            };

            // Act
            PostController.findPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.findPost, postId);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });

    });
});