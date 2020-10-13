//$("body").append("<script src='https://150.136.166.80:3000/occjs' cliente='teste'></script>")
//Lista de Clientes
// var json = {
//     oi: {
//         logo: "https://s2.glbimg.com/KkAhF9jrHGK9qan2sf8LuiQ-nME=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2020/v/i/glx2xMRgW5kBTOK7OBdg/logooi140x140.png",
//         cor_link: "green",
//         cor_btn_txt: "#fff",
//         cor_btn_back: "#a94442",
//         cor_btn_borda: "transparent",
//         banner: "https://png.pngtree.com/thumb_back/fw800/back_pic/03/88/04/9357d3ea7e6f9cc.jpg",
//         font: "Montserrat",
//         linkfont: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
//     },
//     rv: {
//         logo: "https://www.rivershop.com.br/file/general/logo_login.png",
//         cor_link: "green",
//         cor_btn_txt: "#fff",
//         cor_btn_back: "#a94442",
//         cor_btn_borda: "transparent",
//         banner: "https://png.pngtree.com/thumb_back/fw800/back_pic/03/88/04/9357d3ea7e6f9cc.jpg",
//         font: "Long Cang",
//         linkfont: "https://fonts.googleapis.com/css2?family=Long+Cang&display=swap"
//     }
// }

function getSyncScriptParams() {
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length - 1];
    var scriptName = lastScript;
    return scriptName.getAttribute('cliente');
}


//Get Cliente Param
var cliente = getSyncScriptParams()

var url_base = "https://150.136.166.80:3000/v1/external_assets";
//---------------------------- Buscar customizações expecifica
function getCustomer(callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            } else if (xmlHttp.status == 500) {
                alert("Erro Response: " + xmlHttp.responseText);
            }
        }
    }
    let customer_name = cliente;
    let url = url_base + "/costumer_name/" + customer_name;
    xmlHttp.open('GET', url, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', url);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send();
}

function responseGetCustomer(response) {
    // console.log("responseGetCustomer ", response);
    var resp = JSON.parse(response)
    if (resp.message == "success") {
        json = resp.data;
        init(json)
        // console.log(resp.data);
    }

}

function triggerGetCustomer() {
    getCustomer(responseGetCustomer);
}

triggerGetCustomer()

//INSERINDO DADOS NA PAGINA

function init(json) {
    //Custom CSS
    var customcss = `
<style id="custom_style"> 
@import url('${json.url_da_fonte}');
*{
    font-family: ${json.nome_da_fonte};
}

a, a:link, a:visited, a:hover {
    color: ${json.cor_do_link};
}
.cc-button-primary {
    background-color: ${json.cor_do_fundo_do_botao};
    color: ${json.cor_do_texto_do_botao};
    border-color: ${json.cor_da_borda_do_botao};
}
.cc-button-primary:hover, .cc-button-primary:active {
    background-color: ${json.cor_do_fundo_do_botao_hover};
    color: ${json.cor_do_texto_do_botao_hover};
    border-color: ${json.cor_da_borda_do_botao_hover};
}

.logo img{
    height: 80px;
    width: auto;
}

.collapse.navbar-collapse.mega-menu-fullwidth-collapse {
    background: ${json.cor_do_fundo_do_menu} !important;
}

#megaMenu_v5-megaMenuInst_v5 #CC-megaMenu .mega-menu .nav>li>a {
    color     : ${json.cor_do_texto_do_menu} !important;
    background: ${json.cor_do_fundo_do_menu} !important;
}

.footer-links {
    background: ${json.cor_do_fundo_do_rodape} !important;
    color     : ${json.cor_do_texto_do_rodape} !important;
}

footer.col-xs-12.footer a {
    color: ${json.cor_do_texto_do_rodape};
}
${json.css_customizado}
</style>`


    $.Topic("page.ready.memory").subscribe(function () {
        clearElements();

        setTimeout(function () {
            $("body").append(customcss)

            //Logo
            $(".logo img").attr("src", json.url_do_logo)

            //Banner Home
            if ($("#alert-page-change").html() == "homePage is loaded.") {
                $("#main").append('<img id="banner_home" src="' + json.url_do_banner_da_home + '" style="width:100%;"/>')
            }
        }, 500)

    })


    function clearElements() {
        $("#banner_home, #custom_style").remove();
    }
}