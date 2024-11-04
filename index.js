    const express = require('express');
    const connect = require('./connect.js');
    const regis = require('./model/user.js')

    async function main(params) {
        await connect().then(() => console.log("Kết nối thành công"));
        const app = new express();
        app.listen(3000, () => {
            console.log("Server chạy tại cổng 3000");
        });
        // Set đường dẫn đến thư mục chứa giao diện
        const path = require('path')
        const ejs = require('ejs')
        app.set('view engine', 'ejs')
        app.set('views', './views')
        
        // Thực hiện lấy dữ liệu từ body của request
        const bodyParser = require('body-parser')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json({ type: 'application/json' }))
        app.use(bodyParser.raw())
        
        // Đăng ký thư mục public.....
        app.use(express.static('public'))

      app.post('/api/insert', (req, res) => {
  regis.create(req.body) // req.body đã chứa dữ liệu từ form.ejs
    .then(() => {
      res.redirect('/') // Chuyển hướng về trang chủ hoặc trang cần thiết
    })
    .catch(error => {
      console.error('Lỗi khi thêm dữ liệu:', error);
      res.status(500).send('Lỗi máy chủ');
    });
});

        // Gọi trang update để in dữ liệu theo ID
        app.get('/update/:id', async (req, res) => {
            try {
                const userId = req.params.id; 
                const user = await regis.findById(userId); // Tìm user theo ID
                if (!user) {
                    return res.status(404).send("Không tìm thấy user");
                }
                res.render('update', { user: user }); // Truyền user vào template update.ejs
            } catch (error) {
                console.error(error);
                res.status(500).send("Lỗi máy chủ");
            }
        });
        // thuc hien viec sua data
        app.post('/api/update/:id', async (req, res) => {
            try {
                const userId = req.params.id; 
                await regis.findByIdAndUpdate(userId, req.body);
                res.redirect('/select');
            } catch (error) {
                console.error(error);
                res.status(500).send("Lỗi máy chủ");
            }
        });
// event delete
    // Route xóa user theo ID
    app.get('/delete/:id', async (req, res) => {
        try {
            const userId = req.params.id;
            await regis.findByIdAndDelete(userId); 
            res.redirect('/select'); 
        } catch (error) {
            console.error(error);
            res.status(500).send("Lỗi máy chủ");
        }
    });

        app.get('/', function(req , res){
            res.render('form')
        })
        app.get('/login',function(req,res){
            res.render('create')
        })
        app.get('/select', async (req, res) => {
        regis.find({}).then((result)=>{
            console.log(result);
            res.render('select', { user_regis:result });
        })
        });
    }

    main();
