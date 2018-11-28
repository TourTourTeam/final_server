
module.exports = function(router, passport,app) {
    console.log('user_passport 호출됨.');

    // 홈 화면
    router.route('/').get(function(req, res) { //req.user 객체
        console.log('/ 패스 요청됨.');
        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.send({login_success:false});
        } else {
            console.log('사용자 인증된 상태임.');
            res.send({login_success:true});
        }
    });
    
    // 로그인 인증
    router.route('/login_success').get(function(req,res){
        console.log('/login_success 요청');
        if(!req.user){
            console.log('사용자 인증 안된 상태');
        }
        else
        {
            console.log('사용자 인증된 상태');
            console.dir(req.user);
            res.send({login_success:true});
            res.send({user:req.user});
        }
    });
    router.route('/login_failuer').get(function(req,res){
        console.log('/login_failuer 요청');
        res.send({login_failuer:false});
    });
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/login_success', 
        failureRedirect : '/login_failuer',
        failureFlash : true 
    }));
    router.route('/signup_success').get(function(req,res){
        console.log('/signup_success 요청');
        console.dir(req);
        res.send({signup_success:true});
       
    });
    router.route('/signup_failure').get(function(req,res){
        console.log('/signup_failure 요청');
        console.dir(req);
        res.send({signup_success:false});
    })
    // 회원가입 인증
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/signup_success', 
        failureRedirect : '/signup_failure', 
        failureFlash : true 
    }));
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });
};