//$("body").append("<script src='http://127.0.0.1:8887/external_assets/occ.js' cliente='oi'></script>")

//Lista de Clientes
var json = {
    oi: {
        logo: "https://s2.glbimg.com/KkAhF9jrHGK9qan2sf8LuiQ-nME=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2020/v/i/glx2xMRgW5kBTOK7OBdg/logooi140x140.png",
        cor_link: "green",
        cor_btn_txt: "#fff",
        cor_btn_back: "#a94442",
        cor_btn_borda: "transparent",
        banner: "https://png.pngtree.com/thumb_back/fw800/back_pic/03/88/04/9357d3ea7e6f9cc.jpg",
        font: "Montserrat",
        linkfont: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    },
    rv: {
        logo: "https://www.rivershop.com.br/file/general/logo_login.png",
        cor_link: "green",
        cor_btn_txt: "#fff",
        cor_btn_back: "#a94442",
        cor_btn_borda: "transparent",
        banner: "https://png.pngtree.com/thumb_back/fw800/back_pic/03/88/04/9357d3ea7e6f9cc.jpg",
        font: "Long Cang",
        linkfont: "https://fonts.googleapis.com/css2?family=Long+Cang&display=swap"
    }
}

function getSyncScriptParams() {
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length - 1];
    var scriptName = lastScript;
    return scriptName.getAttribute('cliente');
}


//Get Cliente Param
var cliente = getSyncScriptParams()


//INSERINDO DADOS NA PAGINA

//Custom CSS
var customcss = `
<style id="custom_style"> 
@import url('${json[cliente].linkfont}');
*{
    font-family: ${json[cliente].font};
}

a, a:link, a:visited, a:hover {
    color: ${json[cliente].cor_link};
}
.cc-button-primary {
    background-color: ${json[cliente].cor_btn_back};
    color: ${json[cliente].cor_btn_txt};
    border-color: ${json[cliente].cor_btn_borda};
}

.logo img{
    height: 80px;
    width: auto;
}
</style>`


$.Topic("page.ready.memory").subscribe(function () {
    clearElements();

    setTimeout(function () {
        $("body").append(customcss)

        //Logo
        $(".logo img").attr("src", json[cliente].logo)

        //Banner Home
        if ($("#alert-page-change").html() == "homePage is loaded.") {
            $("#main").append('<img id="banner_home" src="https://png.pngtree.com/thumb_back/fw800/back_pic/03/88/04/9357d3ea7e6f9cc.jpg" style="width:100%;"/>')
        }
    }, 500)

})


function clearElements() {
    $("#banner_home, #custom_style").remove();
}
