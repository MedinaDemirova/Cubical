// TODO: Require Controllers...
require('./express')
const Cube = require('../Cube');

module.exports = (app) => {

    //HOME PAGE
    app.get('/', (req, res) => {
        Cube.find({})
            .then(cubes => {
                console.log(cubes)
                res.render('index', { cubes: cubes, layout: false })
            })
            .catch(err => console.error(err))
    });

    //BROWSE
    app.post('/', (req, res) => {
        let name = req.body.search;
        let minLevel = Number(req.body.from) || Number.MIN_SAFE_INTEGER;
        let maxLevel = Number(req.body.to)  || Number.MAX_SAFE_INTEGER;
        console.log (minLevel)
        console.log (maxLevel)
        console.log (name)

        if (name == '') {
            Cube.find({})
                .where('difficultyLevel').gt(minLevel - 1).lt(maxLevel + 1)
                .then(cubes => {
                    console.log(cubes)
                    if (cubes.length !== 0) {
                        res.render('index', { cubes: cubes, layout: false })
                        return;
                    }
                    res.redirect('/');
                })
                .catch(err => console.error(err))
                return
        }

        Cube.find({})
            .where('name').equals(name)
            .where('difficultyLevel').gt(minLevel -1).lt(maxLevel +1)
            .then(cubes => {
                console.log(cubes)
                if (cubes.length !== 0) {
                    res.render('index', { cubes: cubes, layout: false })
                    return;
                }
                res.redirect('/');
            })
            .catch(err => console.error(err))

    });

    //ABOUT
    app.get('/about', (req, res) => {
        res.render('about', { layout: false });
    });

    //CREATE    
    app.get('/create', (req, res) => {
        res.render('create', { layout: false });
    });

    app.post('/create', (req, res) => {
        let data = req.body;
        console.log(req.body);
        let newCube = new Cube({ name: data.name, description: data.description, imageURL: data.imageUrl, difficultyLevel: data.difficultyLevel })
        newCube.save()
            .then(res => {
                console.log(res)
            })

        res.redirect('/');
    });

    //DETAILS
    app.get('/details/:id', (req, res) => {
        let params = req.params;

        Cube.findOne({ _id: params.id })

            .then(cube => {
                console.log(cube)
                res.render('details', { cube: cube, layout: false })

            })
            .catch(err => console.error(err))
    });



    //EVERYTHING ELSE   
    app.get('*', (req, res) => {
        res.status(404)
        res.render('404', { layout: false });
    });



};