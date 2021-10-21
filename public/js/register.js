let reg1 = /[\u4e00-\u9fa5_a-zA-Z0-9_]{3,16}/;
let reg2 = /^[a-z0-9_-]{6,16}$/;
$('[name = username]').on("input", () => {
    let str = $('[name = username]').val();
    if (reg1.test(str)) {
        $('[name = username]').parent().find('.tipinfo').html('用户名输入正确');
        $('.subbtn').prop('disabled', false);
    } else {
        $('[name = username]').parent().find('.tipinfo').html('用户名输入错误');
        $('.subbtn').prop('disabled', true);
    };
});
$('[name = pwd]').on("input", () => {
    let str = $('[name = pwd]').val();
    if (reg2.test(str)) {
        $('[name = pwd]').parent().find('.tipinfo').html('密码格式正确');
        $('.subbtn').prop('disabled', false);
    } else {
        $('[name = pwd]').parent().find('.tipinfo').html('密码格式错误');
        $('.subbtn').prop('disabled', true);
    };
});